<?php

namespace App\Services\Implementations;

use App\Models\SolicitationStatusHistory;
use App\Models\SolicitationComment;
use App\Repositories\SolicitationRepository;
use App\Services\SolicitationService;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class SolicitationServiceImpl implements SolicitationService
{
  private SolicitationRepository $solicitationRepository;

  public function __construct(SolicitationRepository $solicitationRepository)
  {
    $this->solicitationRepository = $solicitationRepository;
  }

  public function getSolicitations(int $perPage = 10, int $page = 1): LengthAwarePaginator
  {
    /** @var User $user */
    $user = Auth::user();

    if ($user->isAdmin()) {
      return $this->solicitationRepository->getAll($perPage, $page);
    }

    if ($user->isEmployee()) {
      // Agentes veem apenas processos atribuídos a eles
      return $this->solicitationRepository->getByAssignedTo($user->id, $perPage, $page);
    }

    // Usuários comuns veem apenas suas próprias solicitações
    return $this->solicitationRepository->getByUserId($user->id, $perPage, $page);
  }

  public function getUnassignedSolicitations(int $perPage = 10, int $page = 1): LengthAwarePaginator
  {
    return $this->solicitationRepository->getUnassigned($perPage, $page);
  }

  public function getAssignedSolicitations(string $agentId, int $perPage = 10, int $page = 1): LengthAwarePaginator
  {
    return $this->solicitationRepository->getByAssignedTo($agentId, $perPage, $page);
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
    // O histórico será registrado automaticamente pelo Observer
    $updated = $this->solicitationRepository->update($id, $data);
    
    return $updated->toArray();
  }

  public function assignSolicitation(string $id, string $agentId, string $assignedById): array
  {
    $assigned = $this->solicitationRepository->assign($id, $agentId, $assignedById);
    
    // Adicionar comentário interno sobre a atribuição
    SolicitationComment::create([
      'solicitation_id' => $id,
      'user_id' => $assignedById,
      'comment' => "Processo atribuído ao agente",
      'is_internal' => true,
    ]);
    
    return $assigned->toArray();
  }

  public function addComment(string $id, string $comment, bool $isInternal = false): array
  {
    $solicitation = $this->solicitationRepository->get($id);
    
    $commentModel = SolicitationComment::create([
      'solicitation_id' => $id,
      'user_id' => Auth::id(),
      'comment' => $comment,
      'is_internal' => $isInternal,
    ]);
    
    return $commentModel->load('user')->toArray();
  }

  public function validateSolicitation(string $id, string $status, ?string $notes = null): array
  {
    $solicitation = $this->solicitationRepository->get($id);
    
    $updated = $this->solicitationRepository->update($id, [
      'validation_status' => $status,
      'validated_by' => Auth::id(),
      'validated_at' => now(),
      'validation_notes' => $notes,
    ]);
    
    // Adicionar comentário sobre validação
    $statusLabel = $status === 'Aprovado' ? 'aprovado' : 'rejeitado';
    SolicitationComment::create([
      'solicitation_id' => $id,
      'user_id' => Auth::id(),
      'comment' => "Processo {$statusLabel}" . ($notes ? ": {$notes}" : ''),
      'is_internal' => false,
    ]);
    
    return $updated->fresh()->toArray();
  }

  public function getPendingValidation(int $perPage = 10, int $page = 1): LengthAwarePaginator
  {
    return Solicitation::whereNull('validation_status')
      ->orWhere('validation_status', 'Pendente')
      ->paginate($perPage, ['*'], 'page', $page);
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
