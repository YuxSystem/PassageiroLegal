<?php

namespace Database\Seeders;

use App\Models\Solicitations;
use Illuminate\Database\Seeder;

class SolicitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Solicitations::factory()->count(10)->create();
    }
}
