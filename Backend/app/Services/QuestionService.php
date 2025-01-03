<?php

namespace App\Services;

use App\Models\Topic;
use App\Models\Question;
use App\Models\Choice;
use Illuminate\Support\Facades\Http;

class QuestionService
{
    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key');
    }

    public function generate(int $topicId, string $difficulty = 'medium', int $count = 10): void
    {
        $topic = Topic::findOrFail($topicId);

        $prompt = "Genere {$count} questions QCM sur le topic '{$topic->name}' 
        de niveau {$difficulty} en JSON avec ce format exactement:
        [
            {
                'question': 'La question ici',
                'explanation': 'Explication de la reponse',
                'choices': [
                    {'choice': 'Reponse A', 'is_correct': false},
                    {'choice': 'Reponse B', 'is_correct': true},
                    {'choice': 'Reponse C', 'is_correct': false},
                    {'choice': 'Reponse D', 'is_correct': false}
                ]
            }
        ]
        Reponds UNIQUEMENT avec le JSON, rien d'autre.";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type'  => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model'    => 'gpt-4',
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.7,
        ]);

        $content = $response->json('choices.0.message.content');
        $questions = json_decode($content, true);

        // Sauvegarder en base
        $this->saveQuestions($topicId, $questions, $difficulty);
    }

    private function saveQuestions(int $topicId, array $questions, string $difficulty): void
    {
        foreach ($questions as $q) {
            $question = Question::create([
                'topic_id'    => $topicId,
                'question'    => $q['question'],
                'explanation' => $q['explanation'],
                'difficulty'  => $difficulty,
                'type'        => 'qcm',
                'points'      => match($difficulty) {
                    'easy'   => 10,
                    'medium' => 15,
                    'hard'   => 20,
                },
                'is_active'   => true,
            ]);

            // Sauvegarder les choix
            foreach ($q['choices'] as $choice) {
                Choice::create([
                    'question_id' => $question->id,
                    'choice'      => $choice['choice'],
                    'is_correct'  => $choice['is_correct'],
                ]);
            }
        }
    }
}
