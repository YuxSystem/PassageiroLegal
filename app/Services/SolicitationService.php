<?php

namespace App\Services;

interface SolicitationService {
    public function getSolicitations(): array;

    public function createSolicitation(array $data): array;

    public function getSolicitation(string $id): array;
}
