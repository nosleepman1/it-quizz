<?php

namespace Database\Seeders;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChoiceSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Distracteurs réalistes pour les vraies questions
        $distractorsMap = [
            'Quelle balise HTML5 est la plus appropriée pour contenir les liens de navigation principaux ?' => [
                '<navigation>', '<menu>', '<header>'
            ],
            'Quelle balise HTML5 représente un contenu autonome qui pourrait être extrait et partagé indépendamment ?' => [
                '<section>', '<aside>', '<div>'
            ],
            'En Flexbox, quelle propriété permet d\'aligner les éléments le long de l\'axe principal ?' => [
                'align-items', 'align-content', 'flex-direction'
            ],
            'En CSS Grid, quelle propriété définit la taille des colonnes ?' => [
                'grid-columns', 'grid-template-rows', 'grid-gap'
            ],
            'Quel hook React permet de stocker une valeur mutable qui ne déclenche pas de re-render lors de sa modification ?' => [
                'useState', 'useMemo', 'useCallback'
            ],
            'Quel hook React est utilisé pour effectuer des effets de bord dans les composants fonctionnels ?' => [
                'useState', 'useLayoutEffect', 'useMemo'
            ],
            'Quel hook React permet de mémoïser une valeur calculée coûteuse pour éviter de la recalculer à chaque rendu ?' => [
                'useCallback', 'useRef', 'useState'
            ],
            'Dans React, à quoi sert le hook useCallback ?' => [
                'À effectuer des appels réseau asynchrones', 'À stocker une variable d\'état local', 'À forcer le re-rendu du composant parent'
            ],
            'Quelle méthode Eloquent Laravel permet de charger des relations pour éviter le problème des requêtes N+1 ?' => [
                'load()', 'join()', 'merge()'
            ],
            'Quelle méthode Laravel permet de définir une relation inverse \'un-à-plusieurs\' ?' => [
                'hasMany()', 'hasOne()', 'belongsToMany()'
            ],
            'Quel code de statut HTTP indique que la ressource demandée n\'a pas été modifiée depuis la dernière requête ?' => [
                '204 No Content', '404 Not Found', '403 Forbidden'
            ],
            'Quel est le rôle principal d\'un middleware dans Express ou Laravel ?' => [
                'Gérer la connexion à la base de données', 'Générer le rendu HTML de la page', 'Compiler le code JavaScript côté client'
            ],
            'Quel type d\'attaque consiste à injecter du code JavaScript malveillant exécuté par le navigateur de la victime ?' => [
                'SQL Injection', 'CSRF', 'Phishing'
            ],
            'Quelle faille consiste à forcer un utilisateur authentifié à exécuter des actions non voulues sur une application web ?' => [
                'XSS', 'SQL Injection', 'Man-in-the-Middle'
            ],
            'Dans un fichier docker-compose.yml, quelle section sert à mapper des répertoires hôtes à des répertoires de conteneur ?' => [
                'networks', 'ports', 'environment'
            ],
            'Quelle commande Docker permet de supprimer tous les conteneurs arrêtés, les réseaux inutilisés et les images sans nom ?' => [
                'docker clean', 'docker rm -f', 'docker rmi all'
            ],
            'À quelle couche du modèle OSI appartient le protocole IP ?' => [
                'Couche 2 (Liaison)', 'Couche 4 (Transport)', 'Couche 7 (Application)'
            ],
            'Quel protocole effectue un handshake en 3 étapes (SYN, SYN-ACK, ACK) ?' => [
                'UDP', 'HTTP', 'IP'
            ],
            'Dans le modèle OSI, quelle couche s\'occupe du chiffrement et de la compression des données ?' => [
                'Couche 5 (Session)', 'Couche 7 (Application)', 'Couche 4 (Transport)'
            ],
            'Dans SOLID, que signifie la lettre \'L\' (principe de substitution de Liskov) ?' => [
                'Chaque classe ne doit avoir qu\'une seule responsabilité',
                'Les classes doivent être ouvertes à l\'extension et fermées à la modification',
                'Les interfaces spécifiques sont préférables aux interfaces générales'
            ],
            'Quel principe SOLID stipule que les modules de haut niveau ne doivent pas dépendre des modules de bas niveau, mais d\'abstractions ?' => [
                'Responsabilité unique (S)', 'Ouvert/Fermé (O)', 'Substitution de Liskov (L)'
            ],
            'Quelle commande Linux est utilisée pour modifier le propriétaire d\'un fichier ?' => [
                'chmod', 'chgrp', 'passwd'
            ],
            'Quelle base de données NoSQL est classée comme un stockage clé-valeur ultra-rapide en mémoire ?' => [
                'MongoDB', 'Cassandra', 'PostgreSQL'
            ],
            'Quel outil d\'IaC (Infrastructure as Code) utilise le langage de configuration HCL ?' => [
                'Ansible', 'Chef', 'Puppet'
            ],
            'Dans AWS, que signifie le sigle EC2 ?' => [
                'Easy Connection Cloud', 'Elastic Cache Container', 'Enterprise Core Console'
            ],
            'En programmation orientée objet, quel patron de conception garantit qu\'une classe n\'a qu\'une seule instance et fournit un point d\'accès global ?' => [
                'Factory', 'Observer', 'Strategy'
            ],
        ];

        Question::select('id', 'question', 'answer')->chunk(500, function ($questions) use ($distractorsMap) {
            $choices = [];

            foreach ($questions as $question) {
                // 1. Le choix correct
                $choices[] = [
                    'question_id' => $question->id,
                    'choice' => $question->answer,
                    'is_correct' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // 2. Trois choix incorrects
                $qText = $question->question;
                if (isset($distractorsMap[$qText])) {
                    $incorrects = $distractorsMap[$qText];
                } else {
                    // Distracteurs génériques contextualisés
                    if (str_contains($qText, 'meilleure pratique')) {
                        $incorrects = [
                            "Ignorer les standards et coder une solution sur mesure sans bibliothèque externe",
                            "Désactiver toutes les validations de sécurité pour optimiser le temps d'exécution",
                            "Déléguer cette gestion entièrement au navigateur côté client sans contrôle serveur"
                        ];
                    } elseif (str_contains($qText, 'problème courant')) {
                        $incorrects = [
                            "Une surconsommation électrique dans les centres de données physiques de l'hébergeur",
                            "Une perte totale d'accès à Internet pour les clients de la zone géographique",
                            "Un conflit de licence open-source empêchant le déploiement sur les plateformes mobiles"
                        ];
                    } else {
                        $incorrects = [
                            "Une spécification obsolète datant des débuts de l'informatique moderne",
                            "Un protocole alternatif peu sécurisé principalement destiné aux objets connectés",
                            "Un framework JavaScript concurrent de React, Angular et Vue.js"
                        ];
                    }
                }

                foreach ($incorrects as $inc) {
                    $choices[] = [
                        'question_id' => $question->id,
                        'choice' => $inc,
                        'is_correct' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            foreach (array_chunk($choices, 1000) as $chunk) {
                Choice::insert($chunk);
            }
        });
    }
}

