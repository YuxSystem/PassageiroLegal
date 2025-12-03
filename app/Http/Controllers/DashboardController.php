<?php

namespace App\Http\Controllers;

use App\Models\Solicitation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'total_solicitations' => Solicitation::count(),
            'open_solicitations' => Solicitation::where('status', 'Em Aberto')->count(),
            'pending_solicitations' => Solicitation::where('status', 'Pendente')->count(),
            'finished_solicitations' => Solicitation::where('status', 'Finalizado')->count(),
            'unassigned_solicitations' => Solicitation::whereNull('assigned_to')->count(),
            'total_users' => User::where('role', 'User')->count(),
            'total_agents' => User::where('role', 'Employee')->count(),
            'solicitations_by_reason' => Solicitation::select('motivo', DB::raw('count(*) as total'))
                ->groupBy('motivo')
                ->get()
                ->mapWithKeys(fn($item) => [$item->motivo => $item->total]),
            'solicitations_by_status' => Solicitation::select('status', DB::raw('count(*) as total'))
                ->groupBy('status')
                ->get()
                ->mapWithKeys(fn($item) => [$item->status => $item->total]),
            'recent_solicitations' => Solicitation::with(['user', 'assignedTo'])
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(fn($s) => [
                    'id' => $s->id,
                    'motivo' => $s->motivo,
                    'status' => $s->status,
                    'user_name' => $s->user->name ?? 'N/A',
                    'assigned_to' => $s->assignedTo->name ?? null,
                    'created_at' => $s->created_at->toIso8601String(),
                ]),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
        ]);
    }
}

