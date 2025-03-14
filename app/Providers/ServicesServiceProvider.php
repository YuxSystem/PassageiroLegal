<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\Implementations\AuthServiceImpl;
use App\Services\Implementations\MessagingServiceImpl;
use App\Services\Implementations\SolicitationServiceImpl;
use App\Services\Implementations\UserServiceImpl;
use App\Services\MessagingService;
use App\Services\SolicitationService;
use App\Services\UserService;
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
        AuthService::class => AuthServiceImpl::class,
        UserService::class => UserServiceImpl::class,
        MessagingService::class => MessagingServiceImpl::class,
    ];

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
    ];
}
