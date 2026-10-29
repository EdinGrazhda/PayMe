<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use App\Services\BusinessContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function __invoke(Request $request, BusinessContext $context, AnalyticsService $analytics): JsonResponse
    {
        return response()->json($analytics->data($context->forUser($request->user())));
    }
}
