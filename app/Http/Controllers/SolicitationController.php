<?php

namespace App\Http\Controllers;

use App\Services\SolicitationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SolicitationRequest;
use Illuminate\Support\Facades\Auth;



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

    return Inertia::render('SolicitationDetails', [
      'solicitation' => $solicitation
    ]);
  }

  public function store(SolicitationRequest $request)
  {
    $user = Auth::user();
    $request->merge(['user_id' => $user->id]);

    $solicitation = $this->solicitationService->createSolicitation($request->all());
    $this->solicitationService->uploadFiles($solicitation['id'], $request->allFiles());

    // if ($request->input("email_companion") != null) {
    //   $this->messagingService->send(MessagingKindEnum::EMAIL, $request->input("email_companion"));
    // }

    // TODO: Implementar envio de mensagem
    // $this->messagingService->send(MessagingKindEnum::WHATSAPP, $request->input("cellphone"));

    return redirect("/minhas-solicitacoes");
  }

  public function updateStatus(Request $request, string $id)
  {
    $this->solicitationService->updateSolicitationStatus($id, $request->all());

    return back();
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
