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

    public function getUnassigned(int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Solicitation::whereNull('assigned_to')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function getByAssignedTo(string $agentId, int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Solicitation::where('assigned_to', $agentId)
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function create(array $data): Solicitation
    {
        return Solicitation::create($data);
    }

    public function get(string $id): Solicitation
    {
        return Solicitation::with(['user', 'assignedTo', 'assignedBy', 'validatedBy', 'statusHistory.changedBy', 'comments.user'])
            ->findOrFail($id);
    }

    public function update(string $id, array $data): Solicitation
    {
        $solicitationToUpdate = Solicitation::findOrFail($id);
        $solicitationToUpdate->update($data);

        return $solicitationToUpdate;
    }

    public function assign(string $id, string $agentId, string $assignedById): Solicitation
    {
        $solicitation = Solicitation::findOrFail($id);
        $solicitation->update([
            'assigned_to' => $agentId,
            'assigned_by' => $assignedById,
            'assigned_at' => now(),
        ]);

        return $solicitation->fresh();
    }
}
