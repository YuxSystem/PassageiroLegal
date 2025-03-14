<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;

interface SolicitationService {
    public function getSolicitations(int $perPage, int $page): LengthAwarePaginator;

    public function createSolicitation(array $data): array;

    public function getSolicitation(string $id): array;

    public function updateSolicitationStatus(string $id, array $data): array;

    public function uploadFiles(string $id, array $files): array;
}
