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
        foreach (Subcategory::all() as $subcategory) {
            $topics = $subcategory->topics;
            if ($topics->isEmpty()) {
                continue;
            }
            // pick a random topic from the subcategory for each question
            for ($i = 1; $i <= 140; $i++) {
                $topic = $topics->random();

                // Génère une question générique (texte aléatoire)
                $questionText = $faker->sentence(8);
                $answerText   = $faker->sentence(5);

                // Détermine la difficulté en fonction du sous‑groupe (conceptuel)
                $subName = strtolower($subcategory->name);
                if (in_array($subName, ['html', 'css'])) {
                    $difficulty = 'facile'; // notions de base
                } elseif (in_array($subName, ['javascript', 'laravel'])) {
                    $difficulty = 'moyen'; // niveau intermédiaire
                } else {
                    $difficulty = 'difficile'; // sujets avancés
                }

                Question::create([
                    'topic_id'   => $topic->id,
                    'question'   => $questionText,
                    'answer'     => $answerText,
                    'difficulty' => $difficulty,
                    'type'       => 'QCM',
                    'score'      => $faker->numberBetween(1, 10),
                    'is_active'  => true,
                ]);
            }
        }
    }
}
