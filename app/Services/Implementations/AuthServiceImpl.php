<?php

namespace App\Services\Implementations;

use App\Models\User;
use App\Repositories\AuthRepository;
use App\Services\AuthService;

class AuthServiceImpl implements AuthService
{
    private AuthRepository $repository;

    public function __construct(AuthRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @inheritDoc
     */
    public function createUser(array $data): User
    {
        return $this->repository->create(new User($data));
    }
}
