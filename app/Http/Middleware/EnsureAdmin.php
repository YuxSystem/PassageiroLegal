<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
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
        $isAdmin = auth()->check() && User::where('id', auth()->id())->first()->rule === 'Admin';

        if ($isAdmin) {
            return $next($request);
        }

        throw new NotFoundHttpException();
    }
}
