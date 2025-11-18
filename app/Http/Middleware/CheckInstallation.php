<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class CheckInstallation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Se está na rota de instalação, permitir acesso
        if ($request->is('install*')) {
            return $next($request);
        }

        // Se não está instalado, redirecionar para instalação
        if (!File::exists(storage_path('app/.installed'))) {
            return redirect()->route('install.index');
        }

        return $next($request);
    }
}

