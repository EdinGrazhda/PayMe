<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\InvoiceReminder;
use App\Models\User;
use App\Services\BusinessContext;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InvoiceApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_invoice_creation_uses_minor_units_and_appears_in_dashboard(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/api/invoices', [
            'client_name' => 'Northstar Studio',
            'invoice_number' => 'INV-1001',
            'amount' => '800.50',
            'due_date' => now()->addDays(30)->toDateString(),
        ])->assertCreated()->assertJsonPath('data.total_minor', 80050)
            ->assertJsonPath('data.balance_due_minor', 80050);

        $invoice = Invoice::query()->firstOrFail();
        $this->assertDatabaseCount('reminder_rules', 4);
        $this->assertSame(80050, (int) $invoice->items()->firstOrFail()->unit_price_minor);
        $this->assertDatabaseHas('invoice_events', ['invoice_id' => $invoice->id, 'type' => 'created']);

        $this->actingAs($user)->getJson('/api/dashboard')
            ->assertOk()
            ->assertJsonPath('recent.0.number', 'INV-1001')
            ->assertJsonPath('metrics.outstanding_minor', 0);

        $this->patchJson('/api/invoices/'.$invoice->id.'/send', [])->assertOk()
            ->assertJsonPath('data.status', 'sent');
        $this->getJson('/api/dashboard')->assertJsonPath('metrics.outstanding_minor', 80050);
    }

    public function test_invoice_apis_do_not_expose_another_business(): void
    {
        $owner = User::factory()->create();
        $stranger = User::factory()->create();

        $this->actingAs($owner)->postJson('/api/invoices', [
            'client_name' => 'Private Client',
            'invoice_number' => 'PRIVATE-1',
            'amount' => '120.00',
            'due_date' => now()->addDays(10)->toDateString(),
        ])->assertCreated();

        $invoice = Invoice::query()->firstOrFail();

        $this->actingAs($stranger)->getJson('/api/dashboard')
            ->assertOk()->assertJsonPath('recent', []);
        $this->getJson('/api/invoices')->assertOk()->assertJsonMissing(['number' => 'PRIVATE-1']);
        $this->getJson('/api/clients')->assertOk()->assertJsonMissing(['name' => 'Private Client']);
        $this->getJson('/api/invoices/'.$invoice->id)->assertNotFound();
        $this->patchJson('/api/invoices/'.$invoice->id.'/send', [])->assertNotFound();
        $this->postJson('/api/invoices/'.$invoice->id.'/payments', [])->assertNotFound();
        $this->postJson('/api/invoices', [
            'client_id' => $invoice->client_id,
            'invoice_number' => 'CROSS-TENANT',
            'amount' => '1.00',
            'due_date' => now()->addDay()->toDateString(),
        ])->assertUnprocessable();
    }

    public function test_full_payment_cancels_pending_reminders_and_updates_metrics(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/api/invoices', [
            'client_name' => 'Late Client',
            'invoice_number' => 'INV-LATE',
            'amount' => '90.25',
            'issue_date' => now()->subMonth()->toDateString(),
            'due_date' => now()->subDays(4)->toDateString(),
        ])->assertCreated();

        $invoice = Invoice::query()->firstOrFail();
        $invoice->update(['status' => 'sent', 'reminders_enabled' => true]);
        InvoiceReminder::query()->create([
            'business_id' => $invoice->business_id,
            'invoice_id' => $invoice->id,
            'sequence' => 1,
            'tone' => 'friendly',
            'status' => 'queued',
            'scheduled_at' => now()->addDay(),
        ]);

        $this->getJson('/api/dashboard')->assertJsonPath('metrics.overdue_minor', 9025);
        $this->postJson('/api/invoices/'.$invoice->id.'/payments', [])
            ->assertCreated()->assertJsonPath('data.amount_minor', 9025);

        $invoice->refresh();
        $this->assertSame('paid', $invoice->status);
        $this->assertSame(0, (int) $invoice->balance_due_minor);
        $this->assertFalse($invoice->reminders_enabled);
        $this->assertDatabaseHas('invoice_reminders', ['invoice_id' => $invoice->id, 'status' => 'cancelled']);
        $this->getJson('/api/dashboard')->assertJsonPath('metrics.collected_month_minor', 9025)
            ->assertJsonPath('metrics.overdue_minor', 0);
    }

    public function test_upload_is_private_and_requires_an_invoice_file(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $business = app(BusinessContext::class)->forUser($user);

        $this->actingAs($user)->postJson('/api/uploaded-documents', [
            'invoice_file' => UploadedFile::fake()->create('invoice.pdf', 100, 'application/pdf'),
        ])->assertCreated()->assertJsonPath('data.status', 'awaiting_confirmation');

        $document = $business->id;
        $this->assertDatabaseHas('uploaded_documents', ['business_id' => $document, 'status' => 'awaiting_confirmation']);
        $this->assertCount(1, Storage::disk('local')->allFiles("businesses/{$business->id}/invoices"));

        $this->postJson('/api/uploaded-documents', [
            'invoice_file' => UploadedFile::fake()->create('notes.txt', 10, 'text/plain'),
        ])->assertUnprocessable();
    }
}
