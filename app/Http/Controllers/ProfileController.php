<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Carbon\Carbon;

class ProfileController extends Controller
{
  public function show()
  {
    return Inertia::render('Profile/Show', [
      'sessions' => $this->getSessions(),
      'twoFactorEnabled' => false, // Implementar depois
    ]);
  }

  public function update(Request $request)
  {
    $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
    ]);

    Auth::user()->update($request->only('name', 'email'));

    return back()->with('success', 'Perfil atualizado com sucesso.');
  }

  public function updatePassword(Request $request)
  {
    $request->validate([
      'current_password' => ['required', 'current_password'],
      'password' => ['required', Password::defaults(), 'confirmed'],
    ]);

    Auth::user()->update([
      'password' => Hash::make($request->password),
    ]);

    return back()->with('success', 'Senha atualizada com sucesso.');
  }

  public function logoutOtherBrowserSessions(Request $request)
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    Auth::user()->tokens()->where('id', '!=', Auth::user()->currentAccessToken()?->id)->delete();

    DB::table('sessions')
      ->where('user_id', Auth::id())
      ->where('id', '!=', $request->session()->getId())
      ->delete();

    return back()->with('success', 'Outras sessões foram desconectadas.');
  }

  public function destroy(Request $request)
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = Auth::user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
  }

  protected function getSessions()
  {
    if (config('session.driver') !== 'database') {
      return [];
    }

    return DB::table('sessions')
      ->where('user_id', Auth::id())
      ->orderBy('last_activity', 'desc')
      ->get()
      ->map(function ($session) {
        return [
          'agent' => $session->user_agent,
          'ip' => $session->ip_address,
          'is_current' => $session->id === request()->session()->getId(),
          'last_active' => Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
        ];
      });
  }
}
