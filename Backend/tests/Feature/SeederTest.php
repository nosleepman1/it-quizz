<?php

namespace Tests\Feature;

use App\Models\Theme;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Topic;
use App\Models\Question;
use App\Models\Choice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeederTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that seeders successfully run and populate the database with correct IT structures.
     */
    public function test_seeders_populate_database_successfully(): void
    {
        // Execute the seeders
        $this->seed();

        // 1. Assert basic tables count
        $this->assertDatabaseCount('themes', 10);
        $this->assertGreaterThan(0, Category::count());
        $this->assertGreaterThan(0, Subcategory::count());
        $this->assertGreaterThan(0, Topic::count());
        $this->assertGreaterThan(0, Question::count());
        $this->assertGreaterThan(0, Choice::count());

        // 2. Assert specific themes and slugs exist
        $this->assertDatabaseHas('themes', ['slug' => 'dev-web']);
        $this->assertDatabaseHas('themes', ['slug' => 'cybersecurite']);
        $this->assertDatabaseHas('themes', ['slug' => 'devops']);

        // 3. Assert structured categories exist
        $this->assertDatabaseHas('categories', ['slug' => 'developpement-frontend']);
        $this->assertDatabaseHas('categories', ['slug' => 'securite-des-applications-web']);
        $this->assertDatabaseHas('categories', ['slug' => 'conteneurisation-docker']);

        // 4. Assert structured subcategories exist
        $this->assertDatabaseHas('subcategories', ['slug' => 'framework-react']);
        $this->assertDatabaseHas('subcategories', ['slug' => 'laravel-framework']);

        // 5. Assert specific pre-defined questions exist
        $this->assertDatabaseHas('questions', [
            'question' => 'Quelle balise HTML5 est la plus appropriée pour contenir les liens de navigation principaux ?',
            'answer' => '<nav>',
            'difficulty' => 'facile',
        ]);

        $this->assertDatabaseHas('questions', [
            'question' => 'Quel hook React permet de stocker une valeur mutable qui ne déclenche pas de re-render lors de sa modification ?',
            'answer' => 'useRef',
            'difficulty' => 'moyen',
        ]);

        // 6. Assert choice distributions are correct for questions (1 correct, 3 incorrect, total 4)
        $questions = Question::with('choices')->take(10)->get();
        foreach ($questions as $question) {
            $this->assertCount(4, $question->choices, "La question '{$question->question}' devrait avoir exactement 4 choix.");
            
            $correctChoices = $question->choices->filter(fn($choice) => $choice->is_correct);
            $this->assertCount(1, $correctChoices, "La question '{$question->question}' devrait avoir exactement 1 choix correct.");
            
            $incorrectChoices = $question->choices->filter(fn($choice) => !$choice->is_correct);
            $this->assertCount(3, $incorrectChoices, "La question '{$question->question}' devrait avoir exactement 3 choix incorrects.");
        }
    }
}
