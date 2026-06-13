<?php

/**
 * Seeder des sous‑catégories.
 *
 * Insère les sous‑catégories de base avec leurs slugs, description, icône et statut actif.
 */

namespace Database\Seeders;

use App\Models\Subcategory;
use Illuminate\Database\Seeder;

class SubcategorySeeder extends Seeder
{
    public function run(): void
    {
        Subcategory::insert([
            ['name' => 'HTML', 'category_id' => 1, 'slug' => 'html', 'description' => 'Markup language', 'icon' => 'fa-brands fa-html5', 'is_active' => true],
            ['name' => 'CSS', 'category_id' => 1, 'slug' => 'css', 'description' => 'Styling language', 'icon' => 'fa-brands fa-css3', 'is_active' => true],
            ['name' => 'JavaScript', 'category_id' => 2, 'slug' => 'javascript', 'description' => 'Scripting language', 'icon' => 'fa-brands fa-js', 'is_active' => true],
            ['name' => 'Laravel', 'category_id' => 2, 'slug' => 'laravel', 'description' => 'PHP framework', 'icon' => 'fa-solid fa-leaf', 'is_active' => true],
            ['name' => 'Docker', 'category_id' => 3, 'slug' => 'docker', 'description' => 'Containerisation', 'icon' => 'fa-brands fa-docker', 'is_active' => true],
            ['name' => 'Kubernetes', 'category_id' => 4, 'slug' => 'kubernetes', 'description' => 'Orchestration', 'icon' => 'fa-solid fa-cubes', 'is_active' => true],
            ['name' => 'Machine Learning', 'category_id' => 5, 'slug' => 'machine-learning', 'description' => 'AI models', 'icon' => 'fa-solid fa-brain', 'is_active' => true],
        ]);
    }
}
