<?php

namespace App\Listeners;

use App\Events\QuizCompleted;
use App\Services\LeaderboardService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateLeaderboard
{
    /**
     * Create the event listener.
     */
    public function __construct(private LeaderboardService $leaderboardService)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(QuizCompleted $event): void
    {
        $this->leaderboardService->update($event->user->id, $event->quiz->topic_id);
    }
}

