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

    public function createSolicitation(array $data): array
    {
        return $this->solicitationRepository->create($data)->toArray();
    }

    public function getSolicitation(string $id): array
    {
        return $this->solicitationRepository->get($id)->toArray();
    }

    public function updateSolicitationStatus(string $id, array $data): array
    {
        return $this->solicitationRepository->update($id, $data)->toArray();
    }
}
