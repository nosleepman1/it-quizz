<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Faker\Factory as Faker;

class QuizDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('fr_FR'); // French locale matching the project's language

        // Configurations of data count
        $numThemes = 5;
        $totalCategories = 10;
        $numSubcategoriesPerCategory = 3;
        $numQuestionsPerSubcategory = 150;

        $categoriesPerTheme = (int) ceil($totalCategories / $numThemes);

        $this->command->info('Désactivation temporaire des contraintes de clés étrangères...');
        Schema::disableForeignKeyConstraints();

        $this->command->info('Nettoyage des tables de la base de données...');
        DB::table('choices')->truncate();
        DB::table('questions')->truncate();
        DB::table('topics')->truncate();
        DB::table('subcategories')->truncate();
        DB::table('categories')->truncate();
        DB::table('themes')->truncate();

        Schema::enableForeignKeyConstraints();
        $this->command->info('Nettoyage terminé.');

        DB::transaction(function () use ($faker, $numThemes, $categoriesPerTheme, $numSubcategoriesPerCategory, $numQuestionsPerSubcategory) {
            $this->command->info('Génération des thèmes...');
            $themeIds = [];
            for ($t = 1; $t <= $numThemes; $t++) {
                $themeIds[] = DB::table('themes')->insertGetId([
                    'name' => "Thème $t",
                    'slug' => "theme-$t",
                    'description' => "Description détaillée pour le Thème $t",
                    'icon' => "fa-solid fa-folder",
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $this->command->info('Génération des catégories...');
            $categoryIds = [];
            $categoryIndex = 1;
            foreach ($themeIds as $themeId) {
                for ($c = 1; $c <= $categoriesPerTheme; $c++) {
                    $categoryIds[] = DB::table('categories')->insertGetId([
                        'theme_id' => $themeId,
                        'name' => "Catégorie $categoryIndex",
                        'slug' => "categorie-$categoryIndex",
                        'description' => "Description pour la Catégorie $categoryIndex",
                        'icon' => "fa-solid fa-list",
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $categoryIndex++;
                }
            }

            $this->command->info('Génération des sous-catégories...');
            $subcategoryIds = [];
            $subCategoryIndex = 1;
            foreach ($categoryIds as $categoryId) {
                for ($s = 1; $s <= $numSubcategoriesPerCategory; $s++) {
                    $subcategoryIds[] = DB::table('subcategories')->insertGetId([
                        'category_id' => $categoryId,
                        'name' => "Sous-catégorie $subCategoryIndex",
                        'slug' => "sous-categorie-$subCategoryIndex",
                        'description' => "Description pour la Sous-catégorie $subCategoryIndex",
                        'icon' => "fa-solid fa-layer-group",
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $subCategoryIndex++;
                }
            }

            $this->command->info('Génération des sujets (topics)...');
            $topicIds = [];
            foreach ($subcategoryIds as $subcategoryId) {
                $topicIds[] = DB::table('topics')->insertGetId([
                    'subcategory_id' => $subcategoryId,
                    'name' => "Sujet de Sous-catégorie $subcategoryId",
                    'slug' => "sujet-de-sous-categorie-$subcategoryId",
                    'description' => "Description pour le sujet de la sous-catégorie $subcategoryId",
                    'icon' => "fa-solid fa-book",
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $this->command->info('Génération des questions et de leurs 4 choix (en cours)...');
            
            // Total: 30 sous-catégories * 150 questions = 4500 questions.
            // 4500 questions * 4 choix = 18000 choix.
            $totalQuestionsCount = count($topicIds) * $numQuestionsPerSubcategory;
            $progress = $this->command->getOutput()->createProgressBar($totalQuestionsCount);
            $progress->start();

            foreach ($topicIds as $topicId) {
                for ($q = 1; $q <= $numQuestionsPerSubcategory; $q++) {
                    $correctAnswer = "Réponse correcte : " . $faker->sentence(3);
                    
                    $questionId = DB::table('questions')->insertGetId([
                        'topic_id' => $topicId,
                        'question' => "Question $q pour le sujet ID $topicId : " . $faker->sentence(8) . " ?",
                        'answer' => $correctAnswer,
                        'difficulty' => $faker->randomElement(['facile', 'moyen', 'difficile']),
                        'type' => 'QCM',
                        'score' => $faker->numberBetween(1, 10),
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // Générer 4 choix dont 1 correct et 3 incorrects
                    $choices = [
                        [
                            'question_id' => $questionId,
                            'choice' => $correctAnswer,
                            'is_correct' => true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ],
                        [
                            'question_id' => $questionId,
                            'choice' => "Option incorrecte A : " . $faker->sentence(3),
                            'is_correct' => false,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ],
                        [
                            'question_id' => $questionId,
                            'choice' => "Option incorrecte B : " . $faker->sentence(3),
                            'is_correct' => false,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ],
                        [
                            'question_id' => $questionId,
                            'choice' => "Option incorrecte C : " . $faker->sentence(3),
                            'is_correct' => false,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ],
                    ];

                    // Mélanger l'ordre des choix pour que la réponse correcte ne soit pas toujours la première
                    shuffle($choices);

                    // Insertion bulk des choix pour cette question
                    DB::table('choices')->insert($choices);

                    $progress->advance();
                }
            }

            $progress->finish();
            $this->command->info("\nSeeding de la base de données terminé avec succès !");
        });
    }
}
