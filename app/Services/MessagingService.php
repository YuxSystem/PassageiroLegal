<?php

namespace App\Services;

use App\Enums\MessagingKindEnum;

interface MessagingService
{
    public function send(MessagingKindEnum $kind, string $to): void;
}
