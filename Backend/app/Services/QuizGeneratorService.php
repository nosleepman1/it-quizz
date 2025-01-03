<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\User;
use Exception;

class QuizGeneratorService
{
    /**
     * Mode 1 : Quiz Rapide par Thème (20 questions aléatoires)
     */
    public function generateQuick(User $user, int $themeId, int $numberOfQuestion = 20): Quiz
    {
        $questions = Question::whereHas('topic.subcategory.category.theme', function ($q) use ($themeId) {
            $q->where('id', $themeId);
        })
        ->where('is_active', true)
        ->inRandomOrder()
        ->take($numberOfQuestion)
        ->with(['choices', 'topic'])
        ->get();

        if ($questions->isEmpty()) {
            throw new Exception("Aucune question active trouvée pour ce thème.");
        }

        $quiz = Quiz::create([
            'user_id' => $user->id,
            'theme_id' => $themeId,
            'topic_id' => $questions->first()->topic_id ?? null,
            'difficulty' => $questions->first()->difficulty ?? 'facile',
            'status' => 'inachevé',
            'total_questions' => $questions->count(),
            'total_correct_answers' => 0,
        ]);

        $quiz->questions()->attach($questions->pluck('id'));
        $quiz->load('questions.choices');

        return $quiz;
    }

    /**
     * Mode 2 : Quiz Personnalisé (Sélection Thème -> Catégorie -> Sous-catégorie -> Topic)
     */
    public function generateCustom(User $user, array $filters, int $numberOfQuestion = 10): Quiz
    {
        $query = Question::query()->where('is_active', true);

        if (!empty($filters['topic_id'])) {
            $query->where('topic_id', $filters['topic_id']);
        } elseif (!empty($filters['subcategory_id'])) {
            $query->whereHas('topic', function ($q) use ($filters) {
                $q->where('subcategory_id', $filters['subcategory_id']);
            });
        } elseif (!empty($filters['category_id'])) {
            $query->whereHas('topic.subcategory', function ($q) use ($filters) {
                $q->where('category_id', $filters['category_id']);
            });
        } elseif (!empty($filters['theme_id'])) {
            $query->whereHas('topic.subcategory.category', function ($q) use ($filters) {
                $q->where('theme_id', $filters['theme_id']);
            });
        }

        $questions = $query->inRandomOrder()
            ->take($numberOfQuestion)
            ->with(['choices', 'topic'])
            ->get();

        if ($questions->isEmpty()) {
            throw new Exception("Aucune question trouvée pour la sélection effectuée.");
        }

        $quiz = Quiz::create([
            'user_id' => $user->id,
            'theme_id' => $filters['theme_id'] ?? null,
            'topic_id' => $filters['topic_id'] ?? ($questions->first()->topic_id ?? null),
            'difficulty' => $questions->first()->difficulty ?? 'facile',
            'status' => 'inachevé',
            'total_questions' => $questions->count(),
            'total_correct_answers' => 0,
        ]);

        $quiz->questions()->attach($questions->pluck('id'));
        $quiz->load('questions.choices');

        return $quiz;
    }
}
