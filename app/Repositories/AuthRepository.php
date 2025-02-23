<?php

namespace App\Repositories;

use App\Models\User;

interface AuthRepository
{
    /**
     * Cria um novo usuário
     *
     * @param User $user Usuário a ser criado
     * @return User Usuário criado
     */
    public function create(User $user): User;
}
