<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserRepository
{
  /**
   * Cria um novo usuário
   *
   * @param User $user Usuário a ser criado
   * @return User Usuário criado
   */
  public function create(User $user): User;

  /**
   * Atualiza um usuário
   *
   * @param string $id Identificador do Usuário
   * @param array $data Dados a serem atualizados
   * @return User Usuário atualizado
   */
  public function update(string $id, array $data): User;

  /**
   * Busca um usuário
   *
   * @param $query String a ser consultada
   * @param int $perPage Quantidade de itens por página
   * @param int $page Página a ser consultada
   */
  public function search($query, int $perPage, int $page): LengthAwarePaginator;
}
