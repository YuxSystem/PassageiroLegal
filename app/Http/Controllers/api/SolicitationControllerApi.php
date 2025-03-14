<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SolicitationRequest;
use App\Http\Requests\SolicitationUpdateStatus;
use App\Services\SolicitationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SolicitationControllerApi extends Controller
{
    public function __construct(protected SolicitationService $solicitationService)
    {
    }

    public function getSolicitations(Request $request): JsonResponse
    {
        $perPage = (int)$request->input('per_page', 10);
        $page = (int)$request->input('page', 1);

        $solicitations = $this->solicitationService->getSolicitations($perPage, $page);

        return response()->json([
            'solicitations' => $solicitations->items(),
            'pagination' => [
                'current_page' => $solicitations->currentPage(),
                'total_pages' => $solicitations->lastPage(),
                'total_items' => $solicitations->total(),
                'per_page' => $solicitations->perPage(),
                'next_page' => $solicitations->nextPageUrl()
                    ? $solicitations->nextPageUrl() . "&per_page={$perPage}"
                    : null,
                'previous_page' => $solicitations->previousPageUrl()
                    ? $solicitations->previousPageUrl() . "&per_page={$perPage}"
                    : null,
            ]
        ], 200);
    }

    public function createSolicitation(SolicitationRequest $request): JsonResponse
    {
        $user = Auth::user();
        $request->merge(['user_id' => $user->id]);
        $solicitation = $this->solicitationService->createSolicitation($request->all());
        $this->solicitationService->uploadFiles($solicitation['id'], $request->allFiles());

        $created_solicitation = $this->solicitationService->getSolicitation($solicitation['id']);

        return response()->json($created_solicitation, 201);
    }

    public function getSolicitation(string $id): JsonResponse
    {
        $solicitation = $this->solicitationService->getSolicitation($id);

        return response()->json($solicitation, 200);
    }

    public function updateSolicitationStatus(SolicitationUpdateStatus $request, string $id): JsonResponse
    {
        $solicitation = $this->solicitationService->updateSolicitationStatus($id, $request->all());

        return response()->json($solicitation, 200);
    }
}
