<?php

namespace App\Models;

use Database\Factories\SolicitationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Solicitation extends Model
{
    /** @use HasFactory<SolicitationFactory> */
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id', 'motivo', 'num_voo', 'dta_voo', 'detalhe',
        'registro_nasc', 'comprovante_res', 'comprovante_voo', 'status',
        'assigned_to', 'assigned_by', 'assigned_at'
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'dta_voo' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, "assigned_to", "id");
    }

    public function assignedBy()
    {
        return $this->belongsTo(User::class, "assigned_by", "id");
    }

    public function statusHistory()
    {
        return $this->hasMany(SolicitationStatusHistory::class, 'solicitation_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(SolicitationComment::class, 'solicitation_id', 'id');
    }

    public function isAssigned(): bool
    {
        return $this->assigned_to !== null;
    }

    public static function booted() {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
