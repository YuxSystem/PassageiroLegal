<?php

namespace Tests\Unit;

use App\Models\User;
use App\Repositories\Implementations\UserRepositoryImpl;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user(): void
    {
        // arrange
        $this->seed();

        $sut = new UserRepositoryImpl();

        // act
        $user = $sut->create(new User([
            'name' => 'Teste',
            'email' => 'test@email.com',
            'password' => '12345678',
        ]));

        // assert
        $this->assertNotNull($user);
    }

    public function test_update_user(): void
    {
        // arrange
        $this->seed();

        $sut = new UserRepositoryImpl();
        $user = $sut->create(new User([
            'name' => 'Teste',
            'email' => 'test@email.com',
            'password' => '12345678',
        ]));

        $updateUser = $sut->update($user->id, [
            'name' => 'Teste 2'
        ]);

        // assert
        $this->assertEquals('Teste 2', $updateUser['name']);

    }
}
