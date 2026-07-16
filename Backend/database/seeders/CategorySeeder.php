<?php

/**
 * Seeder des catégories.
 *
 * Insère les catégories de base avec leurs slugs, description, icône et statut actif.
 */

namespace Database\Seeders;

use App\Models\Theme;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categoriesMap = [
            'dev-web' => [
                ['name' => 'Développement Frontend', 'description' => 'Interface utilisateur, HTML, CSS, JavaScript et frameworks modernres (React, Vue)', 'icon' => 'fa-solid fa-desktop'],
                ['name' => 'Développement Backend', 'description' => 'Logique serveur, API, PHP, Node.js et frameworks backend (Laravel, Express)', 'icon' => 'fa-solid fa-server'],
                ['name' => 'API REST & Graphql', 'description' => 'Protocoles d\'échange, format JSON, sécurité des points de terminaison', 'icon' => 'fa-solid fa-route'],
            ],
            'ia' => [
                ['name' => 'Apprentissage Automatique', 'description' => 'Machine Learning, modèles de régression, classification et algorithmes de base', 'icon' => 'fa-solid fa-brain'],
                ['name' => 'IA Générative & LLM', 'description' => 'Large Language Models, ingénierie de prompt, Transformers et API OpenAI/Gemini', 'icon' => 'fa-solid fa-wand-magic-sparkles'],
            ],
            'cybersecurite' => [
                ['name' => 'Sécurité des Applications Web', 'description' => 'Vulnérabilités courantes du top 10 OWASP, failles XSS, injections SQL et CSRF', 'icon' => 'fa-solid fa-user-shield'],
                ['name' => 'Cryptographie', 'description' => 'Chiffrement symétrique, asymétrique, fonctions de hachage et signatures numériques', 'icon' => 'fa-solid fa-key'],
                ['name' => 'Sécurité Réseau', 'description' => 'Pare-feux, VPNs, détection d\'intrusions (IDS/IPS) et protocoles sécurisés', 'icon' => 'fa-solid fa-shield-halved'],
            ],
            'cloud' => [
                ['name' => 'AWS (Amazon Web Services)', 'description' => 'Services EC2, S3, RDS, Lambda et IAM du leader du cloud computing', 'icon' => 'fa-brands fa-aws'],
                ['name' => 'Architecture Cloud & Serverless', 'description' => 'Conception d\'architectures scalables, haute disponibilité et fonctions serverless', 'icon' => 'fa-solid fa-cloud-arrow-up'],
            ],
            'devops' => [
                ['name' => 'Conteneurisation (Docker)', 'description' => 'Création d\'images, gestion des conteneurs, volumes, réseaux et Docker Compose', 'icon' => 'fa-brands fa-docker'],
                ['name' => 'Intégration & Déploiement Continu', 'description' => 'Pipelines CI/CD avec GitHub Actions, GitLab CI, automatisation des builds', 'icon' => 'fa-solid fa-infinity'],
                ['name' => 'Infrastructure as Code (IaC)', 'description' => 'Gestion d\'infrastructure avec Terraform, Ansible et scripts de déploiement', 'icon' => 'fa-solid fa-laptop-code'],
            ],
            'bases-de-donnees' => [
                ['name' => 'Bases de Données Relationnelles', 'description' => 'SQL, modélisation de schémas, jointures complexes et intégrité référentielle', 'icon' => 'fa-solid fa-table'],
                ['name' => 'Bases de Données NoSQL', 'description' => 'MongoDB, Redis, stockage clé-valeur, documents et scalabilité horizontale', 'icon' => 'fa-solid fa-cubes'],
            ],
            'os' => [
                ['name' => 'Administration Linux', 'description' => 'Ligne de commande, droits d\'accès, gestion des processus et scripting Bash', 'icon' => 'fa-brands fa-linux'],
                ['name' => 'Systèmes Windows Server', 'description' => 'Active Directory, rôles de serveurs, PowerShell et administration système', 'icon' => 'fa-brands fa-windows'],
            ],
            'reseaux' => [
                ['name' => 'Protocoles & Routage', 'description' => 'Modèle OSI, TCP/IP, routage IP, commutation, DNS, DHCP', 'icon' => 'fa-solid fa-route'],
            ],
            'mobile' => [
                ['name' => 'Développement Multiplateforme', 'description' => 'Création d\'applications mobiles avec React Native et Flutter', 'icon' => 'fa-solid fa-mobile-retro'],
                ['name' => 'Développement Natif', 'description' => 'Android avec Kotlin, iOS avec Swift et outils natifs respectifs', 'icon' => 'fa-solid fa-mobile'],
            ],
            'architecture' => [
                ['name' => 'Design Patterns & Principes SOLID', 'description' => 'Patrons de conception classiques (Singleton, Factory, Observer) et principes SOLID', 'icon' => 'fa-solid fa-sitemap'],
                ['name' => 'Microservices & Clean Architecture', 'description' => 'Conception d\'applications distribuées et découplage avec la Clean Architecture', 'icon' => 'fa-solid fa-network-wired'],
            ],
        ];

        $categories = [];

        foreach ($categoriesMap as $themeSlug => $cats) {
            $theme = Theme::where('slug', $themeSlug)->first();
            if (!$theme) {
                continue;
            }

            foreach ($cats as $cat) {
                $categories[] = [
                    'name' => $cat['name'],
                    'theme_id' => $theme->id,
                    'slug' => Str::slug($cat['name']),
                    'description' => $cat['description'],
                    'icon' => $cat['icon'],
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        Category::insert($categories);
    }
}

