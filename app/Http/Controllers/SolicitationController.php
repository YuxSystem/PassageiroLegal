<?php

namespace App\Http\Controllers;

use App\Services\SolicitationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SolicitationRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class SolicitationController extends Controller
{

  public function __construct(
    protected SolicitationService $solicitationService,
  ) {}

  public function index(Request $request)
  {
    $perPage = (int)$request->input('per_page', 10);
    $page = (int)$request->input('page', 1);

    $solicitations = $this->solicitationService->getSolicitations($perPage, $page);

    return Inertia::render('Solicitations', [
      'solicitations' => $solicitations->items(),
      'pagination' => [
        'current_page' => $solicitations->currentPage(),
        'total_pages' => $solicitations->lastPage(),
        'total_items' => $solicitations->total(),
        'per_page' => $solicitations->perPage(),
        'next_page' => $solicitations->nextPageUrl()
          ? $solicitations->nextPageUrl() . "&per_page={$perPage}"
          : null,
        'previous_page' => $solicitations->previousPageUrl()
          ? $solicitations->previousPageUrl() . "&per_page={$perPage}"
          : null,
      ]
    ]);
  }

  public function show(string $id)
  {
    $solicitation = $this->solicitationService->getSolicitation($id);
    $agents = User::where('role', 'Employee')->where('status', 'Enabled')->get(['id', 'name', 'email']);

    return Inertia::render('SolicitationDetails', [
      'solicitation' => $solicitation,
      'agents' => $agents,
    ]);
  }

  public function store(SolicitationRequest $request)
  {
    /** @var \App\Models\User $user */
    $user = Auth::user();
    $request->merge(['user_id' => $user->id]);

    $solicitation = $this->solicitationService->createSolicitation($request->all());
    $this->solicitationService->uploadFiles($solicitation['id'], $request->allFiles());

    // Atualiza os dados do usuário
    $userData = $request->input('userData');
    if ($userData) {
      $user->legal_document = $userData['legal_document'];
      $user->cellphone = $userData['cellphone'];
      $user->zipcode = $userData['zipcode'];
      $user->street = $userData['street'];
      $user->city = $userData['city'];
      $user->state = $userData['state'];
      $user->country = $userData['country'];
      $user->save();
    }

    // Redireciona para a página de detalhes da solicitação criada
    return redirect("/solicitacao/{$solicitation['id']}")->with([
      'solicitation_id' => $solicitation['id'],
      'user_name' => $user->name,
      'user_cellphone' => $userData['cellphone'] ?? null,
      'success' => 'Solicitação criada com sucesso!',
    ]);
  }

  public function updateStatus(Request $request, string $id)
  {
    $this->solicitationService->updateSolicitationStatus($id, $request->all());

    return back();
  }

  public function assign(Request $request, string $id)
  {
    $request->validate([
      'agent_id' => 'required|exists:users,id',
    ]);

    /** @var \App\Models\User $user */
    $user = Auth::user();

    $this->solicitationService->assignSolicitation($id, $request->input('agent_id'), $user->id);

    return back();
  }

  public function addComment(Request $request, string $id)
  {
    $request->validate([
      'comment' => 'required|string|max:1000',
      'is_internal' => 'boolean',
    ]);

    $this->solicitationService->addComment(
      $id,
      $request->input('comment'),
      $request->input('is_internal', false)
    );

    return back();
  }

  public function validate(Request $request, string $id)
  {
    $request->validate([
      'status' => 'required|in:Aprovado,Rejeitado',
      'notes' => 'nullable|string|max:500',
    ]);

    $this->solicitationService->validateSolicitation(
      $id,
      $request->input('status'),
      $request->input('notes')
    );

    return back();
  }

  public function pendingValidation(Request $request)
  {
    $perPage = (int)$request->input('per_page', 10);
    $page = (int)$request->input('page', 1);

    $solicitations = $this->solicitationService->getPendingValidation($perPage, $page);

    return Inertia::render('Solicitations', [
      'solicitations' => $solicitations->items(),
      'pagination' => [
        'current_page' => $solicitations->currentPage(),
        'total_pages' => $solicitations->lastPage(),
        'total_items' => $solicitations->total(),
        'per_page' => $solicitations->perPage(),
        'next_page' => $solicitations->nextPageUrl()
          ? $solicitations->nextPageUrl() . "&per_page={$perPage}"
          : null,
        'previous_page' => $solicitations->previousPageUrl()
          ? $solicitations->previousPageUrl() . "&per_page={$perPage}"
          : null,
      ],
      'filter' => 'pending_validation',
    ]);
  }

  public function unassigned(Request $request)
  {
    $perPage = (int)$request->input('per_page', 10);
    $page = (int)$request->input('page', 1);

    $solicitations = $this->solicitationService->getUnassignedSolicitations($perPage, $page);

    return Inertia::render('Solicitations', [
      'solicitations' => $solicitations->items(),
      'pagination' => [
        'current_page' => $solicitations->currentPage(),
        'total_pages' => $solicitations->lastPage(),
        'total_items' => $solicitations->total(),
        'per_page' => $solicitations->perPage(),
        'next_page' => $solicitations->nextPageUrl()
          ? $solicitations->nextPageUrl() . "&per_page={$perPage}"
          : null,
        'previous_page' => $solicitations->previousPageUrl()
          ? $solicitations->previousPageUrl() . "&per_page={$perPage}"
          : null,
      ],
      'filter' => 'unassigned',
    ]);
  }

  public function export(Request $request, string $format)
  {
    $solicitations = Solicitation::with(['user', 'assignedTo', 'assignedBy'])
      ->orderBy('created_at', 'desc')
      ->get();

    if ($format === 'csv') {
      return $this->exportToCsv($solicitations);
    } elseif ($format === 'pdf') {
      return $this->exportToPdf($solicitations);
    }

    return back()->withErrors(['format' => 'Formato não suportado']);
  }

  private function exportToCsv($solicitations)
  {
    $filename = 'solicitacoes_' . date('Y-m-d_H-i-s') . '.csv';

    $headers = [
      'Content-Type' => 'text/csv',
      'Content-Disposition' => "attachment; filename=\"{$filename}\"",
    ];

    $callback = function() use ($solicitations) {
      $file = fopen('php://output', 'w');

      // BOM para UTF-8
      fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

      // Cabeçalhos
      fputcsv($file, [
        'ID',
        'Usuário',
        'Motivo',
        'Número do Voo',
        'Data do Voo',
        'Status',
        'Atribuído Para',
        'Atribuído Por',
        'Data de Criação',
      ], ';');

      // Dados
      foreach ($solicitations as $solicitation) {
        fputcsv($file, [
          $solicitation->id,
          $solicitation->user->name ?? 'N/A',
          $solicitation->motivo,
          $solicitation->num_voo,
          $solicitation->dta_voo?->format('d/m/Y') ?? 'N/A',
          $solicitation->status,
          $solicitation->assignedTo->name ?? 'Não atribuído',
          $solicitation->assignedBy->name ?? 'N/A',
          $solicitation->created_at->format('d/m/Y H:i'),
        ], ';');
      }

      fclose($file);
    };

    return response()->stream($callback, 200, $headers);
  }

  private function exportToPdf($solicitations)
  {
    // Para PDF, vamos usar uma view simples que pode ser convertida
    // Em produção, use uma biblioteca como dompdf ou snappy
    $html = view('exports.solicitations-pdf', ['solicitations' => $solicitations])->render();

    // Por enquanto, retornamos HTML que pode ser impresso como PDF pelo navegador
    // Em produção, implemente com dompdf: composer require dompdf/dompdf
    return response($html)
      ->header('Content-Type', 'text/html')
      ->header('Content-Disposition', 'inline; filename="solicitacoes_' . date('Y-m-d') . '.html"');
  }

  public function downloadFile(string $id, string $type)
  {
    $solicitation = $this->solicitationService->getSolicitation($id);

    $filePath = match ($type) {
      'registro_nasc' => $solicitation['registro_nasc'],
      'comprovante_res' => $solicitation['comprovante_res'],
      'comprovante_voo' => $solicitation['comprovante_voo'],
      default => throw new \InvalidArgumentException('Tipo de arquivo inválido'),
    };

    if (!Storage::disk("local")->exists($filePath)) {
      return response()->json([
        'error' => 'Arquivo não encontrado',
      ], 404);
    }

    // Obtém a extensão original do arquivo
    $extension = pathinfo($filePath, PATHINFO_EXTENSION);

    // Define o nome amigável baseado no tipo
    $fileName = match ($type) {
      'registro_nasc' => "Registro de Nascimento - {$id}.{$extension}",
      'comprovante_res' => "Comprovante de Endereço - {$id}.{$extension}",
      'comprovante_voo' => "Comprovante de Voo - {$id}.{$extension}",
      default => basename($filePath),
    };



    return response()->download(
      Storage::disk("local")->path($filePath),
      $fileName,
    );
  }
}
