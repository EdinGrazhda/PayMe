<?php

use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\UploadedDocumentController;
use App\Http\Controllers\SeoDiscoveryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::get('robots.txt', [SeoDiscoveryController::class, 'robots'])->name('seo.robots');
Route::get('sitemap.xml', [SeoDiscoveryController::class, 'sitemap'])->name('seo.sitemap');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('invoices', 'invoices')->name('invoices');
    Route::inertia('clients', 'clients')->name('clients');
    Route::inertia('reminders', 'reminders')->name('reminders');
    Route::inertia('analytics', 'analytics')->name('analytics');

    // Session-authenticated JSON endpoints keep the Inertia UI behind the same CSRF protection.
    Route::prefix('api')->name('api.')->middleware('throttle:60,1')->group(function (): void {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
        Route::get('clients', [ClientController::class, 'index'])->name('clients.index');
        Route::post('clients', [ClientController::class, 'store'])->name('clients.store');
        Route::get('clients/{client}', [ClientController::class, 'show'])->name('clients.show');
        Route::patch('clients/{client}', [ClientController::class, 'update'])->name('clients.update');
        Route::delete('clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');
        Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices.index');
        Route::post('invoices', [InvoiceController::class, 'store'])->name('invoices.store');
        Route::get('invoices/{invoice}', [InvoiceController::class, 'show'])->name('invoices.show');
        Route::patch('invoices/{invoice}/send', [InvoiceController::class, 'markSent'])->name('invoices.send');
        Route::post('invoices/{invoice}/payments', [PaymentController::class, 'store'])->name('invoices.payments.store');
        Route::patch('invoices/{invoice}/reminders', [ReminderController::class, 'setInvoiceReminders'])->name('invoices.reminders.update');
        Route::get('reminders', [ReminderController::class, 'index'])->name('reminders.index');
        Route::get('reminder-rules', [ReminderController::class, 'rules'])->name('reminder-rules.index');
        Route::patch('reminder-rules/{rule}', [ReminderController::class, 'updateRule'])->name('reminder-rules.update');
        Route::patch('reminders/{reminder}/skip', [ReminderController::class, 'skip'])->name('reminders.skip');
        Route::get('analytics', AnalyticsController::class)->name('analytics');
        Route::post('uploaded-documents', [UploadedDocumentController::class, 'store'])->name('uploaded-documents.store');
    });
});

require __DIR__.'/settings.php';
