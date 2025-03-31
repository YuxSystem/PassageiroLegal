<?php

namespace App\Repositories\Implementations;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class UserRepositoryImpl implements UserRepository
{

  /**
   * @inheritDoc
   */
  public function create(User $user): User
  {
    return User::create($user->getAttributes());
  }

  /**
   * @inheritDoc
   */
  public function update(string $id, array $data): User
  {
    $userToUpdate = User::findOrFail($id);
    $userToUpdate->update($data);

    return $userToUpdate;
  }

  /**
   * @inheritDoc
   */
  public function search($query, int $perPage = 10, int $page = 1): LengthAwarePaginator
  {
    return User::where('id', '!=', Auth::id())
      ->where(function ($q) use ($query) {
        $q->where('id', 'LIKE', "%{$query}%")
          ->orWhere('email', 'LIKE', "%{$query}%")
          ->orWhere('name', 'LIKE', "%{$query}%");
      })
      ->paginate($perPage, ['*'], 'page', $page);
  }
}
