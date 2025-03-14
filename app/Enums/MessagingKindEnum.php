<?php

namespace App\Enums;

/**
 * Enum para mapear tipos de mensagens.
 */
enum MessagingKindEnum: string
{
    /**
     * Mensagem de e-mail.
     */
    case EMAIL = 'Email';
    /**
     * Mensagem via WhatsApp.
     */
    case WHATSAPP = 'WhatsApp';
}
