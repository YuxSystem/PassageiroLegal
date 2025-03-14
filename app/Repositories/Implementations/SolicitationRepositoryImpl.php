<?php

namespace App\Repositories\Implementations;

use App\Models\Solicitation;
use App\Repositories\SolicitationRepository;
use Illuminate\Pagination\LengthAwarePaginator;


class SolicitationRepositoryImpl implements SolicitationRepository
{
    public function getAll(int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Solicitation::paginate($perPage, ['*'], 'page', $page);
    }

    public function getByUserId(string $userId, int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Solicitation::where('user_id', $userId)
            ->paginate($perPage, ['*'], 'page', $page);
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
