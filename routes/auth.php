<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticatedSessionController::class, 'login']);
Route::post('/register', [AuthenticatedSessionController::class, 'register']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);