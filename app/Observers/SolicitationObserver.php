<?php

namespace App\Observers;

use App\Models\Solicitation;
use App\Models\SolicitationStatusHistory;
use Illuminate\Support\Facades\Auth;

class SolicitationObserver
{
    /**
     * Handle the Solicitation "updated" event.
     */
    public function updated(Solicitation $solicitation): void
    {
        // Verificar se o status mudou
        if ($solicitation->wasChanged('status')) {
            SolicitationStatusHistory::create([
                'solicitation_id' => $solicitation->id,
                'old_status' => $solicitation->getOriginal('status'),
                'new_status' => $solicitation->status,
                'changed_by' => Auth::id(),
            ]);
        }
    }
}

