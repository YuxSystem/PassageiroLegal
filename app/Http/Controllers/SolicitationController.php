<?php

namespace App\Http\Controllers;

use App\Http\Requests\SolicitationRequest;
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

    public function store(SolicitationRequest $request)
    {
        $solicitation = $this->solicitationService->createSolicitation($request->all());

        return response()->json($solicitation, 201);
    }
}
