<?php

Route::post('/login', [AuthControllerApi::class, 'login']);
Route::post('/logout', [AuthControllerApi::class, 'logout']);