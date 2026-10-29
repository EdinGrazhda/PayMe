<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\InvoiceResource;
use App\Models\Client;
use App\Services\BusinessContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClientController extends Controller
{
    public function index(Request $request, BusinessContext $context): AnonymousResourceCollection
    {
        $business = $context->forUser($request->user());
        $filters = $request->validate(['q' => ['sometimes', 'string', 'max:100']]);
        $query = $business->clients()->select('id', 'business_id', 'name', 'company', 'email', 'phone', 'address', 'country', 'currency', 'notes', 'created_at');

        if (isset($filters['q'])) {
            $term = addcslashes($filters['q'], '%_\\').'%';
            $query->where(function ($query) use ($term): void {
                $query->where('name', 'like', $term)->orWhere('company', 'like', $term)->orWhere('email', 'like', $term);
            });
        }

        return ClientResource::collection(
            $query->orderBy('name')->orderBy('id')->cursorPaginate(30),
        );
    }

    public function store(StoreClientRequest $request, BusinessContext $context): ClientResource
    {
        $business = $context->forUser($request->user());
        $client = $business->clients()->create($request->validated());

        return new ClientResource($client);
    }

    public function show(Request $request, Client $client, BusinessContext $context): JsonResponse
    {
        $business = $context->forUser($request->user());
        abort_unless($client->business_id === $business->id, 404);

        $invoices = $business->invoices()->where('client_id', $client->id)
            ->with('client:id,name,company,email')->orderByDesc('id')->limit(20)->get();

        return response()->json([
            'data' => new ClientResource($client),
            'summary' => [
                'currency' => $business->currency,
                'invoice_count' => $business->invoices()->where('client_id', $client->id)->count(),
                'outstanding_minor' => (int) $business->invoices()->where('client_id', $client->id)->where('status', 'sent')->sum('balance_due_minor'),
                'paid_minor' => (int) $business->invoices()->where('client_id', $client->id)->sum('amount_paid_minor'),
            ],
            'recent_invoices' => InvoiceResource::collection($invoices)->resolve($request),
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client, BusinessContext $context): ClientResource
    {
        $business = $context->forUser($request->user());
        abort_unless($client->business_id === $business->id, 404);
        $client->update($request->validated());

        return new ClientResource($client);
    }

    public function destroy(Request $request, Client $client, BusinessContext $context): JsonResponse
    {
        $business = $context->forUser($request->user());
        abort_unless($client->business_id === $business->id, 404);

        if ($client->invoices()->exists()) {
            return response()->json(['message' => 'Clients with invoices cannot be deleted.'], 409);
        }

        $client->delete();

        return response()->json(status: 204);
    }
}
