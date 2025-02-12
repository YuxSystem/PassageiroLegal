<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Solicitacao;

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
Route::get('/usuarios', fn() => Inertia::render('Usuarios'));
Route::get('/companhias', fn() => Inertia::render('Companhias'));

//Dinamic Pages
Route::get('/solicitacoes', function () {
    $solicitacoes = Solicitacao::with('user')->get();

    return Inertia::render('Solicitacoes', [
        'solicitacoes' => $solicitacoes,
    ]);
})->name('solicitacoes');

Route::post('/solicitacoes', function (Request $request) {
    $validated = $request->validate([
        'nome_companhia' => 'required|string|max:255',
        'iata' => 'required|string|size:3',
        'icao' => 'required|string|size:4',
        'indicativo_chamada' => 'required|string|max:255',
        'aeroporto_partida' => 'required|string|max:255',
        'aeroporto_escala' => 'nullable|string|max:255',
        'aeroporto_destino' => 'required|string|max:255',
    ]);

    $request->user()->solicitacoes()->create($validated);

    return redirect()->route('solicitacoes');
});


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
        return Inertia::render('Dashboard', [
            'userRole' => auth()->user()->role, // Passando a role do usuário
        ]);
    })->name('dashboard');
});
