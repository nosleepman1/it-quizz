<?php

/**
 * Seeder des catégories.
 *
 * Insère les catégories de base avec leurs slugs, description, icône et statut actif.
 */

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $themes = \App\Models\Theme::all();
        $categories = [
            
        ];

        foreach ($themes as $theme) {
            for ($i = 1; $i <= 5; $i++) {
                $categories[] = [
                    'name' => 'Catégorie ' . $i . ' - ' . $theme->name,
                    'theme_id' => $theme->id,
                    'slug' => \Illuminate\Support\Str::slug($theme->name . '-categorie-' . $i),
                    'description' => 'Description pour la catégorie ' . $i . ' du thème ' . $theme->name,
                    'icon' => 'fa-solid fa-folder',
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        \App\Models\Category::insert($categories);
    }
}
