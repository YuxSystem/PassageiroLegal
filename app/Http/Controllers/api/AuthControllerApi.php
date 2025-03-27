<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthControllerApi extends Controller
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

        if (Auth::attempt($credentials)) {
          return response()->json([
              'message' => 'Login successful!',
          ]);
      }

      return response()->json(['message' => 'Credenciais Inválidas'], 401);

    }

    public function logout() {
      auth()->logout(); // For session-based authentication

      return response()->json([
        'message' => 'Successfully logged out!',
      ]);
    }

    public function signUp(AuthRequest $request)
    {
        $user = $this->service->signUp($request->all());

        return response()->json($user, 201);
    }
}
