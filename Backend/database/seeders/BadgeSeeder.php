<?php
/**
 * Seeders de l'application IT‑Quiz.
 *
 * Chaque seeder insère les données de base nécessaires au bon fonctionnement
 * de l'API. Les commentaires en français décrivent brièvement le rôle de chaque
 * tableau et les champs insérés.
 */
namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            ['name' => 'Débutant', 'description' => 'Première réussite', 'icon' => 'fa-solid fa-star', 'condition_type' => 'questions_answered', 'condition_value' => 10],
            ['name' => 'Curieux', 'description' => '30 questions répondues', 'icon' => 'fa-solid fa-search', 'condition_type' => 'questions_answered', 'condition_value' => 30],
            ['name' => 'Expert', 'description' => '100 questions répondues', 'icon' => 'fa-solid fa-award', 'condition_type' => 'questions_answered', 'condition_value' => 100],
            ['name' => 'Vitesse', 'description' => 'Répond en moins de 30s', 'icon' => 'fa-solid fa-bolt', 'condition_type' => 'fast_answers', 'condition_value' => 30],
            ['name' => 'Perfectionniste', 'description' => 'Score 100% sur un quiz', 'icon' => 'fa-solid fa-check', 'condition_type' => 'perfect_score', 'condition_value' => 1],
            ['name' => 'Collectionneur', 'description' => 'Toutes les catégories débloquées', 'icon' => 'fa-solid fa-collection', 'condition_type' => 'categories_unlocked', 'condition_value' => 5],
            ['name' => 'Leader', 'description' => 'Top du tableau', 'icon' => 'fa-solid fa-crown', 'condition_type' => 'leaderboard_position', 'condition_value' => 1],
            ['name' => 'Marathonien', 'description' => '50 Quiz complétés', 'icon' => 'fa-solid fa-running', 'condition_type' => 'quizzes_completed', 'condition_value' => 50],
            ['name' => 'Stratège', 'description' => 'Utilise 10 stratégies', 'icon' => 'fa-solid fa-chess', 'condition_type' => 'strategies_used', 'condition_value' => 10],
            ['name' => 'Polyglotte', 'description' => 'Répond dans 3 langues', 'icon' => 'fa-solid fa-language', 'condition_type' => 'languages_used', 'condition_value' => 3],
            ['name' => 'Contributeur', 'description' => 'Propose une question', 'icon' => 'fa-solid fa-lightbulb', 'condition_type' => 'questions_contributed', 'condition_value' => 1],
            ['name' => 'Sage', 'description' => 'Moyenne de difficulté >= 4', 'icon' => 'fa-solid fa-wand-magic', 'condition_type' => 'average_difficulty', 'condition_value' => 4],
            ['name' => 'Invincible', 'description' => 'Pas d’erreur pendant 7 jours', 'icon' => 'fa-solid fa-shield', 'condition_type' => 'error_free_days', 'condition_value' => 7],
            ['name' => 'Explorer', 'description' => 'Visite toutes les sous-catégories', 'icon' => 'fa-solid fa-compass', 'condition_type' => 'subcategories_visited', 'condition_value' => 7],
            ['name' => 'Champion', 'description' => 'Gagne un tournoi', 'icon' => 'fa-solid fa-trophy', 'condition_type' => 'tournament_wins', 'condition_value' => 1],
            ['name' => 'Altruiste', 'description' => 'Aide 5 utilisateurs', 'icon' => 'fa-solid fa-hands-helping', 'condition_type' => 'users_helped', 'condition_value' => 5],
            ['name' => 'Mécène', 'description' => 'Achete un badge premium', 'icon' => 'fa-solid fa-gem', 'condition_type' => 'premium_badge_purchased', 'condition_value' => 1],
            ['name' => 'Visionnaire', 'description' => 'Prévoit la prochaine question', 'icon' => 'fa-solid fa-eye', 'condition_type' => 'predictions_made', 'condition_value' => 20],
            ['name' => 'Legende', 'description' => 'Atteint 1000 points', 'icon' => 'fa-solid fa-star-of-david', 'condition_type' => 'total_points', 'condition_value' => 1000],
        ];

        foreach ($badges as $badge) {
            Badge::create($badge);
        }
    }
}
