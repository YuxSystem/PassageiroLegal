<?php

namespace App\Services;

use App\Enums\UserRoleEnum;
use Illuminate\Pagination\LengthAwarePaginator;

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

    /**
     * Busca um usuário por ID, Nome ou Email
     *
     * @param string $query Dado a ser pesquisado
     * @return LengthAwarePaginator
     */
    public function searchUser(string $query, int $perPage, int $page): LengthAwarePaginator;
}
