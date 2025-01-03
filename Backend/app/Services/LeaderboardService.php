<?php

namespace App\Services;

use App\Models\Leaderboard;
use App\Models\Score;

class LeaderboardService
{
    public function update(int $userId, int $topicId): void
    {
        // Calcul total points de l'user sur ce topic
        $totalPoints = Score::where('user_id', $userId)
            ->where('topic_id', $topicId)
            ->sum('points_earned');

        // Mettre à jour ou créer l'entrée leaderboard
        Leaderboard::updateOrCreate(
            [
                'user_id' => $userId,
                'topic_id' => $topicId
            ],
            [
                'total_points' => $totalPoints,
            ]
        );

        // Recalculer les ranks pour ce topic
        $this->recalculateRanks($topicId);
    }

    private function recalculateRanks(int $topicId): void
    {
        $entries = Leaderboard::where('topic_id', $topicId)
            ->orderByDesc('total_points')
            ->get();

        foreach ($entries as $index => $entry) {
            $entry->update(['rank' => $index + 1]);
        }
    }
}
