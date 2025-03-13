<?php

namespace App\Http\Controllers;

use App\Models\Solicitation;
use Inertia\Inertia;

class SolicitationController extends Controller
{
    public function index()
    {
        return Inertia::render('components/Solicitacoes', [
            'solicitacoes' => Solicitation::with('user')->get(),
        ]);
    }
}
