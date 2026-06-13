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
        foreach (Question::all() as $question) {
            // Correct choice based on the question's answer field
            Choice::create([
                'question_id' => $question->id,
                'choice'      => $question->answer,
                'is_correct'  => true,
            ]);
            // Three incorrect choices
            for ($i = 0; $i < 3; $i++) {
                Choice::create([
                    'question_id' => $question->id,
                    'choice'      => $faker->sentence(5),
                    'is_correct'  => false,
                ]);
            }
        }
    }
}
