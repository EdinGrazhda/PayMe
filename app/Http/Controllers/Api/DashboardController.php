<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BusinessContext;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request, BusinessContext $context, DashboardService $dashboard): JsonResponse
    {
        return response()->json($dashboard->data($context->forUser($request->user()), $request));
    }
}
