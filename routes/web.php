<?php

use App\Http\Controllers\SolicitationController;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

// Index Page
Route::get('/', fn() => inertia("Index"));

// Auth Pages
Route::get('/login', fn() => inertia("Login"));
Route::get('/cadastro', fn() => inertia("Signup"));

// Auth Middleware
Route::middleware(['auth'])->group(function () {
  // Verify User Role
  Route::get("/verify", function () {
    $user = User::find(Auth::id());
    return $user->role === "Admin" ? redirect()->route('solicitacoes.index') : redirect()->route('solicitacoes.create');
  });
});

// User Pages
Route::middleware(['auth'])->group(function () {
  // Exibe View para criar uma nova solicitação
  Route::get('/nova-solicitacao', fn() => inertia("Solicitation/Create"))->name('solicitacoes.create');
  // Exibe View para listar todas as solicitações do usuário
  Route::get('/solicitacoes', [SolicitationController::class, 'index'])->name('solicitacoes.index');
  // Exibe View para detalhes de uma solicitação específica
  Route::get('/solicitacao/{id}', [SolicitationController::class, 'show'])->name('solicitacoes.show');

  // Armazena uma nova solicitação
  Route::post('/solicitacao', [SolicitationController::class, 'store'])->name('solicitacoes.store');
});


// Admin Pages
Route::middleware(['auth', 'admin'])->group(function () {
  // Exibe View do Dashboard do Admin
  Route::get('/admin/dashboard', fn() => inertia("Dashboard"));
  // Exibe View para listar todas as solicitações do Admin
  Route::get('/admin/solicitacoes', [SolicitationController::class, 'index'])->name('solicitacoes.index');
  // Atualiza o status de uma solicitação
  Route::put('/admin/solicitacao/{id}/status', [SolicitationController::class, 'updateStatus'])->name('solicitacoes.update-status');
  // Faz o download de um arquivo de uma solicitação
  Route::get('/admin/solicitacao/{id}/download/{type}', [SolicitationController::class, 'downloadFile'])->name('solicitacoes.download');
});


require __DIR__ . '/auth.php';
