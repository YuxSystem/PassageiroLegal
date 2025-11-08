<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from query parameter, session, or browser
        $locale = $request->query('lang') 
            ?? Session::get('locale') 
            ?? $request->getPreferredLanguage(['pt-BR', 'en', 'pt', 'en-US'])
            ?? 'pt-BR';

        // Normalize locale
        if ($locale === 'pt' || $locale === 'pt-PT') {
            $locale = 'pt-BR';
        }
        if ($locale === 'en-US' || $locale === 'en-GB') {
            $locale = 'en';
        }

        // Only allow supported locales
        if (!in_array($locale, ['pt-BR', 'en'])) {
            $locale = 'pt-BR';
        }

        // Set locale
        App::setLocale($locale);
        Session::put('locale', $locale);

        return $next($request);
    }
}

