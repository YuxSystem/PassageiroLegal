<?php

use App\Http\Controllers\api\AuthControllerApi;
use App\Http\Controllers\api\SolicitationControllerApi;
use App\Http\Controllers\api\UserControllerApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');
//
//Route::post('/signup', [AuthControllerApi::class, 'signUp']);
//
//Route::middleware('auth:sanctum')->group(function () {
//    Route::post('/solicitations', [SolicitationControllerApi::class, 'createSolicitation']);
//    Route::get('/solicitations', [SolicitationControllerApi::class, 'getSolicitations']);
//});
//
//Route::middleware(['auth:sanctum', 'admin'])->group(function () {
//    Route::get('/solicitation/{id}', [SolicitationControllerApi::class, 'getSolicitation']);
//    Route::put('/solicitation/status/{id}', [SolicitationControllerApi::class, 'updateSolicitationStatus']);
//
//    Route::put('/user/{id}', [UserControllerApi::class, 'changeRole']);
//    Route::get('/user/search', [UserControllerApi::class, 'searchUser']);
//});


Route::get('/solicitations', [SolicitationControllerApi::class, 'getSolicitations']);
Route::post('/solicitations', [SolicitationControllerApi::class, 'createSolicitation']);
