<?php

use App\Http\Controllers\SolicitationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Index Page
Route::get('/', function () {
  if (Auth::check()) {
    $user = Auth::user();
    if ($user->role === "Admin") {
      return redirect("/admin/dashboard");
    }
    return redirect("/nova-solicitacao");
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
  // Dashboard
  Route::get('/admin/dashboard', [App\Http\Controllers\DashboardController::class, 'index']);
  // Exibe View para listar todas as solicitações do Admin
  Route::get('/admin/solicitacoes', [SolicitationController::class, 'index']);
  // Exibe View para processos não atribuídos
  Route::get('/admin/solicitacoes/nao-atribuidas', [SolicitationController::class, 'unassigned']);
  // Atualiza o status de uma solicitação
  Route::put('/admin/solicitacao/{id}/status', [SolicitationController::class, 'updateStatus']);
  // Atribui uma solicitação a um agente
  Route::post('/admin/solicitacao/{id}/atribuir', [SolicitationController::class, 'assign']);
  // Valida/aprova uma solicitação
  Route::post('/admin/solicitacao/{id}/validar', [SolicitationController::class, 'validate']);
  // Visualiza processos pendentes de validação
  Route::get('/admin/solicitacoes/pendentes-validacao', [SolicitationController::class, 'pendingValidation']);
  // Adiciona comentário a uma solicitação
  Route::post('/admin/solicitacao/{id}/comentario', [SolicitationController::class, 'addComment']);
  // Exporta dados
  Route::get('/admin/solicitacoes/exportar/{format}', [SolicitationController::class, 'export']);
  // Faz o download de um arquivo de uma solicitação
  Route::get('/admin/solicitacao/{id}/download/{type}', [SolicitationController::class, 'downloadFile']);

  // Rotas de usuários
  Route::get('/admin/usuarios', [UserController::class, 'index']);
  Route::get('/admin/usuarios/{id}', [UserController::class, 'show']);
  Route::put('/admin/usuarios/{id}/role', [UserController::class, 'changeRole']);
  Route::put('/admin/usuarios/{id}/toggle-status', [UserController::class, 'toggleStatus']);
});

// Employee Pages (Agentes e Supervisores)
Route::middleware(['auth', 'enabled'])->group(function () {
  // Agentes veem apenas processos atribuídos a eles
  Route::get('/agente/solicitacoes', [SolicitationController::class, 'index']);
  // Adiciona comentário (agentes podem adicionar comentários internos)
  Route::post('/solicitacao/{id}/comentario', [SolicitationController::class, 'addComment']);
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
