<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProcessStatusNotification extends Notification
{
    use Queueable;

    /**
     * The status of the process.
     *
     * @var string
     */
    protected $status;

    /**
     * Create a new notification instance.
     *
     * @param string $status
     */
    public function __construct(string $status)
    {
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param object $notifiable
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param object $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Atualização no status do processo')
            ->line('O status do seu processo foi atualizado.')
            ->line('Status atual: ' . $this->status)
            ->action('Ver Detalhes', url('/dashboard'))
            ->line('Obrigado por usar nossa plataforma!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param object $notifiable
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Status atualizado!',
            'message' => 'Seu processo está atualmente em: ' . $this->status,
            'status' => $this->status,
        ];
    }
}
