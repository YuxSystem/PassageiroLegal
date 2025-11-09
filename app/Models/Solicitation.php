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
        'assigned_to', 'assigned_by', 'assigned_at',
        'validation_status', 'validated_by', 'validated_at', 'validation_notes'
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'validated_at' => 'datetime',
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

    public function validatedBy()
    {
        return $this->belongsTo(User::class, 'validated_by', 'id');
    }

    public function isAssigned(): bool
    {
        return $this->assigned_to !== null;
    }

    public function needsValidation(): bool
    {
        return $this->validation_status === null || $this->validation_status === 'Pendente';
    }

    public function isApproved(): bool
    {
        return $this->validation_status === 'Aprovado';
    }

    public function isRejected(): bool
    {
        return $this->validation_status === 'Rejeitado';
    }

    public static function booted() {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
