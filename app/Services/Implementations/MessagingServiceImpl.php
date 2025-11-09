<?php

namespace App\Services\Implementations;

use App\Enums\MessagingKindEnum;
use App\Mail\SolicitationNotificationMail;
use App\Services\MessagingService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class MessagingServiceImpl implements MessagingService
{
    private string $evolutionApiUrl;
    private string $evolutionApiKey;
    private string $evolutionInstanceName;

    public function __construct()
    {
        $this->evolutionApiUrl = config('services.evolution_api.url', env('EVOLUTION_API_URL', ''));
        $this->evolutionApiKey = config('services.evolution_api.key', env('EVOLUTION_API_KEY', ''));
        $this->evolutionInstanceName = config('services.evolution_api.instance', env('EVOLUTION_API_INSTANCE', ''));
    }

    public function send(MessagingKindEnum $kind, string $to, ?string $message = null): void
    {
        match ($kind) {
            MessagingKindEnum::WHATSAPP => $this->sendWhatsApp($to, $message),
            MessagingKindEnum::EMAIL => $this->sendEmail($to, $message),
        };
    }

    private function sendWhatsApp(string $to, ?string $message = null): void
    {
        if (empty($this->evolutionApiUrl) || empty($this->evolutionApiKey) || empty($this->evolutionInstanceName)) {
            Log::warning('Evolution API não configurada. Mensagem WhatsApp não enviada.', [
                'to' => $to,
            ]);
            return;
        }

        // Remove caracteres não numéricos do telefone
        $phone = preg_replace('/\D/', '', $to);
        
        // Adiciona código do país se não tiver (assumindo Brasil +55)
        if (!str_starts_with($phone, '55')) {
            $phone = '55' . $phone;
        }

        $defaultMessage = $message ?? "Olá! Sua solicitação foi registrada com sucesso no Passageiro Legal. Acompanhe o status em nossa plataforma.";

        try {
            $response = Http::withHeaders([
                'apikey' => $this->evolutionApiKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->evolutionApiUrl}/message/sendText/{$this->evolutionInstanceName}", [
                'number' => $phone,
                'text' => $defaultMessage,
            ]);

            if (!$response->successful()) {
                Log::error('Erro ao enviar mensagem WhatsApp via Evolution API', [
                    'to' => $to,
                    'phone' => $phone,
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Exceção ao enviar mensagem WhatsApp', [
                'to' => $to,
                'error' => $e->getMessage(),
            ]);
        }
    }

    private function sendEmail(string $to, ?string $message = null): void
    {
        try {
            $defaultMessage = $message ?? "Sua solicitação foi registrada com sucesso no Passageiro Legal. Acompanhe o status em nossa plataforma.";
            
            Mail::to($to)->send(new SolicitationNotificationMail($defaultMessage));
            
            Log::info('Email enviado com sucesso', [
                'to' => $to,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao enviar email', [
                'to' => $to,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
