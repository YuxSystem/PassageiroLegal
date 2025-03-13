<?php

namespace App\Repositories\Implementations;

use App\Models\User;
use App\Repositories\UserRepository;

class UserRepositoryImpl implements UserRepository
{

    /**
     * @inheritDoc
     */
    public function create(User $user): User
    {
        return User::create($user->getAttributes());
    }

    public function update(string $id, array $data): User
    {
        $userToUpdate = User::findOrFail($id);
        $userToUpdate->update($data);

        return $userToUpdate;
    }
}
