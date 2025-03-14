<?php

namespace App\Services\Implementations;

use App\Enums\MessagingKindEnum;
use App\Services\MessagingService;

class MessagingServiceImpl implements MessagingService
{

    public function send(MessagingKindEnum $kind, string $to): void
    {
        // TODO: Implement send() method.
    }
}
