<?php

namespace Tests\Unit;

use App\Enums\UserRoleEnum;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Implementations\UserServiceImpl;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Mockery;
use Tests\TestCase;

class UserServiceTest extends TestCase
{
    public function test_change_role(): void
    {
        // arrange
        $userId = Str::uuid()->toString();
        $newRole = UserRoleEnum::ADMIN;

        $authRepositoryMock = Mockery::mock(UserRepository::class);
        $sut = new UserServiceImpl($authRepositoryMock);

        $authRepositoryMock->shouldReceive('update')
            ->with($userId, ['role' => 'Admin'])
            ->once()
            ->andReturn(new User());

        // act
        $sut->changeRole($userId, $newRole);

    }

    public function test_search_user(): void
    {
        // arrange
        $query = 'user';
        $perPage = 10;
        $page = 1;

        $authRepositoryMock = Mockery::mock(UserRepository::class);
        $sut = new UserServiceImpl($authRepositoryMock);

        $authRepositoryMock->shouldReceive('search')
            ->with($query, $perPage, $page)
            ->once()
            ->andReturn(new LengthAwarePaginator([], 10, 10, 1));

        // act
        $sut->searchUser($query, $perPage, $page);
    }
}
