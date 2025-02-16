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
}
