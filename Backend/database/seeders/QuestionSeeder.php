<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Subcategory;
use App\Models\Topic;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     * Generates 140 questions per subcategory, each linked to a random topic.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $topics = Topic::all();
        $questions = [];

        foreach ($topics as $topic) {
            for ($i = 1; $i <= 10; $i++) {
                $questions[] = [
                    'topic_id' => $topic->id,
                    'question' => 'Question ' . $i . ' sur ' . $topic->name . ' : ' . $faker->sentence(6),
                    'answer' => 'Réponse pour la question ' . $i,
                    'difficulty' => $faker->randomElement(['facile', 'moyen', 'difficile']),
                    'type' => 'QCM',
                    'score' => $faker->numberBetween(1, 10),
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach (array_chunk($questions, 1000) as $chunk) {
            Question::insert($chunk);
        }
    }
}
