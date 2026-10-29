<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUploadedDocumentRequest;
use App\Models\UploadedDocument;
use App\Services\BusinessContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Throwable;

class UploadedDocumentController extends Controller
{
    public function store(StoreUploadedDocumentRequest $request, BusinessContext $context): JsonResponse
    {
        $business = $context->forUser($request->user());
        $file = $request->file('invoice_file');
        $path = $file->store("businesses/{$business->id}/invoices", 'local');

        if ($path === false) {
            throw new RuntimeException('Invoice upload could not be stored.');
        }

        try {
            $document = UploadedDocument::query()->create([
                'business_id' => $business->id,
                'uploaded_by_user_id' => $request->user()->id,
                'disk' => 'local',
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size_bytes' => $file->getSize(),
                'status' => 'awaiting_confirmation',
            ]);
        } catch (Throwable $exception) {
            Storage::disk('local')->delete($path);
            throw $exception;
        }

        return response()->json([
            'data' => [
                'id' => $document->id,
                'original_name' => $document->original_name,
                'status' => $document->status,
            ],
        ], 201);
    }
}
