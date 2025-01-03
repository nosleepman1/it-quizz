<?php

namespace App\Listeners;

use App\Events\QuizCompleted;
use App\Services\ScoreService;
use App\Models\Choice;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CalculateScore
{
    /**
     * Create the event listener.
     */
    public function __construct(private ScoreService $scoreService)
    {
        
    }

    /**
     * Handle the event.
     */
    public function handle(QuizCompleted $event): void
    {
        $choiceIds = collect($event->reponse)->pluck('choice_id')->filter()->toArray();
        $totalCorrect = Choice::whereIn('id', $choiceIds)->where('is_correct', true)->count();
        $totalQuestions = count($event->reponse) ?: 1;

        $this->scoreService->calculateScore([
            'user_id' => $event->user->id,
            'quiz_id' => $event->quiz->id,
            'topic_id' => $event->quiz->topic_id,
            'total_questions' => $totalQuestions,
            'total_correct' => $totalCorrect,
            'difficulty' => $event->quiz->difficulty,
            'time_taken' => $event->quiz->time_taken ?? 0,
        ]);
    }
}

