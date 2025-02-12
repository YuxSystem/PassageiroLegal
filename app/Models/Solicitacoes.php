<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'motivo', 'num_voo', 'dta_voo', 'detalhe',
        'registro_nasc', 'comprovante_res', 'comprovante_voo', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
