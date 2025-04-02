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

  public function update(Request $request, User $user)
  {
    // if ($request->has('rule')) {
    //   $user->update(['rule' => $request->rule]);
    // }

    // if ($request->has('status')) {
    //   $user->update(['status' => $request->status]);
    // }

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
