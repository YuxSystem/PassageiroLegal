<?php

namespace App\Repositories\Implementations;

use App\Models\Solicitation;
use App\Repositories\SolicitationRepository;
use Illuminate\Database\Eloquent\Collection;

class SolicitationRepositoryImpl implements SolicitationRepository
{
    public function getAll(): Collection
    {
        return Solicitation::all();
    }

    public function create(array $data): Solicitation
    {
        return Solicitation::create([
            'user_id' => $data['user_id'],
            'motivo' => $data['motivo'],
            'num_voo' => $data['num_voo'],
            'dta_voo' => $data['dta_voo'],
            'detalhe' => $data['detalhe'],
            'status' => $data['status'],
        ]);
    }

    public function get(string $id): Solicitation
    {
        return Solicitation::findOrFail($id);
    }
}
