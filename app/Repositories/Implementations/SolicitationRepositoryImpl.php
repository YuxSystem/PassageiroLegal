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
        return Solicitation::create($data);
    }

    public function get(string $id): Solicitation
    {
        return Solicitation::findOrFail($id);
    }

    public function update(string $id, array $data): Solicitation
    {
        $solicitationToUpdate = Solicitation::findOrFail($id);
        $solicitationToUpdate->update($data);

        return $solicitationToUpdate;
    }
}
