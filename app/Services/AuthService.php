<?php

namespace App\Services;

use App\Models\User;

interface AuthService
{
    /**
     * Solicita a criação de um novo usuário.
     *
     * @param array $data Dados do usuário.
     * @return User Usuário criado.
     */
    public function createUser(array $data): User;
}
