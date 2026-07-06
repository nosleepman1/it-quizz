<?php

/**
 * Seeder des thèmes.
 *
 * Insère les thèmes de base avec leurs slugs, description, icône et statut actif.
 */

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $themes = [
            ['name' => 'Développement Web', 'slug' => 'dev-web', 'description' => 'Thèmes autour du développement web', 'icon' => 'fa-solid fa-code', 'is_active' => true],
            ['name' => 'Intelligence Artificielle', 'slug' => 'ia', 'description' => 'IA, machine learning, data', 'icon' => 'fa-solid fa-robot', 'is_active' => true],
            ['name' => 'Cybersécurité', 'slug' => 'cybersecurite', 'description' => 'Sécurité des systèmes et réseaux', 'icon' => 'fa-solid fa-shield-alt', 'is_active' => true],
            ['name' => 'Cloud Computing', 'slug' => 'cloud', 'description' => 'Services cloud et infrastructure', 'icon' => 'fa-solid fa-cloud', 'is_active' => true],
            ['name' => 'DevOps', 'slug' => 'devops', 'description' => 'Intégration et déploiement continu', 'icon' => 'fa-solid fa-gears', 'is_active' => true],
            ['name' => 'Bases de données', 'slug' => 'bases-de-donnees', 'description' => 'SQL, NoSQL et administration', 'icon' => 'fa-solid fa-database', 'is_active' => true],
            ['name' => 'Systèmes d\'exploitation', 'slug' => 'os', 'description' => 'Linux, Windows, macOS', 'icon' => 'fa-brands fa-linux', 'is_active' => true],
            ['name' => 'Réseaux et Télécoms', 'slug' => 'reseaux', 'description' => 'Architecture réseau et protocoles', 'icon' => 'fa-solid fa-network-wired', 'is_active' => true],
            ['name' => 'Développement Mobile', 'slug' => 'mobile', 'description' => 'iOS, Android, Cross-platform', 'icon' => 'fa-solid fa-mobile-screen', 'is_active' => true],
            ['name' => 'Architecture Logicielle', 'slug' => 'architecture', 'description' => 'Design patterns et microservices', 'icon' => 'fa-solid fa-sitemap', 'is_active' => true],
        ];

        \App\Models\Theme::insert($themes);
    }
}
