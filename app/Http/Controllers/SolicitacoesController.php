<?php

namespace App\Http\Controllers;

use App\Models\Solicitation;
use Inertia\Inertia;

class SolicitacoesController extends Controller
{
    public function index()
    {
        return Inertia::render('components/Solicitation', [
            'solicitacoes' => Solicitation::with('user')->get(),
        ]);
    }
}
