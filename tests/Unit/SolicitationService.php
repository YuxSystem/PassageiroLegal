<?php

namespace Tests\Unit;

use App\Models\Solicitation;
use App\Repositories\SolicitationRepository;
use App\Services\Implementations\SolicitationServiceImpl;
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use Tests\TestCase;

class SolicitationService extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_get_solicitations(): void
    {
        // arrange
        $expectedValues = new Collection([
            new Solicitation(['user_id' => 1, 'motivo' => 'voo_legal_1']),
            new Solicitation(['user_id' => 2, 'motivo' => 'voo_legal_2']),
        ]);

        $solicitationRepositoryMock = Mockery::mock(SolicitationRepository::class);
        $solicitationRepositoryMock->shouldReceive('getAll')->once()->andReturn($expectedValues);

        $sut = new SolicitationServiceImpl($solicitationRepositoryMock);

        // act
        $solicitations = $sut->getSolicitations();

        // assert
        $this->assertCount(2, $solicitations);
        $this->assertEquals('voo_legal_1', $solicitations[0]['motivo']);
        $this->assertEquals('voo_legal_2', $solicitations[1]['motivo']);
    }
}
