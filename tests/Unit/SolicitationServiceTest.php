<?php

namespace Tests\Unit;

use App\Models\Solicitation;
use App\Models\User;
use App\Repositories\SolicitationRepository;
use App\Services\Implementations\SolicitationServiceImpl;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class SolicitationServiceTest extends TestCase
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

    public function test_create_solicitation(): void
    {
        // arrange
        $solicitation = new Solicitation([
            'user_id' => User::factory()->create()->id,
            'motivo' => 'voo_legal_1',
            'num_voo' => '123',
            'dta_voo' => '2021-01-01',
            'detalhe' => 'detalhe',
            'status' => 'status',
        ]);

        $solicitationRepositoryMock = Mockery::mock(SolicitationRepository::class);
        $solicitationRepositoryMock->shouldReceive('create')->once()->andReturn($solicitation);

        $sut = new SolicitationServiceImpl($solicitationRepositoryMock);

        // act
        $createdSolicitation = $sut->createSolicitation($solicitation->toArray());

        // assert
        $this->assertEquals('voo_legal_1', $createdSolicitation['motivo']);
    }

    public function test_get_solicitation(): void
    {
        // arrange
        $solicitation = new Solicitation([
            'user_id' => User::factory()->create()->id,
            'motivo' => 'voo_legal_1',
            'num_voo' => '123',
            'dta_voo' => '2021-01-01',
            'detalhe' => 'detalhe',
            'status' => 'status',
        ]);

        $solicitationRepositoryMock = Mockery::mock(SolicitationRepository::class);
        $solicitationRepositoryMock->shouldReceive('get')->once()->andReturn($solicitation);

        $sut = new SolicitationServiceImpl($solicitationRepositoryMock);

        // act
        $solicitation = $sut->getSolicitation("c6e27417-bb80-4355-9cc4-0aff16bd2c3e");

        // assert
        $this->assertEquals('voo_legal_1', $solicitation['motivo']);
    }

    public function test_update_solicitation_status(): void
    {
        // arrange
        $id = User::factory()->create()->id;
        $data = ['status' => 'Finalizado'];

        $repository = Mockery::mock(SolicitationRepository::class);
        $sut = new SolicitationServiceImpl($repository);

        $repository->shouldReceive('update')->with(Mockery::any(), $data)->once()->andReturn(new Solicitation());

        // act
        $sut->updateSolicitationStatus($id, $data);

    }

    public function test_upload_files(): void
    {
        // arrange
        Storage::fake('local');

        // ID da solicitação
        $solicitationId = '12345';

        // Cria arquivos simulados
        $files = [
            'registro_nasc' => UploadedFile::fake()->create('documento.pdf', 1024),
            'comprovante_res' => UploadedFile::fake()->create('documento.pdf', 1024),
            'comprovante_voo' => UploadedFile::fake()->create('documento.pdf', 1024)
        ];

        $solicitationRepositoryMock = Mockery::mock(SolicitationRepository::class);
        $solicitationRepositoryMock
            ->shouldReceive('update')
            ->once()
            ->andReturn(new Solicitation());

        $sut = new SolicitationServiceImpl($solicitationRepositoryMock);

        // act
        $result = $sut->uploadFiles($solicitationId, $files);

        // assert
        $this->assertNotNull($result);
    }
}
