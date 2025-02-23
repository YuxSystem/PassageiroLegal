<?php

namespace App\Repositories\Implementations;

use App\Models\User;
use App\Repositories\AuthRepository;

class AuthRepositoryImpl implements AuthRepository
{

    /**
     * @inheritDoc
     */
    public function create(User $user): User
    {
        return User::create($user->getAttributes());
    }
}
