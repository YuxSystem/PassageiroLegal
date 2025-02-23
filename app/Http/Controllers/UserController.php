<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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

