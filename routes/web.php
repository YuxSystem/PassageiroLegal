<?php

use App\Http\Controllers\SolicitationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Index Page
Route::get('/', function () {
  if (Auth::check()) {
    $user = Auth::user();
    return $user->role === "Admin" ? redirect("/admin/solicitacoes") : redirect("/nova-solicitacao");
  }

  return inertia("Index");
});

// Auth Pages
Route::get('/login', fn() => inertia("Login"));
Route::get('/cadastro', fn() => inertia("Signup"));

// User Pages
Route::middleware(['auth', 'enabled'])->group(function () {
  // Exibe View para criar uma nova solicitação
  Route::get('/nova-solicitacao', fn() => inertia("SolicitationCreate"));
  // Exibe View para listar todas as solicitações do usuário
  Route::get('/solicitacoes', [SolicitationController::class, 'index']);
  // Exibe View para detalhes de uma solicitação específica
  Route::get('/solicitacao/{id}', [SolicitationController::class, 'show']);

  // Armazena uma nova solicitação
  Route::post('/solicitacao', [SolicitationController::class, 'store']);
});

// Admin Pages
Route::middleware(['auth', 'admin', 'enabled'])->group(function () {
  // Exibe View para listar todas as solicitações do Admin
  Route::get('/admin/solicitacoes', [SolicitationController::class, 'index']);
  // Atualiza o status de uma solicitação
  Route::put('/admin/solicitacao/{id}/status', [SolicitationController::class, 'updateStatus']);
  // Faz o download de um arquivo de uma solicitação
  Route::get('/admin/solicitacao/{id}/download/{type}', [SolicitationController::class, 'downloadFile']);

  // Rotas de usuários
  Route::get('/admin/usuarios', [UserController::class, 'index']);
  Route::put('/admin/usuarios/{id}/role', [UserController::class, 'changeRole']);
  Route::put('/admin/usuarios/{id}/toggle-status', [UserController::class, 'toggleStatus']);
});

// Profile Routes
Route::middleware(['auth', 'enabled'])->group(function () {
  Route::get('/perfil', [App\Http\Controllers\ProfileController::class, 'show']);
  Route::put('/perfil', [App\Http\Controllers\ProfileController::class, 'update']);
  Route::put('/perfil/senha', [App\Http\Controllers\ProfileController::class, 'updatePassword']);
  Route::post('/perfil/sessoes-navegador', [App\Http\Controllers\ProfileController::class, 'logoutOtherBrowserSessions']);
  Route::delete('/perfil', [App\Http\Controllers\ProfileController::class, 'destroy']);
});

require __DIR__ . '/auth.php';
