<?php

namespace App\Http\Controllers;

use App\Services\SolicitationService;
use App\Services\MessagingService;
use App\Enums\MessagingKindEnum;
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
    protected MessagingService $messagingService,
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

    // Enviar notificação WhatsApp se celular fornecido
    if ($userData && !empty($userData['cellphone'])) {
      try {
        $message = "Olá {$user->name}! Sua solicitação foi registrada com sucesso no Passageiro Legal. ID: {$solicitation['id']}. Acompanhe o status em nossa plataforma.";
        $this->messagingService->send(MessagingKindEnum::WHATSAPP, $userData['cellphone'], $message);
      } catch (\Exception $e) {
        // Log do erro mas não interrompe o fluxo
        \Log::error('Erro ao enviar WhatsApp após criação de solicitação', [
          'solicitation_id' => $solicitation['id'],
          'error' => $e->getMessage(),
        ]);
      }
    }

    return redirect("/solicitacoes");
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
