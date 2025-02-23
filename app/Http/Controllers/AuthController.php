<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(protected AuthService $service)
    {
    }

    public function login(Request $request)
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

    public function register(AuthRequest $request)
    {
        $user = $this->service->createUser($request->all());

        return response()->json($user, 204);
    }
}
