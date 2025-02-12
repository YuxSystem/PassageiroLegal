<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitacoes;
use Inertia\Inertia;

class SolicitacoesController extends Controller
{
    public function index()
    {
        return Inertia::render('components/Solicitacoes', [
            'solicitacoes' => Solicitacoes::with('user')->get(),
        ]);
    }
}
