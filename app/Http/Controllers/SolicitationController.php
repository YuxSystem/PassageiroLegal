<?php

namespace App\Http\Controllers;

use App\Services\SolicitationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

  public function updateStatus(Request $request, string $id)
  {
    $solicitation = $this->solicitationService->updateSolicitationStatus($id, $request->all());

    return back();
  }
}
