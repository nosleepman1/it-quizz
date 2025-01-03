# Xam-Xam — Plateforme de Quiz Informatique

> Une application de quiz interactive et progressive pour les développeurs, DevOps, et passionnés de tech. Construite avec **AdonisJS**, **React TS** et **React Native**, stylée avec **Tailwind CSS**.

---

## Table des matières

- [Présentation](#présentation)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Modules disponibles](#modules-disponibles)
- [Base de données](#base-de-données)
- [Authentification](#authentification)
- [Fonctionnalités futures](#fonctionnalités-futures)
- [Installation](#installation)
- [Roadmap](#roadmap)

---

##  Présentation

**QuizDev** est une plateforme de quiz dédiée aux métiers et connaissances du numérique. Elle permet aux utilisateurs de tester, renforcer et suivre leurs connaissances techniques à travers des quiz organisés par thèmes, catégories et sous-catégories.

L'application est pensée pour :
- Les **développeurs** souhaitant consolider leurs bases ou se préparer à des entretiens
- Les **étudiants en informatique** qui veulent progresser par la pratique
- Les **équipes tech** qui veulent gamifier l'apprentissage interne

---

##  Stack technique

| Couche | Technologie |
|--------|-------------|
| **mobile** | [AdonisJS v6](https://adonisjs.com/) — TypeScript, REST, Lucid ORM |
| **Web API** | [Laravel 13](https://laravel.com/) - PHP, MVC, clean Architecture |
| **Web** | [React](https://react.dev/) — TypeScript, Vite, Tailwind CSS |
| **Mobile views** | [React Native](https://reactnative.dev/) — TypeScript, Expo, NativeWind |
| **Database** | PostgreSQL |
| **Auth** | Access Tokens (JWT / Sanctum) |
| **Validation** | VineJS (Adonis) / FormRequests(Laravel) |
| **Tests** | Japa (API) + Vitest (Web) + Jest(Mobile) + Pest(Web API) |

---

<!-- ##  Architecture du projet

```
quizdev/
├── api/                  # AdonisJS — Backend REST API
│   ├── app/
│   │   ├── controllers/  # Logique des routes
│   │   ├── models/       # Modèles Lucid ORM
│   │   ├── services/     # Logique métier
│   │   ├── validators/   # Validation VineJS
│   │   └── middleware/   # Auth, rôles...
│   ├── database/
│   │   ├── migrations/   # Structure BDD
│   │   └── seeders/      # Données initiales (thèmes, questions...)
│   └── config/
│
├── web/                  # React TS — Application web
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages de l'app
│   │   ├── hooks/        # Hooks personnalisés
│   │   ├── services/     # Appels API
│   │   └── types/        # Types TypeScript partagés
│   └── ...
│
└── mobile/               # React Native — Application mobile
    ├── src/
    │   ├── screens/      # Écrans
    │   ├── components/   # Composants UI
    │   ├── navigation/   # React Navigation
    │   ├── services/     # Appels API
    │   └── types/        # Types TypeScript partagés
    └── ...
``` -->

---

##  Modules disponibles

###  Module Contenu

Organisation hiérarchique du contenu en 4 niveaux :

```
Thème → Catégorie → Sous-catégorie → Topic → Questions
```

**Thèmes disponibles au lancement :**

####  Developer
| Catégorie | Sous-catégories | Topics exemples |
|-----------|-----------------|-----------------|
| Backend | Languages | Java, Python, PHP, Node.js |
| Backend | Frameworks | Spring, Adonis, Laravel, NestJS |
| Backend | Architecture | MVC, Hexagonale, Microservices, Clean Arch |
| Backend | Patterns | Singleton, Repository, Factory, SOLID |
| Backend | Concepts | POO, SOLID Principles, REST, GraphQL |
| Frontend | Libraries | React, Angular, Vue, Svelte |
| Frontend | Fondamentaux | HTML, CSS, JavaScript Vanilla |
| Frontend | Outils | Webpack, Vite, TypeScript |
| Database | SQL | PostgreSQL, MySQL, requêtes, index |
| Database | NoSQL | MongoDB, Redis, Firebase |
| Database | Concepts | Transactions, normalisation, ACID |

####  DevOps
| Catégorie | Sous-catégories | Topics exemples |
|-----------|-----------------|-----------------|
| Cloud | AWS | EC2, S3, Lambda, RDS, IAM |
| Cloud | Concepts | IaaS, PaaS, SaaS, serverless |
| IaC | Terraform | Providers, modules, state |
| IaC | Ansible | Playbooks, rôles, inventaires |
| CI/CD | Outils | GitHub Actions, GitLab CI, Jenkins |
| CI/CD | Concepts | Pipelines, déploiement continu |
| Conteneurisation | Docker | Images, containers, Dockerfile |
| Conteneurisation | Kubernetes | Pods, services, deployments |

---

###  Module Utilisateurs

- Inscription / Connexion (email + mot de passe)
- Authentification par **sessions** (web) et **access tokens** JWT (mobile)
- Rôles : `user`, `moderator`, `admin`
- Profil utilisateur avec avatar, bio, niveau
- Tableau de bord personnel : statistiques, progression, historique

---

###  Module Quiz / Parties

Trois modes de jeu disponibles :

| Mode | Description |
|------|-------------|
| **Practice** | Pas de limite de temps, explication après chaque réponse |
| **Challenge** | Limite de temps par question, score calculé |
| **Timed** | Chronomètre global, autant de questions que possible |

**Déroulement d'une partie :**
1. L'utilisateur choisit un theme(dev), categorie ou topic ( Spring Boot)
2. Une sélection de questions est générée selon la difficulté
3. L'utilisateur répond aux questions (QCM, Vrai/Faux, Code Snippet)
4. À la fin, le score, la durée et les explications sont affichés
5. Les résultats sont enregistrés dans son historique

---

###  Module Scoring & Classement

**Calcul des points :**

| Difficulté | Points de base | Bonus rapidité |
|------------|---------------|----------------|
| Easy | 10 pts | Jusqu'à +5 pts |
| Medium | 20 pts | Jusqu'à +10 pts |
| Hard | 30 pts | Jusqu'à +15 pts |

**Classements disponibles :**
- Global (tous thèmes confondus)
- Par thème (ex: top Developer)
- Par topic (ex: top Spring)
- Hebdomadaire / Mensuel / All-time

---

###  Module Progression

- **Mastery Level** par topic (0 à 100%) calculé sur les dernières parties
- **Streak** de connexions consécutives
- **Badges** débloquables (ex: "Master Java", "7 jours consécutifs", "100 questions correctes")
- Historique détaillé de toutes les parties
- Statistiques globales : précision, points totaux, temps moyen de réponse

---


##  Authentification

- **Web (React)** : ContextApi via token sécurisés 
- **Mobile (React Native)** : Access Tokens JWT stockés dans le secure storage
- **Middleware** : Protection des routes par rôle (`auth`, `admin`, `moderator`)
- **Email verification** : Confirmation par mail à l'inscription

---

##  Fonctionnalités futures

###  Mode Online / Multijoueur

> Jouer en temps réel contre d'autres utilisateurs

- Salles de jeu (`rooms`) publiques ou privées
- Matchmaking par niveau
- Quiz synchronisé : toutes les questions en même temps
- Classement en direct pendant la partie
- Tables nécessaires : `rooms`, `room_players`, `room_rounds`

---

###  Mode Social

> Construire une communauté autour de l'apprentissage

- Système d'amis
- Défis entre amis (challenge a friend)
- Partage de scores sur profil public
- Tables nécessaires : `friendships`, `challenges`, `challenge_invites`

---

###  Notifications

> Garder les utilisateurs engagés

- Rappels de streak
- Notification de défi reçu
- Nouveaux contenus disponibles
- Table nécessaire : `notifications`

---

###  Mode Révision (type Anki)

> Révision espacée pour mémoriser sur le long terme

- Algorithme de répétition espacée (SRS)
- Questions marquées à revoir
- Table nécessaire : `review_schedule`

---

###  Nouveaux Domaines

L'architecture hiérarchique permet d'ajouter de nouveaux domaines sans modifier la structure existante :

| Domaine | Catégories prévues |
|---------|--------------------|
|  **Cybersécurité** | Pentest, Cryptographie, OWASP, Forensics |
|  **Réseaux** | TCP/IP, DNS, HTTP, Protocoles, Sécurité réseau |
|  **Intelligence Artificielle** | ML, Deep Learning, NLP, Computer Vision |
|  **Data** | SQL avancé, Python Data, Spark, Kafka, BI |
|  **Électronique** | Circuits, Composants, Arduino, Raspberry Pi |
|  **Robotique** | Capteurs, Actuateurs, ROS, Programmation embarquée |

---

###  Module Admin

> Interface d'administration complète

- Gestion des utilisateurs (ban, rôles)
- Ajout / modification / suppression de questions
- Modération des contenus signalés
- Statistiques globales de la plateforme
- Gestion des badges et récompenses

---

##  Installation

### Prérequis

- Node.js >= 20
- PostgreSQL >= 15
- npm ou yarn

### API (AdonisJS)

```bash
cd api
npm install
cp .env.example .env
# Configurer .env (DB, JWT_SECRET, SMTP...)
node ace migration:run
node ace db:seed
node ace serve --watch
```

### Web (React)

```bash
cd web
npm install
cp .env.example .env
# Configurer VITE_API_URL
npm run dev
```

### Mobile (React Native / Expo)

```bash
cd mobile
npm install
cp .env.example .env
# Configurer EXPO_PUBLIC_API_URL
npx expo start
```

---

##  Roadmap

| Phase | Contenu | Statut |
|-------|---------|--------|
| **Phase 1** | Contenu Dev + DevOps, Auth, Quiz solo, Scoring |  En cours |
| **Phase 2** | Progression, Badges, Leaderboard, Profil |  Planifié |
| **Phase 3** | Mode Online / Multijoueur, Social |  Planifié |
| **Phase 4** | Cyber, Réseaux, IA, Data |  Planifié |
| **Phase 5** | Électronique, Robotique, Admin complet |  Planifié |

---

