<?php

namespace Tests\Unit;

use App\Repositories\Implementations\SolicitationRepositoryImpl;
use Database\Seeders\SolicitationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SolicitationRepositoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_get_all_solicitations(): void
    {
        // arrange
        $this->seed();
        $this->seed(SolicitationSeeder::class);

        $repository = new SolicitationRepositoryImpl();

        // act
        $solicitations = $repository->getAll();

        // assert
        $this->assertCount(10, $solicitations);
    }
}
