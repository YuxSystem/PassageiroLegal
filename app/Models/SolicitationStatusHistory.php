<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SolicitationStatusHistory extends Model
{
    use HasFactory;

    protected $table = 'solicitation_status_history';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'solicitation_id',
        'old_status',
        'new_status',
        'changed_by',
        'notes',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function solicitation()
    {
        return $this->belongsTo(Solicitation::class, 'solicitation_id', 'id');
    }

    public function changedBy()
    {
        return $this->belongsTo(User::class, 'changed_by', 'id');
    }

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}

