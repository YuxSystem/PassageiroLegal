<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;

interface SolicitationService {
    public function getSolicitations(int $perPage, int $page): LengthAwarePaginator;

    public function getUnassignedSolicitations(int $perPage, int $page): LengthAwarePaginator;

    public function getAssignedSolicitations(string $agentId, int $perPage, int $page): LengthAwarePaginator;

    public function createSolicitation(array $data): array;

    public function getSolicitation(string $id): array;

    public function updateSolicitationStatus(string $id, array $data): array;

    public function assignSolicitation(string $id, string $agentId, string $assignedById): array;

    public function addComment(string $id, string $comment, bool $isInternal = false): array;

    public function validateSolicitation(string $id, string $status, ?string $notes = null): array;

    public function getPendingValidation(int $perPage, int $page): LengthAwarePaginator;

    public function uploadFiles(string $id, array $files): array;
}
