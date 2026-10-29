<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource;
use App\Services\BusinessContext;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClientController extends Controller
{
    public function index(Request $request, BusinessContext $context): AnonymousResourceCollection
    {
        $business = $context->forUser($request->user());

        return ClientResource::collection(
            $business->clients()->select('id', 'business_id', 'name', 'company', 'email', 'phone', 'currency')
                ->orderBy('name')->orderBy('id')->cursorPaginate(30),
        );
    }

    public function store(StoreClientRequest $request, BusinessContext $context): ClientResource
    {
        $business = $context->forUser($request->user());
        $client = $business->clients()->create($request->validated());

        return new ClientResource($client);
    }
}
