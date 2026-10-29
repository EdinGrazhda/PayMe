<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\UploadedDocumentController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Session-authenticated JSON endpoints keep the Inertia UI behind the same CSRF protection.
    Route::prefix('api')->name('api.')->middleware('throttle:60,1')->group(function (): void {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
        Route::get('clients', [ClientController::class, 'index'])->name('clients.index');
        Route::post('clients', [ClientController::class, 'store'])->name('clients.store');
        Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices.index');
        Route::post('invoices', [InvoiceController::class, 'store'])->name('invoices.store');
        Route::get('invoices/{invoice}', [InvoiceController::class, 'show'])->name('invoices.show');
        Route::patch('invoices/{invoice}/send', [InvoiceController::class, 'markSent'])->name('invoices.send');
        Route::post('invoices/{invoice}/payments', [PaymentController::class, 'store'])->name('invoices.payments.store');
        Route::post('uploaded-documents', [UploadedDocumentController::class, 'store'])->name('uploaded-documents.store');
    });
});

require __DIR__.'/settings.php';
