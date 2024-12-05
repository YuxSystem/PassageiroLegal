<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Pages/Web
Route::get('/direito-passageiros', fn() => Inertia::render('Web/DireitoPassageiros'));
Route::get('/indenizacao-atraso', fn() => Inertia::render('Web/IndenizacaoAtraso'));
Route::get('/indenizacao-cancelamento', fn() => Inertia::render('Web/IndenizacaoCancelamento'));
Route::get('/perda-conexao', fn() => Inertia::render('Web/PerdaConexao'));
Route::get('/indenizacao-overbooking', fn() => Inertia::render('Web/IndenizacaoOverbooking'));
Route::get('/indenizacao-bagagem', fn() => Inertia::render('Web/IndenizacaoBagagem'));
Route::get('/indenizacao-greve', fn() => Inertia::render('Web/IndenizacaoGreve'));
Route::get('/reembolso-voo', fn() => Inertia::render('Web/ReembolsoVoo'));
Route::get('/aeroportos', fn() => Inertia::render('Web/Aeroportos'));
Route::get('/companhias-aereas', fn() => Inertia::render('Web/CompanhiasAereas'));
Route::get('/ajuda', fn() => Inertia::render('Web/Ajuda'));
Route::get('/faq', fn() => Inertia::render('Web/FAQ'));
Route::get('/fale-conosco', fn() => Inertia::render('Web/FaleConosco'));
Route::get('/cookies', fn() => Inertia::render('Web/Cookies'));
Route::get('/sobre', fn() => Inertia::render('Web/Sobre'));
Route::get('/blog', fn() => Inertia::render('Web/Blog'));
Route::get('/imprensa', fn() => Inertia::render('Web/Imprensa'));
Route::get('/carreira', fn() => Inertia::render('Web/Carreira'));
Route::get('/parceiro-juridico', fn() => Inertia::render('Web/ParceiroJuridico'));
Route::get('/para-companhias', fn() => Inertia::render('Web/ParaCompanhias'));

// /Pages
Route::get('/termos-condicoes', fn() => Inertia::render('TermsOfService'));
Route::get('/politica-privacidade', fn() => Inertia::render('PrivacyPolicy'));


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
