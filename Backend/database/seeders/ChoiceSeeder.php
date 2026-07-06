<?php

namespace Database\Seeders;

use App\Models\Choice;
use App\Models\Question;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChoiceSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     * For each question, generate 4 choices (first is the correct answer).
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        Question::select('id', 'answer')->chunk(1000, function ($questions) use ($faker) {
            $choices = [];

            foreach ($questions as $question) {
                // Correct choice
                $choices[] = [
                    'question_id' => $question->id,
                    'choice' => $question->answer,
                    'is_correct' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // Three incorrect choices
                for ($i = 0; $i < 3; $i++) {
                    $choices[] = [
                        'question_id' => $question->id,
                        'choice' => 'Fausse réponse ' . ($i + 1) . ' : ' . $faker->sentence(3),
                        'is_correct' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            foreach (array_chunk($choices, 1000) as $chunk) {
                Choice::insert($chunk);
            }
        });
    }
}
