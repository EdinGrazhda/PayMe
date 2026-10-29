<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\InvoiceReminder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkspacePagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_sidebar_pages_require_authentication_and_render(): void
    {
        foreach (['invoices', 'clients', 'reminders', 'analytics'] as $page) {
            $this->get('/'.$page)->assertRedirect('/login');
        }

        $this->actingAs(User::factory()->create());
        foreach (['invoices', 'clients', 'reminders', 'analytics'] as $page) {
            $this->get('/'.$page)->assertOk();
        }
    }

    public function test_client_crud_and_tenant_isolation(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $this->actingAs($owner)->postJson('/api/clients', ['name' => 'Northstar', 'email' => 'hello@northstar.test'])
            ->assertCreated()->assertJsonPath('data.name', 'Northstar');

        $id = (int) \App\Models\Client::query()->firstOrFail()->id;
        $this->getJson('/api/clients/'.$id)->assertOk()->assertJsonPath('summary.invoice_count', 0);
        $this->patchJson('/api/clients/'.$id, ['phone' => '+123456'])->assertOk()->assertJsonPath('data.phone', '+123456');

        $this->actingAs($other)->getJson('/api/clients/'.$id)->assertNotFound();
        $this->patchJson('/api/clients/'.$id, ['name' => 'Stolen'])->assertNotFound();
        $this->deleteJson('/api/clients/'.$id)->assertNotFound();
        $this->actingAs($owner)->deleteJson('/api/clients/'.$id)->assertNoContent();
    }

    public function test_reminder_rules_schedule_and_analytics_use_real_invoice_data(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->postJson('/api/clients', ['name' => 'Client', 'email' => 'client@example.test'])->assertCreated();
        $client = \App\Models\Client::query()->firstOrFail();
        $this->postJson('/api/invoices', [
            'client_id' => $client->id,
            'invoice_number' => 'INV-2001',
            'amount' => '200.00',
            'due_date' => now()->addDays(10)->toDateString(),
        ])->assertCreated();
        $invoice = Invoice::query()->firstOrFail();
        $this->patchJson('/api/invoices/'.$invoice->id.'/send', [])->assertOk();

        $this->getJson('/api/analytics')->assertOk()
            ->assertJsonPath('totals.invoice_count', 1)
            ->assertJsonPath('totals.outstanding_minor', 20000);
        $rule = $this->getJson('/api/reminder-rules')->assertOk()->json('data.0');
        $this->patchJson('/api/reminder-rules/'.$rule['id'], ['tone' => 'professional'])->assertOk()
            ->assertJsonPath('data.tone', 'professional');
        $this->patchJson('/api/invoices/'.$invoice->id.'/reminders', ['enabled' => true])->assertOk();
        $this->assertDatabaseCount('invoice_reminders', 4);
        $reminder = InvoiceReminder::query()->firstOrFail();
        $this->getJson('/api/reminders')->assertOk()->assertJsonPath('data.0.invoice.number', 'INV-2001');
        $this->patchJson('/api/reminders/'.$reminder->id.'/skip', [])->assertOk()
            ->assertJsonPath('data.status', 'cancelled');
        $this->postJson('/api/invoices/'.$invoice->id.'/payments', [])->assertCreated();
        $this->getJson('/api/analytics')->assertJsonPath('totals.collected_minor', 20000)
            ->assertJsonPath('totals.outstanding_minor', 0);
    }
}
