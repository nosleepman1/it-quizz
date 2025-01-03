<?php

/**
 * Seeder des sous‑catégories.
 *
 * Insère les sous‑catégories de base avec leurs slugs, description, icône et statut actif.
 */

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubcategorySeeder extends Seeder
{
    public function run(): void
    {
        $subcategoriesMap = [
            'developpement-frontend' => [
                ['name' => 'Bases HTML & CSS modern', 'description' => 'Balises sémantiques, flexbox, grid, responsive design et Tailwind CSS', 'icon' => 'fa-solid fa-code'],
                ['name' => 'JavaScript Moderne (ES6+)', 'description' => 'Promesses, Asynchronisme, destructuration, modules et manipulations du DOM', 'icon' => 'fa-brands fa-js'],
                ['name' => 'Framework React', 'description' => 'Composants, hooks (useState, useEffect), cycle de vie et gestion d\'état avec Zustand/Redux', 'icon' => 'fa-brands fa-react'],
            ],
            'developpement-backend' => [
                ['name' => 'Node.js & Express', 'description' => 'Création de serveurs web, intergiciels (middlewares) et routage', 'icon' => 'fa-brands fa-node-js'],
                ['name' => 'Laravel Framework', 'description' => 'Architecture MVC, Eloquent ORM, routage, contrôleurs et migrations', 'icon' => 'fa-brands fa-laravel'],
            ],
            'api-rest-graphql' => [
                ['name' => 'Conception d\'API REST', 'description' => 'Codes de statut HTTP, méthodes (GET, POST...), conventions d\'URL et sécurité', 'icon' => 'fa-solid fa-route'],
                ['name' => 'GraphQL', 'description' => 'Requêtes, mutations, abonnements et définition de schémas', 'icon' => 'fa-solid fa-project-diagram'],
            ],
            'apprentissage-automatique' => [
                ['name' => 'Concepts Fondamentaux ML', 'description' => 'Apprentissage supervisé vs non-supervisé, surapprentissage (overfitting) et métriques d\'évaluation', 'icon' => 'fa-solid fa-calculator'],
            ],
            'ia-generative-llm' => [
                ['name' => 'Prompt Engineering', 'description' => 'Techniques de prompt (Few-shot, Chain-of-Thought), prompts système et contextes', 'icon' => 'fa-solid fa-terminal'],
            ],
            'securite-des-applications-web' => [
                ['name' => 'OWASP Top 10', 'description' => 'Injections SQL, Cross-Site Scripting (XSS), failles CSRF et mauvaise configuration de sécurité', 'icon' => 'fa-solid fa-bug'],
                ['name' => 'Authentification & Sessions', 'description' => 'Authentification par jetons JWT, cookies sécurisés, stockage local vs cookies et OAuth 2.0', 'icon' => 'fa-solid fa-lock'],
            ],
            'cryptographie' => [
                ['name' => 'Méthodes de Chiffrement', 'description' => 'Chiffrement symétrique (AES) vs asymétrique (RSA, ECC)', 'icon' => 'fa-solid fa-key'],
                ['name' => 'Hachage & Intégrité', 'description' => 'Fonctions de hachage (SHA-256, MD5), salage et algorithmes de hash de mots de passe (Bcrypt)', 'icon' => 'fa-solid fa-fingerprint'],
            ],
            'securite-reseau' => [
                ['name' => 'Pare-feux & Filtrage', 'description' => 'Règles de pare-feu, filtrage de ports et systèmes de détection d\'intrusion (Snort)', 'icon' => 'fa-solid fa-shield-halved'],
            ],
            'aws-amazon-web-services' => [
                ['name' => 'Services de Base AWS', 'description' => 'Instances de calcul EC2, stockage S3 et bases de données RDS', 'icon' => 'fa-brands fa-aws'],
            ],
            'architecture-cloud-serverless' => [
                ['name' => 'Serverless Computing', 'description' => 'Fonctions FaaS comme AWS Lambda et intégration avec API Gateway', 'icon' => 'fa-solid fa-bolt'],
            ],
            'conteneurisation-docker' => [
                ['name' => 'Dockerfiles & Images', 'description' => 'Création d\'images légères, multi-stage builds, calques (layers) et mise en cache', 'icon' => 'fa-solid fa-box-archive'],
                ['name' => 'Docker Compose', 'description' => 'Orchestration locale multi-conteneurs, liaisons réseau, volumes et variables d\'environnement', 'icon' => 'fa-solid fa-network-wired'],
            ],
            'integration-deploiement-continu' => [
                ['name' => 'GitHub Actions', 'description' => 'Création de workflows, jobs, étapes, triggers, secrets et utilisation de runners', 'icon' => 'fa-brands fa-github'],
            ],
            'infrastructure-as-code-iac' => [
                ['name' => 'Terraform', 'description' => 'Déclaration d\'infrastructures, fichiers de state, providers et modules', 'icon' => 'fa-solid fa-file-code'],
            ],
            'bases-de-donnees-relationnelles' => [
                ['name' => 'Langage SQL & Modélisation', 'description' => 'Requêtes de sélection, jointures, agrégations et formes normales de bases de données', 'icon' => 'fa-solid fa-database'],
                ['name' => 'Indexation & Transactions', 'description' => 'Propriétés ACID, gestion des verrous et accélération des requêtes via les index B-Tree', 'icon' => 'fa-solid fa-magnifying-glass-chart'],
            ],
            'bases-de-donnees-nosql' => [
                ['name' => 'MongoDB', 'description' => 'Modélisation orientée document, requêtes NoSQL et pipeline d\'agrégation', 'icon' => 'fa-solid fa-leaf'],
                ['name' => 'Redis', 'description' => 'Stockage en mémoire clé-valeur, types de données complexes et stratégies de cache', 'icon' => 'fa-solid fa-bolt-lightning'],
            ],
            'administration-linux' => [
                ['name' => 'Commandes & Fichiers', 'description' => 'Commandes de base (ls, cd, grep, find), droits utilisateur (chmod, chown) et redirections', 'icon' => 'fa-solid fa-terminal'],
            ],
            'systemes-windows-server' => [
                ['name' => 'Active Directory', 'description' => 'Gestion des domaines, utilisateurs, groupes, et stratégies de groupe (GPO)', 'icon' => 'fa-solid fa-users-gear'],
            ],
            'protocoles-routage' => [
                ['name' => 'Modèle OSI & TCP/IP', 'description' => 'Les 7 couches OSI, encapsulation des paquets, fonctionnement de TCP (Handshake) et UDP', 'icon' => 'fa-solid fa-circle-nodes'],
            ],
            'developpement-multiplateforme' => [
                ['name' => 'React Native', 'description' => 'Architecture de bridge, Expo vs Bare Workflow, composants de base et navigation', 'icon' => 'fa-brands fa-react'],
                ['name' => 'Flutter', 'description' => 'Langage Dart, architecture réactive, Widgets (Stateless vs Stateful) et gestion d\'état', 'icon' => 'fa-solid fa-feather-pointed'],
            ],
            'developpement-natif' => [
                ['name' => 'Android Natif (Kotlin)', 'description' => 'Activités, cycles de vie, intents et interface moderne avec Jetpack Compose', 'icon' => 'fa-brands fa-android'],
                ['name' => 'iOS Natif (Swift)', 'description' => 'SwiftUI, architectures MVC/MVVM et gestion de la mémoire (ARC)', 'icon' => 'fa-brands fa-app-store-ios'],
            ],
            'design-patterns-principes-solid' => [
                ['name' => 'Principes SOLID', 'description' => 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion', 'icon' => 'fa-solid fa-shield'],
                ['name' => 'Patrons de Conception GoF', 'description' => 'Patrons de création (Singleton, Factory), de structure (Adapter) et de comportement (Observer)', 'icon' => 'fa-solid fa-puzzle-piece'],
            ],
            'microservices-clean-architecture' => [
                ['name' => 'Clean Architecture', 'description' => 'Découpage en couches (Entités, Cas d\'utilisation, Présentation) et indépendance des frameworks', 'icon' => 'fa-solid fa-layer-group'],
            ],
        ];

        $subcategories = [];

        foreach ($subcategoriesMap as $catSlug => $subs) {
            $category = Category::where('slug', $catSlug)->first();
            if (!$category) {
                continue;
            }

            foreach ($subs as $sub) {
                $subcategories[] = [
                    'name' => $sub['name'],
                    'category_id' => $category->id,
                    'slug' => Str::slug($sub['name']),
                    'description' => $sub['description'],
                    'icon' => $sub['icon'],
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach (array_chunk($subcategories, 500) as $chunk) {
            Subcategory::insert($chunk);
        }
    }
}

