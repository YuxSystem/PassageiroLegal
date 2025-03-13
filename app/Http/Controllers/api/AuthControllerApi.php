<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthControllerApi extends Controller
{
    public function __construct(protected AuthService $service)
    {
    }

    public function signIn(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Gera um token para o usuário autenticado
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function signUp(AuthRequest $request)
    {
        $user = $this->service->signUp($request->all());

        return response()->json($user, 201);
    }
}
