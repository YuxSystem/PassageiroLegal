<?php

namespace Tests\Unit;

use App\Enums\UserRoleEnum;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Implementations\UserServiceImpl;
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
}
