<?php

namespace Tests\Unit;

use App\Models\User;
use App\Repositories\Implementations\AuthRepositoryImpl;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user(): void
    {
        // arrange
        $this->seed();

        $sut = new AuthRepositoryImpl();

        // act
        $user = $sut->create(new User([
            'name' => 'Teste',
            'email' => 'test@email.com',
            'password' => '12345678',
        ]));

        // assert
        $this->assertNotNull($user);
    }
}
