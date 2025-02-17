<?php

namespace App\Services\Implementations;

use App\Repositories\SolicitationRepository;
use App\Services\SolicitationService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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

    /**
     * @throws ValidationException
     */
    public function createSolicitation(array $data): array
    {
        $validated = Validator::make($data, [
            'user_id' => 'required|integer',
            'motivo' => 'required|string',
            'num_voo' => 'required|string',
            'dta_voo' => 'required|date',
            'detalhe' => 'required|string',
            'status' => 'required|string',
        ])->validate();

        return $this->solicitationRepository->create($validated)->toArray();
    }
}
