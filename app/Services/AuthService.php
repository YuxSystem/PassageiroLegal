<?php

namespace App\Services;

use App\Models\User;

interface AuthService
{
    /**
     * Cria um novo usuário.
     *
     * @param array $data Dados do usuário.
     * @return User Usuário criado.
     */
    public function signUp(array $data): User;


}
