<?php

namespace App\Repositories;

use App\Models\Solicitation;
use Illuminate\Pagination\LengthAwarePaginator;

interface SolicitationRepository {
    public function getAll(int $perPage, int $page): LengthAwarePaginator;

    public function getByUserId(string $userId, int $perPage, int $page): LengthAwarePaginator;

    public function create(array $data): Solicitation;

    public function get(string $id): Solicitation;

    public function update(string $id, array $data): Solicitation;
}
