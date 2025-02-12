<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Components/UsuarioList', [
            'users' => User::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Components/AddUsuario');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'cpf' => 'required|unique:users',
            'password' => 'required|min:6',
            'telefone' => 'nullable',
            'celular' => 'nullable',
            'cidade' => 'nullable',
            'estado' => 'nullable',
            'pais' => 'nullable',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'cpf' => $request->cpf,
            'password' => Hash::make($request->password),
            'telefone' => $request->telefone,
            'celular' => $request->celular,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
            'pais' => $request->pais,
            'rule' => 'User',
            'status' => 'Ativo',
        ]);

        return redirect()->route('usuario.index');
    }

    public function update(Request $request, User $user)
    {
        if ($request->has('rule')) {
            $user->update(['rule' => $request->rule]);
        }

        if ($request->has('status')) {
            $user->update(['status' => $request->status]);
        }

        return back();
    }
}

