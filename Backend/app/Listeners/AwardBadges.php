<?php

namespace App\Listeners;

use App\Events\QuizCompleted;
use App\Services\BadgeService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AwardBadges
{
    /**
     * Create the event listener.
     */
    public function __construct(private BadgeService $badgeService)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(QuizCompleted $event): void
    {
        $this->badgeService->checkAndAward($event->user->id);
    }
}

