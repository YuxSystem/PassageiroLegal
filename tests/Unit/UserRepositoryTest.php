<?php

namespace Tests\Unit;

use App\Repositories\Implementations\UserRepositoryImpl;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_search_users(): void
    {
        // arrange
        $this->seed();

        $sut = new UserRepositoryImpl();

        // act
        $users = $sut->search('test');

        // assert
        $this->assertCount(1, $users);
    }


}
