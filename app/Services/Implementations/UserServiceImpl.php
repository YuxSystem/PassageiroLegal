<?php

namespace App\Services\Implementations;

use App\Enums\UserRoleEnum;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Pagination\LengthAwarePaginator;

class UserServiceImpl implements UserService
{
    private UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @inheritDoc
     */
    public function changeRole(string $id, UserRoleEnum $role): array
    {
        return $this->repository->update($id, ['role' => $role->value])->toArray();
    }

    /**
     * @inheritDoc
     */
    public function searchUser(string $query, int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return $this->repository->search($query, $perPage, $page);
    }
}
