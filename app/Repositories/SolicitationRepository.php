<?php

namespace App\Repositories;

use App\Models\Solicitation;
use Illuminate\Database\Eloquent\Collection;

interface SolicitationRepository {
    public function getAll(): Collection;

    public function create(array $data): Solicitation;
}
