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

        $sut = new SolicitationRepositoryImpl();

        // act
        $solicitations = $sut->getAll();

        // assert
        $this->assertCount(10, $solicitations);
    }

    public function test_create_solicitation(): void
    {
        // arrange
        $this->seed();
        $this->seed(SolicitationSeeder::class);
        $sut = new SolicitationRepositoryImpl();

        // act
        $solicitation = $sut->create([
            'user_id' => "uuid",
            'motivo' => 'Teste',
            'num_voo' => '123',
            'dta_voo' => '2021-10-10',
            'detalhe' => 'Teste',
            'status' => 'Pendente',
        ]);

        // assert
        $this->assertNotNull($solicitation);
    }
}
