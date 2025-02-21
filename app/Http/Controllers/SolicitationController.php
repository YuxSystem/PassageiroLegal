<?php

namespace App\Http\Controllers;

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
}
