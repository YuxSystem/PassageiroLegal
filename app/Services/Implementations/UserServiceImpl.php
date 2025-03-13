<?php

namespace App\Services\Implementations;

use App\Enums\UserRoleEnum;
use App\Repositories\UserRepository;
use App\Services\UserService;

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
}
