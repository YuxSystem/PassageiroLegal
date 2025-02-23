<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SolicitationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/solicitations', [SolicitationController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/solicitations', [SolicitationController::class, 'index']);
    Route::get('/solicitation/{id}', [SolicitationController::class, 'show']);
});

