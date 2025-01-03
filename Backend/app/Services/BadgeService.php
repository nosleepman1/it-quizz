<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\Score;
use App\Models\UserBadge;

class BadgeService
{
    public function checkAndAward(int $userId): void
    {
        $badges = Badge::all();

        foreach ($badges as $badge) {
            // Vérifier si l'user a déjà ce badge
            $alreadyEarned = UserBadge::where('user_id', $userId)
                ->where('badge_id', $badge->id)
                ->exists();

            if ($alreadyEarned) continue;

            // Vérifier si l'user mérite ce badge
            if ($this->meritsBadge($userId, $badge)) {
                UserBadge::create([
                    'user_id' => $userId,
                    'badge_id' => $badge->id,
                    'earned_at' => now(),
                ]);
            }
        }
    }

    private function meritsBadge(int $userId, Badge $badge): bool
    {
        return match($badge->condition_type) {

            // Nombre total de quiz complétés
            'quiz_count' => Score::where('user_id', $userId)
                ->count() >= $badge->condition_value,

            // Nombre total de points accumulés
            'total_points' => Score::where('user_id', $userId)
                ->sum('points_earned') >= $badge->condition_value,

            // Accuracy moyenne >= valeur
            'accuracy' => Score::where('user_id', $userId)
                ->avg('accuracy') >= $badge->condition_value,

            // Perfect score (100% accuracy)
            'perfect_score' => Score::where('user_id', $userId)
                ->where('accuracy', 100)
                ->exists(),

            default => false,
        };
    }
}