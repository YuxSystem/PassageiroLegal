<?php

namespace App\Services\Implementations;

use App\Repositories\SolicitationRepository;
use App\Services\SolicitationService;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;


class SolicitationServiceImpl implements SolicitationService
{
  private SolicitationRepository $solicitationRepository;

  public function __construct(SolicitationRepository $solicitationRepository)
  {
    $this->solicitationRepository = $solicitationRepository;
  }

  public function getSolicitations(int $perPage = 10, int $page = 1): LengthAwarePaginator
  {
    $user = Auth::user();

    if ($user->isAdmin() || $user->isEmployee()) {
      return $this->solicitationRepository->getAll($perPage, $page);
    }

    return $this->solicitationRepository->getByUserId($user->id, $perPage, $page);
  }

  public function createSolicitation(array $data): array
  {
    return $this->solicitationRepository->create($data)->toArray();
  }

  public function getSolicitation(string $id): array
  {
    return $this->solicitationRepository->get($id)->toArray();
  }

  public function updateSolicitationStatus(string $id, array $data): array
  {
    return $this->solicitationRepository->update($id, $data)->toArray();
  }

  public function uploadFiles(string $id, array $files): array
  {
    $paths = [];

    foreach ($files as $key => $file) {
      $path = $file->store("solicitations/{$id}");
      $paths[$key] = $path;
    }

    $this->solicitationRepository->update($id, $paths);

    return $paths;
  }
}
