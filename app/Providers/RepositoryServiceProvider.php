<?php

namespace App\Providers;

use App\Repositories\AuthRepository;
use App\Repositories\Implementations\AuthRepositoryImpl;
use App\Repositories\Implementations\SolicitationRepositoryImpl;
use App\Repositories\SolicitationRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        SolicitationRepository::class => SolicitationRepositoryImpl::class,
        AuthRepository::class => AuthRepositoryImpl::class,
    ];

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
    ];
}
