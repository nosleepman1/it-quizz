<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class QuestionSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vraies questions IT de base
        $realQuestionsMap = [
            'balises-semantiques-html5' => [
                [
                    'question' => 'Quelle balise HTML5 est la plus appropriée pour contenir les liens de navigation principaux ?',
                    'answer' => '<nav>',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
                [
                    'question' => 'Quelle balise HTML5 représente un contenu autonome qui pourrait être extrait et partagé indépendamment ?',
                    'answer' => '<article>',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
            ],
            'css-grid-flexbox' => [
                [
                    'question' => 'En Flexbox, quelle propriété permet d\'aligner les éléments le long de l\'axe principal ?',
                    'answer' => 'justify-content',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
                [
                    'question' => 'En CSS Grid, quelle propriété définit la taille des colonnes ?',
                    'answer' => 'grid-template-columns',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
            ],
            'react-hooks' => [
                [
                    'question' => 'Quel hook React permet de stocker une valeur mutable qui ne déclenche pas de re-render lors de sa modification ?',
                    'answer' => 'useRef',
                    'difficulty' => 'moyen',
                    'score' => 5,
                ],
                [
                    'question' => 'Quel hook React est utilisé pour effectuer des effets de bord dans les composants fonctionnels ?',
                    'answer' => 'useEffect',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
                [
                    'question' => 'Quel hook React permet de mémoïser une valeur calculée coûteuse pour éviter de la recalculer à chaque rendu ?',
                    'answer' => 'useMemo',
                    'difficulty' => 'moyen',
                    'score' => 5,
                ],
            ],
            'gestion-detat-global' => [
                [
                    'question' => 'Dans React, à quoi sert le hook useCallback ?',
                    'answer' => 'À mémoïser une instance de fonction pour éviter sa recréation lors de chaque rendu',
                    'difficulty' => 'moyen',
                    'score' => 6,
                ],
            ],
            'laravel-eloquent-orm' => [
                [
                    'question' => 'Quelle méthode Eloquent Laravel permet de charger des relations pour éviter le problème des requêtes N+1 ?',
                    'answer' => 'with()',
                    'difficulty' => 'moyen',
                    'score' => 5,
                ],
                [
                    'question' => 'Quelle méthode Laravel permet de définir une relation inverse \'un-à-plusieurs\' ?',
                    'answer' => 'belongsTo()',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
            ],
            'conventions-rest-statuts-http' => [
                [
                    'question' => 'Quel code de statut HTTP indique que la ressource demandée n\'a pas été modifiée depuis la dernière requête ?',
                    'answer' => '304 Not Modified',
                    'difficulty' => 'moyen',
                    'score' => 4,
                ],
            ],
            'routage-middlewares-express' => [
                [
                    'question' => 'Quel est le rôle principal d\'un middleware dans Express ou Laravel ?',
                    'answer' => 'Intercepter et traiter la requête HTTP avant qu\'elle n\'atteigne le contrôleur',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
            ],
            'injections-sql-xss' => [
                [
                    'question' => 'Quel type d\'attaque consiste à injecter du code JavaScript malveillant exécuté par le navigateur de la victime ?',
                    'answer' => 'XSS (Cross-Site Scripting)',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
                [
                    'question' => 'Quelle faille consiste à forcer un utilisateur authentifié à exécuter des actions non voulues sur une application web ?',
                    'answer' => 'CSRF',
                    'difficulty' => 'moyen',
                    'score' => 5,
                ],
            ],
            'docker-compose' => [
                [
                    'question' => 'Dans un fichier docker-compose.yml, quelle section sert à mapper des répertoires hôtes à des répertoires de conteneur ?',
                    'answer' => 'volumes',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
                [
                    'question' => 'Quelle commande Docker permet de supprimer tous les conteneurs arrêtés, les réseaux inutilisés et les images sans nom ?',
                    'answer' => 'docker system prune',
                    'difficulty' => 'moyen',
                    'score' => 4,
                ],
            ],
            'modele-osi-tcpudp' => [
                [
                    'question' => 'À quelle couche du modèle OSI appartient le protocole IP ?',
                    'answer' => 'Couche 3 (Réseau)',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
                [
                    'question' => 'Quel protocole effectue un handshake en 3 étapes (SYN, SYN-ACK, ACK) ?',
                    'answer' => 'TCP',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
                [
                    'question' => "Dans le modèle OSI, quelle couche s'occupe du chiffrement et de la compression des données ?",
                    'answer' => 'Couche 6 (Présentation)',
                    'difficulty' => 'difficile',
                    'score' => 8,
                ],
            ],
            'principes-solid' => [
                [
                    'question' => 'Dans SOLID, que signifie la lettre \'L\' (principe de substitution de Liskov) ?',
                    'answer' => 'Une classe parente doit pouvoir être remplacée par ses sous-classes sans altérer le programme',
                    'difficulty' => 'difficile',
                    'score' => 7,
                ],
                [
                    'question' => 'Quel principe SOLID stipule que les modules de haut niveau ne doivent pas dépendre des modules de bas niveau, mais d\'abstractions ?',
                    'answer' => 'Inversion des dépendances (D)',
                    'difficulty' => 'difficile',
                    'score' => 8,
                ],
            ],
            'commandes-fichiers' => [
                [
                    'question' => 'Quelle commande Linux est utilisée pour modifier le propriétaire d\'un fichier ?',
                    'answer' => 'chown',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
            ],
            'redis' => [
                [
                    'question' => 'Quelle base de données NoSQL est classée comme un stockage clé-valeur ultra-rapide en mémoire ?',
                    'answer' => 'Redis',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
            ],
            'terraform' => [
                [
                    'question' => 'Quel outil d\'IaC (Infrastructure as Code) utilise le langage de configuration HCL ?',
                    'answer' => 'Terraform',
                    'difficulty' => 'moyen',
                    'score' => 5,
                ],
            ],
            'services-de-base-aws' => [
                [
                    'question' => 'Dans AWS, que signifie le sigle EC2 ?',
                    'answer' => 'Elastic Compute Cloud',
                    'difficulty' => 'facile',
                    'score' => 2,
                ],
            ],
            'patrons-de-conception-gof' => [
                [
                    'question' => 'En programmation orientée objet, quel patron de conception garantit qu\'une classe n\'a qu\'une seule instance et fournit un point d\'accès global ?',
                    'answer' => 'Singleton',
                    'difficulty' => 'facile',
                    'score' => 3,
                ],
            ],
        ];

        $topics = Topic::with('subcategory.category')->get();
        $questions = [];

        foreach ($topics as $topic) {
            $topicSlug = $topic->slug;
            
            // Si on a des questions pré-définies pour ce topic
            if (isset($realQuestionsMap[$topicSlug])) {
                foreach ($realQuestionsMap[$topicSlug] as $q) {
                    $questions[] = [
                        'topic_id' => $topic->id,
                        'question' => $q['question'],
                        'answer' => $q['answer'],
                        'difficulty' => $q['difficulty'],
                        'type' => 'QCM',
                        'score' => $q['score'],
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            } else {
                // Générateur automatique de questions réalistes pour les autres topics
                $subcatName = $topic->subcategory->name;
                $catName = $topic->subcategory->category->name;
                
                // On crée 3 questions par topic
                $questions[] = [
                    'topic_id' => $topic->id,
                    'question' => "Dans le contexte de '{$subcatName}' ({$catName}), quel est le concept fondamental derrière le sujet : '{$topic->name}' ?",
                    'answer' => "C'est un élément clé pour assurer la structuration et la conformité technique de '{$topic->name}'",
                    'difficulty' => 'facile',
                    'type' => 'QCM',
                    'score' => 2,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                
                $questions[] = [
                    'topic_id' => $topic->id,
                    'question' => "Quelle est la meilleure pratique généralement admise concernant l'utilisation ou la mise en œuvre de : '{$topic->name}' ?",
                    'answer' => "Respecter les normes du secteur et les patterns de conception de '{$subcatName}'",
                    'difficulty' => 'moyen',
                    'type' => 'QCM',
                    'score' => 5,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                $questions[] = [
                    'topic_id' => $topic->id,
                    'question' => "Quel problème courant ou goulot d'étranglement cherche-t-on à résoudre en configurant correctement '{$topic->name}' ?",
                    'answer' => "Les problèmes de performance et les failles de sécurité potentielles au sein de '{$subcatName}'",
                    'difficulty' => 'difficile',
                    'type' => 'QCM',
                    'score' => 8,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach (array_chunk($questions, 1000) as $chunk) {
            Question::insert($chunk);
        }
    }
}

