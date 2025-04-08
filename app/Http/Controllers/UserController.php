<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\UserService;
use App\Enums\UserRoleEnum;

class UserController extends Controller
{

  public function __construct(protected UserService $service) {}

  public function index(Request $request)
  {
    $search = $request->input('search') ?? "";
    $perPage = (int)$request->input('per_page', 10);
    $page = (int)$request->input('page', 1);

    $users = $this->service->searchUser($search, $perPage, $page);

    return Inertia::render('Users', [
      'users' => $users->items(),
      'pagination' => [
        'current_page' => $users->currentPage(),
        'total_pages' => $users->lastPage(),
        'total_items' => $users->total(),
        'per_page' => $users->perPage(),
        'next_page' => $users->nextPageUrl()
          ? $users->nextPageUrl() . "&per_page={$perPage}"
          : null,
        'previous_page' => $users->previousPageUrl()
          ? $users->previousPageUrl() . "&per_page={$perPage}"
          : null,
      ]
    ]);
  }

  public function create()
  {
    return Inertia::render('Components/AddUsuario');
  }

  public function show(string $id)
  {
    $user = User::findOrFail($id);
    $perPage = request()->input('per_page', 10);
    $page = request()->input('page', 1);

    $solicitations = $user->solicitations()
      ->orderBy('created_at', 'desc')
      ->paginate($perPage);

    return Inertia::render('UserDetails', [
      'user' => $user,
      'solicitations' => $solicitations->items(),
      'solicitations_pagination' => [
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

  public function update(Request $request, User $user)
  {
    $user->update($request->all());

    return back();
  }

  public function changeRole(Request $request, string $id)
  {
    $role = $request->get('role');
    $this->service->changeRole($id, UserRoleEnum::from($role));
    return back();
  }

  public function toggleStatus(string $id)
  {
    $user = User::findOrFail($id);
    $newStatus = $user->status === "Enabled" ? "Disabled" : "Enabled";
    $user->update(['status' => $newStatus]);
    return back();
  }
}
