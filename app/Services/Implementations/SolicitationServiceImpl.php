<?php

namespace App\Services\Implementations;

use App\Repositories\SolicitationRepository;
use App\Services\SolicitationService;

class SolicitationServiceImpl implements SolicitationService
{
    private SolicitationRepository $solicitationRepository;

    public function __construct(SolicitationRepository $solicitationRepository)
    {
        $this->solicitationRepository = $solicitationRepository;
    }

    public function getSolicitations(): array
    {
        return $this->solicitationRepository->getAll()->toArray();
    }
}
