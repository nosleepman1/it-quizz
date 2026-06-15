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
        \App\Models\Theme::insert([
            ['name' => 'Développement Web', 'slug' => 'dev-web', 'description' => 'Thèmes autour du développement web', 'icon' => 'fa-solid fa-code', 'is_active' => true],
            ['name' => 'Intelligence Artificielle', 'slug' => 'ia', 'description' => 'IA, machine learning, data', 'icon' => 'fa-solid fa-robot', 'is_active' => true],
            ['name' => 'Cybersécurité', 'slug' => 'cybersecurite', 'description' => 'Sécurité des systèmes', 'icon' => 'fa-solid fa-shield-alt', 'is_active' => true],
            ['name' => 'Cloud Computing', 'slug' => 'cloud', 'description' => 'Services cloud et infra', 'icon' => 'fa-solid fa-cloud', 'is_active' => true],
        ]);
    }
}
