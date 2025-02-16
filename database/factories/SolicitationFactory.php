<?php

namespace Database\Factories;

use App\Models\Solicitation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Solicitation>
 */
class SolicitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'motivo' => $this->faker->text(100),
            'num_voo' => $this->faker->text(10),
            'dta_voo' => $this->faker->date(),
            'detalhe' => $this->faker->text(100),
            'registro_nasc' => $this->faker->text(100),
            'comprovante_res' => $this->faker->text(100),
            'comprovante_voo' => $this->faker->text(100),
            'status' => 'Pendente'
        ];
    }
}
