<?php

namespace App\Services;

use App\Enums\UserRoleEnum;

interface UserService
{
    /**
     * Altera a função de um usuário
     *
     * @param string $id Id do usuário
     * @param UserRoleEnum $role Novo papel do usuário
     * @return array Usuário atualizado
     */
    public function changeRole(string $id, UserRoleEnum $role): array;
}
