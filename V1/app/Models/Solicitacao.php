<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitacao extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'motivo',             // Motivo da solicitação
        'num_voo',            // Número do voo
        'dta_voo',            // Data do voo
        'detalhe',            // Detalhes adicionais
        'registro_nasc',      // Caminho do registro de nascimento
        'comprovante_res',    // Caminho do comprovante de residência
        'comprovante_voo',    // Caminho do comprovante do voo
        'notifi',             // Notificação (true/false)
        'notifi_tipo',        // Tipo de notificação
        'user_id',            // Relacionamento com a tabela usuários
    ];

    /**
     * Relacionamento com o modelo User (um para muitos inverso).
     */
    public function user()
    {
        return $this->belongsTo(User::class); // Cada solicitação pertence a um usuário
    }
}
