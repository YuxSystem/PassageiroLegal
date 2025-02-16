<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitations;
use Inertia\Inertia;

class SolicitacoesController extends Controller
{
    public function index()
    {
        return Inertia::render('components/Solicitations', [
            'solicitacoes' => Solicitations::with('user')->get(),
        ]);
    }
}
