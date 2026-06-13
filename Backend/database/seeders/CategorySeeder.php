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
        Category::insert([
            [
                'name' => 'Développement Web',
                'theme_id' => 1,
                'slug' => 'dev-web',
                'description' => 'Tout sur le développement front et back',
                'icon' => 'fa-solid fa-code',
                'is_active' => true,
            ],
            [
                'name' => 'Intelligence Artificielle',
                'theme_id' => 2,
                'slug' => 'ia',
                'description' => 'Machine learning, deep learning, data science',
                'icon' => 'fa-solid fa-robot',
                'is_active' => true,
            ],
            [
                'name' => 'Cybersécurité',
                'theme_id' => 3,
                'slug' => 'cybersecurite',
                'description' => 'Sécurité des systèmes et réseaux',
                'icon' => 'fa-solid fa-shield-alt',
                'is_active' => true,
            ],
            [
                'name' => 'Cloud Computing',
                'theme_id' => 4,
                'slug' => 'cloud',
                'description' => 'Infrastructure, services et déploiement cloud',
                'icon' => 'fa-solid fa-cloud',
                'is_active' => true,
            ],
            [
                'name' => 'DevOps',
                'theme_id' => 1,
                'slug' => 'devops',
                'description' => 'Intégration continue, déploiement et automatisation',
                'icon' => 'fa-solid fa-gears',
                'is_active' => true,
            ],
        ]);
    }
}
