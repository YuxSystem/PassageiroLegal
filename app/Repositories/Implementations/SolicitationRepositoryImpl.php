<?php

namespace App\Repositories\Implementations;

use App\Models\Solicitations;
use App\Repositories\SolicitationRepository;
use Illuminate\Database\Eloquent\Collection;

class SolicitationRepositoryImpl implements SolicitationRepository
{
    public function getAll(): Collection
    {
        return Solicitations::all();
    }
}
