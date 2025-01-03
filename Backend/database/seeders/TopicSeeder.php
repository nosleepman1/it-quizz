<?php

namespace Database\Seeders;

use App\Models\Subcategory;
use App\Models\Topic;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TopicSeeder extends Seeder
{
    public function run(): void
    {
        $topicsMap = [
            'bases-html-css-modern' => [
                ['name' => 'Balises Sémantiques HTML5', 'description' => 'Structurez vos pages pour le SEO et l\'accessibilité avec article, section, nav...'],
                ['name' => 'CSS Grid & Flexbox', 'description' => 'Mises en page modernes réactives avec Flexbox et Grid Layout'],
                ['name' => 'Tailwind CSS', 'description' => 'Intégration rapide de designs grâce aux classes utilitaires de Tailwind CSS'],
            ],
            'javascript-moderne-es6' => [
                ['name' => 'Promesses & Asynchronisme', 'description' => 'Gestion de l\'asynchronisme avec les Promesses, async/await, Fetch et Axios'],
                ['name' => 'Fonctionnalités ES6+', 'description' => 'Destructuration, spread/rest operator, arrow functions et modules'],
            ],
            'framework-react' => [
                ['name' => 'React Hooks', 'description' => 'Hooks d\'état et d\'effets standard (useState, useEffect, useContext, useRef, useMemo)'],
                ['name' => 'Gestion d\'État Global', 'description' => 'Gestion du state avec Zustand, Redux Toolkit et l\'API Context de React'],
            ],
            'node-js-express' => [
                ['name' => 'Routage & Middlewares Express', 'description' => 'Création de routes, gestion des requêtes et écriture de middlewares personnalisés'],
            ],
            'laravel-framework' => [
                ['name' => 'Laravel Eloquent ORM', 'description' => 'Relations Eloquent, scopes, chargement hâtif (eager loading) et accesseurs/mutateurs'],
                ['name' => 'Routage & Middleware Laravel', 'description' => 'Routes paramétrées, groupes de routes et contrôle d\'accès par middleware'],
            ],
            'conception-dapi-rest' => [
                ['name' => 'Conventions REST & Statuts HTTP', 'description' => 'Utilisation correcte des verbes HTTP (GET, POST, PUT, DELETE) et des codes de statut (200, 201, 400, 401, 403, 404, 500)'],
            ],
            'graphql' => [
                ['name' => 'GraphQL Queries & Mutations', 'description' => 'Définir des schémas, écrire des requêtes précises et modifier des données avec des mutations'],
            ],
            'concepts-fondamentaux-ml' => [
                ['name' => 'Algorithmes de Classification & Régression', 'description' => 'Modèles de régression linéaire/logistique, arbres de décision et métriques (F1-score, Precision)'],
            ],
            'prompt-engineering' => [
                ['name' => 'Techniques de Prompt Avancées', 'description' => 'Few-shot prompting, Chain of Thought, prompts de rôle et techniques de cadrage des réponses'],
            ],
            'owasp-top-10' => [
                ['name' => 'Injections SQL & XSS', 'description' => 'Comprendre et prévenir les injections SQL et les failles de Cross-Site Scripting (XSS)'],
                ['name' => 'CSRF & Authentification défaillante', 'description' => 'Comprendre le Cross-Site Request Forgery et sécuriser l\'identification des utilisateurs'],
            ],
            'authentification-sessions' => [
                ['name' => 'Jetons JWT (JSON Web Tokens)', 'description' => 'Génération, signature, validation et stockage sécurisé des jetons JWT'],
            ],
            'methodes-de-chiffrement' => [
                ['name' => 'Chiffrement Symétrique & Asymétrique', 'description' => 'Différences et usages de AES (symétrique) et RSA/ECC (asymétrique)'],
            ],
            'hachage-integrite' => [
                ['name' => 'Algorithmes de Hachage & Bcrypt', 'description' => 'Sécuriser le stockage des mots de passe avec Bcrypt, Argon2 et comprendre le salage'],
            ],
            'pare-feux-filtrage' => [
                ['name' => 'Filtrage Réseau & IPtables', 'description' => 'Configuration des pare-feux, ouverture de ports et blocage d\'adresses'],
            ],
            'services-de-base-aws' => [
                ['name' => 'AWS EC2 & S3', 'description' => 'Déploiement de serveurs virtuels EC2 et stockage d\'objets avec S3'],
            ],
            'serverless-computing' => [
                ['name' => 'AWS Lambda & Serverless', 'description' => 'Concevoir des fonctions serverless déclenchées par des événements et reliées à l\'API Gateway'],
            ],
            'dockerfiles-images' => [
                ['name' => 'Optimisation d\'images Docker', 'description' => 'Créer des Dockerfiles légers grâce aux builds multi-étapes et à la gestion du cache'],
            ],
            'docker-compose' => [
                ['name' => 'Orchestrer avec Docker Compose', 'description' => 'Gestion de services multiples (App, Database, Cache), partage de réseaux et volumes de persistance'],
            ],
            'github-actions' => [
                ['name' => 'Création de pipelines CI/CD', 'description' => 'Écriture de workflows YAML, jobs parallèles, intégration des secrets et exécution des tests unitaires'],
            ],
            'terraform' => [
                ['name' => 'Terraform Basics & State', 'description' => 'Déclarer des ressources cloud et comprendre le rôle critique du fichier terraform.tfstate'],
            ],
            'langage-sql-modelisation' => [
                ['name' => 'Jointures SQL & Clés', 'description' => 'INNER, LEFT, RIGHT JOIN, clés primaires/étrangères et intégrité référentielle'],
            ],
            'indexation-transactions' => [
                ['name' => 'Transactions ACID & Indexation', 'description' => 'Atomicity, Consistency, Isolation, Durability et amélioration des performances avec les index'],
            ],
            'mongodb' => [
                ['name' => 'Requêtes MongoDB & Agrégation', 'description' => 'Filtrage de documents et utilisation du pipeline d\'agrégation pour manipuler les collections NoSQL'],
            ],
            'redis' => [
                ['name' => 'Caching & Redis Structures', 'description' => 'Mettre en place du cache applicatif avec les types String, Hash, List et Sets de Redis'],
            ],
            'commandes-fichiers' => [
                ['name' => 'Système de fichiers & Grep', 'description' => 'Manipuler les dossiers, chercher du texte avec grep/find et configurer les droits chmod'],
            ],
            'active-directory' => [
                ['name' => 'Objets AD & Stratégies GPO', 'description' => 'Gestion des unités d\'organisation et déploiement de règles système centralisées'],
            ],
            'modele-osi-tcpip' => [
                ['name' => 'Modèle OSI & TCP/UDP', 'description' => 'Les 7 couches, les différences entre le protocole connecté TCP (handshake) et le protocole non-connecté UDP'],
            ],
            'react-native' => [
                ['name' => 'Composants & Layouts React Native', 'description' => 'Utiliser View, Text, ScrollView, FlatList et styliser avec StyleSheet (flexbox)'],
            ],
            'flutter' => [
                ['name' => 'Widgets Flutter & Dart', 'description' => 'Comprendre le fonctionnement des widgets sans état (Stateless) et avec état (Stateful) et le cycle de rendu'],
            ],
            'android-natif-kotlin' => [
                ['name' => 'Activités & Cycle de vie Android', 'description' => 'Gérer les états d\'une activité (onCreate, onStart, onResume...) et la persistance temporaire'],
            ],
            'ios-natif-swift' => [
                ['name' => 'Rendu réactif avec SwiftUI', 'description' => 'Création d\'interfaces déclaratives avec SwiftUI et gestion d\'état avec @State, @Binding et @ObservedObject'],
            ],
            'principes-solid' => [
                ['name' => 'Principes SOLID', 'description' => 'Maîtriser les 5 principes SOLID pour concevoir du code extensible et maintenable'],
            ],
            'patrons-de-conception-gof' => [
                ['name' => 'Patrons de Création & Structure', 'description' => 'Implémenter Singleton, Factory, Builder et Adapter dans vos architectures logicielles'],
            ],
            'clean-architecture' => [
                ['name' => 'Clean Architecture Layers', 'description' => 'Isoler le domaine métier, les cas d\'usage et séparer les détails techniques (BDD, UI)'],
            ],
        ];

        $topics = [];

        foreach ($topicsMap as $subSlug => $topList) {
            $sub = Subcategory::where('slug', $subSlug)->first();
            if (!$sub) {
                continue;
            }

            foreach ($topList as $top) {
                $topics[] = [
                    'name' => $top['name'],
                    'subcategory_id' => $sub->id,
                    'slug' => Str::slug($top['name']),
                    'description' => $top['description'],
                    'icon' => 'fa-solid fa-graduation-cap',
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach (array_chunk($topics, 500) as $chunk) {
            Topic::insert($chunk);
        }
    }
}

