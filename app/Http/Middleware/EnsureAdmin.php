<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EnsureAdmin
{
  /**
   * Handle an incoming request.
   *
   * @param  Closure(Request): (Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $isAdmin = Auth::check() && User::where('id', Auth::id())->first()->role === 'Admin';

    if ($isAdmin) {
      return $next($request);
    }

    throw new NotFoundHttpException();
  }
}
