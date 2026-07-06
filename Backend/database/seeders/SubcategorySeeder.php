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
        $categories = \App\Models\Category::all();
        $subcategories = [];

        foreach ($categories as $category) {
            for ($i = 1; $i <= 5; $i++) {
                $subcategories[] = [
                    'name' => 'Sous-catégorie ' . $i . ' de ' . $category->name,
                    'category_id' => $category->id,
                    'slug' => \Illuminate\Support\Str::slug($category->name . '-subcat-' . $i),
                    'description' => 'Description pour la sous-catégorie ' . $i,
                    'icon' => 'fa-solid fa-layer-group',
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insert in chunks to avoid memory issues if data grows
        foreach (array_chunk($subcategories, 500) as $chunk) {
            \App\Models\Subcategory::insert($chunk);
        }
    }
}
