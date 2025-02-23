<?php

namespace Tests\Unit;

use App\Models\User;
use App\Repositories\AuthRepository;
use App\Services\Implementations\AuthServiceImpl;
use Mockery;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{

    public function test_create_user(): void
    {
        //arrange
        $user = new User([
            'name' => 'John Doe',
            'email' => 'john_doe@email.com',
            'password' => '123456',
        ]);

        $authRepositoryMock = Mockery::mock(AuthRepository::class);
        $authRepositoryMock->shouldReceive('create')->once()->andReturn($user);

        $sut = new AuthServiceImpl($authRepositoryMock);

        //act
        $createdUser = $sut->createUser($user->toArray());

        //assert
        $this->assertEquals('John Doe', $createdUser['name']);
    }
}
