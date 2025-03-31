<?php

namespace App\Http\Controllers\api;

use App\Enums\MessagingKindEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\SolicitationRequest;
use App\Http\Requests\SolicitationUpdateStatus;
use App\Services\MessagingService;
use App\Services\SolicitationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SolicitationControllerApi extends Controller
{
  public function __construct(
    protected SolicitationService $solicitationService,
    // protected MessagingService    $messagingService,
  ) {}

  public function createSolicitation(SolicitationRequest $request): JsonResponse
  {
    // $user = Auth::user();
    // $request->merge(['user_id' => $user->id]);

    $solicitation = $this->solicitationService->createSolicitation($request->all());
    $this->solicitationService->uploadFiles($solicitation['id'], $request->allFiles());

    // if ($request->input("email_companion") != null) {
    //   $this->messagingService->send(MessagingKindEnum::EMAIL, $request->input("email_companion"));
    // }

    // TODO: Implementar envio de mensagem
    // $this->messagingService->send(MessagingKindEnum::WHATSAPP, $request->input("cellphone"));

    $created_solicitation = $this->solicitationService->getSolicitation($solicitation['id']);

    return response()->json($created_solicitation, 201);
  }

  public function getSolicitation(string $id): JsonResponse
  {
    $solicitation = $this->solicitationService->getSolicitation($id);

    return response()->json($solicitation, 200);
  }
}
