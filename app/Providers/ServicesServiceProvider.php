<?php

namespace App\Providers;

use App\Services\Implementations\SolicitationServiceImpl;
use App\Services\SolicitationService;
use Illuminate\Support\ServiceProvider;

class ServicesServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        SolicitationService::class => SolicitationServiceImpl::class,
    ];

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
    ];
}
