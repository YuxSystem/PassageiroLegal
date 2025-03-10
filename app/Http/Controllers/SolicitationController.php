<?php

namespace App\Http\Controllers;

use App\Http\Requests\SolicitationRequest;
use App\Http\Requests\SolicitationUpdateStatus;
use App\Services\SolicitationService;

class SolicitationController extends Controller
{
    public function __construct(protected SolicitationService $solicitationService)
    {
    }

    public function index()
    {
        $solicitations = $this->solicitationService->getSolicitations();

        return response()->json($solicitations, 200);
    }

    public function show(string $id)
    {
        $solicitation = $this->solicitationService->getSolicitation($id);

        return response()->json($solicitation, 200);
    }

    public function store(SolicitationRequest $request)
    {
        $solicitation = $this->solicitationService->createSolicitation($request->all());
        $this->solicitationService->uploadFiles($solicitation['id'], $request->allFiles());

        $created_solicitation = $this->solicitationService->getSolicitation($solicitation['id']);

        return response()->json($created_solicitation, 201);
    }

    public function updateSolicitationStatus(SolicitationUpdateStatus $request, string $id)
    {
        $solicitation = $this->solicitationService->updateSolicitationStatus($id, $request->all());

        return response()->json($solicitation, 200);
    }
}
