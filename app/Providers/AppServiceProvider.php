<?php

namespace App\Providers;

use App\Models\Solicitation;
use App\Observers\SolicitationObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Solicitation::observe(SolicitationObserver::class);
    }
}
