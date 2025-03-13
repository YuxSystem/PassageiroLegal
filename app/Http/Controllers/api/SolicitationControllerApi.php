<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SolicitationRequest;
use App\Http\Requests\SolicitationUpdateStatus;
use App\Services\SolicitationService;
use Illuminate\Http\JsonResponse;

class SolicitationControllerApi extends Controller
{
    public function __construct(protected SolicitationService $solicitationService)
    {
    }

    public function getSolicitations(): JsonResponse
    {
        $solicitations = $this->solicitationService->getSolicitations();

        return response()->json($solicitations, 200);
    }

    public function createSolicitation(SolicitationRequest $request): JsonResponse
    {
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
