<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Illuminate\Auth\Events\Registered;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class AuthenticatedSessionController extends Controller
{
  public function __construct(protected AuthService $service) {}

  public function login(Request $request): RedirectResponse
  {
    $credentials = $request->validate([
      'email' => 'required|email',
      'password' => 'required'
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
      $request->session()->regenerate();
      return redirect("/verify");
    }

    return back()->withErrors([
      'error' => 'Email ou senha incorretos. Por favor, tente novamente.',
    ]);
  }

  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
  }

  public function register(AuthRequest $request)
  {
    $user = $this->service->signUp($request->all());

    event(new Registered($user));

    Auth::login($user);

    return redirect("/verify");
  }
}
