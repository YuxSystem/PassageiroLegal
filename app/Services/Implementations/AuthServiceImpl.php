<?php

namespace App\Services\Implementations;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\AuthService;

class AuthServiceImpl implements AuthService
{
    private UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @inheritDoc
     */
    public function signUp(array $data): User
    {
        return $this->repository->create(new User($data));
    }

}
