<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SolicitationNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $message
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Notificação - Passageiro Legal',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.solicitation-notification',
            with: [
                'message' => $this->message,
            ],
        );
    }
}

