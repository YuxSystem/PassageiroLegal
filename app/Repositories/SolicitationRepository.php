<?php

use Illuminate\Database\Eloquent\Collection;

interface SolicitationRepository {
    public function getAll(): Collection;
}
