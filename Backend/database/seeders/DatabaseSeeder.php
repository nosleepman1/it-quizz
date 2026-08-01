<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\Choice;
use App\Models\Question;
use App\Models\Subcategory;
use App\Models\Topic;
use App\Models\User;
use App\Models\Theme;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User
        // User::factory()->create([
        //     'username' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Core seeders
        $this->call([
            UserSeeder::class,
            QuizDataSeeder::class,
            BadgeSeeder::class,
        ]);
    }
}
