# Prompt — Frontend Quiz App (React + TypeScript + Tailwind + shadcn/ui)

## Contexte général

Tu es un développeur frontend senior spécialisé en applications mobiles web.
Tu dois construire le frontend complet d'une application de quiz **mobile-first** en :

- **React 18** avec **TypeScript strict**
- **Tailwind CSS v3** (utilitaires uniquement, pas de CSS custom sauf si inévitable)
- **shadcn/ui** pour les composants UI (Button, Card, Dialog, Progress, Badge, Tabs, Sheet, etc.)
- **React Router v6** pour la navigation
- **Zustand** pour la gestion d'état global (session de jeu, joueur, config)
- **Framer Motion** pour les transitions d'écran et micro-interactions
- **Lucide React** pour les icônes

> **Règle absolue : Mobile-first. Toute interface est pensée pour un écran 375px de large en priorité.**
> Le desktop est un bonus responsive, jamais la base de conception.

---

## Structure des données backend (référence, ne pas modifier)

Le backend expose une hiérarchie :

```
Thème
  └─ Catégorie
       └─ Sous-catégorie
            └─ Topic
                 └─ Question (avec level : easy | medium | hard)
                      └─ Choice[] (text, isCorrect: boolean)
```

---

## Principe fondamental : La granularité de sélection est un mode de jeu

L'utilisateur peut choisir de jouer **à n'importe quel niveau de la hiérarchie**.
Chaque niveau de sélection est en soi un "scope" de jeu :

| Scope choisi       | Ce que ça signifie                                                     |
| ------------------ | ---------------------------------------------------------------------- |
| **Thème**          | Questions piochées dans tout le thème (toutes cats, sous-cats, topics) |
| **Catégorie**      | Questions piochées dans toute la catégorie                             |
| **Sous-catégorie** | Questions piochées dans toute la sous-catégorie                        |
| **Topic**          | Questions d'un topic précis                                            |

L'utilisateur choisit jusqu'où il veut descendre dans l'arbre, puis lance la partie.
À chaque niveau, un bouton **"Jouer ici"** permet de ne pas descendre plus loin.

---

## Architecture des écrans

### 1. `SplashScreen` — `/`

- Affiché 2s au démarrage
- Logo animé + nom de l'app
- Transition vers `HomeScreen`
- Fond dégradé sombre, typographie bold

---

### 2. `HomeScreen` — `/home`

- **En-tête** : Avatar/pseudo du joueur (haut gauche) + icône paramètres (haut droite)
- **Hero** : Phrase d'accroche courte + bouton CTA principal **"Jouer"**
- **Section modes** : Grille de cards 2×N (scroll vertical) présentant chaque mode de jeu :
  - Icône grande + nom du mode + courte description + badge (ex: "⚡ Rapide", "👥 Multi", "🧠 Solo")
  - Card tappable → va vers `ModeDetailScreen`
- **Section stats rapides** : 3 chiffres clés (parties jouées, meilleur score, streak)
- **Barre de navigation bottom** : Accueil | Explorer | Classement | Profil

> Mobile-first : la grille est 2 colonnes sur mobile, 3 sur tablette.

---

### 3. `ModeDetailScreen` — `/modes/:modeId`

- Présentation du mode (règles, icône large, couleur thématique)
- Bouton **"Configurer la partie"** → `ScopeSelectionScreen`
- Bouton **"Lancer en aléatoire"** → ignore la sélection, pioche tout

---

### 4. `ScopeSelectionScreen` — `/play/scope`

Écran de sélection progressive de la hiérarchie.

**Comportement :**

- Affiche d'abord la liste des **Thèmes**
- Chaque item a :
  - Nom + icône/couleur
  - Bouton **"Jouer ici →"** (lance avec ce scope)
  - Bouton **"Explorer ▾"** (descend dans la catégorie)
- Quand l'utilisateur descend : animation slide-in, breadcrumb en haut (Thème > Catégorie > ...)
- Le breadcrumb est tappable pour remonter à n'importe quel niveau
- À chaque niveau (Catégorie, Sous-catégorie, Topic), le même pattern : **"Jouer ici"** ou **"Explorer"**
- Au niveau Topic : uniquement **"Jouer ici"**

**Header :**

- Bouton retour (←)
- Breadcrumb scrollable horizontal
- Indicateur de profondeur (ex: puce active)

**Transition :** slide horizontal entre niveaux (Framer Motion)

---

### 5. `GameConfigScreen` — `/play/config`

Affiché après le choix du scope, avant le lancement.

**Paramètres selon le mode :**

- Nombre de questions (slider : 5, 10, 15, 20)
- Niveau de difficulté (toggle : Facile | Moyen | Difficile | Mixte)
- Options spécifiques au mode (ex: temps par question si mode flash, nombre de joueurs si multi)
- Récapitulatif du scope choisi (badge breadcrumb en haut)

**Footer :**

- Bouton **"Lancer la partie"** full-width, prominent

---

### 6. Écrans de jeu — `/play/game`

Un composant `GameShell` commun gère :

- La question courante
- La progression (ex: Question 3/10)
- Le score en temps réel
- La barre de vie ou le timer selon le mode

Le `GameShell` reçoit en props le `mode` et adapte son UI.

#### 6a. Mode **Solo classique**

- 1 question à la fois
- 4 choices en grille 2×2 (cards tappables)
- Feedback immédiat (vert/rouge) après sélection
- Bouton "Question suivante" après feedback
- Progress bar en haut

#### 6b. Mode **Questions Flash** (chrono)

- Timer circulaire ou barre régressive bien visible
- Les choices sont grands, facilement tappables
- Pas de feedback long : enchaînement rapide
- Compte à rebours sonore (optionnel)

#### 6c. Mode **Génie en herbe** (tour par tour)

- Liste des joueurs avec score (2–4 joueurs)
- Indicateur "C'est au tour de : [Joueur X]"
- Buzzer virtuel optionnel (tap first to answer)
- Alternance visuelle des couleurs de joueurs

#### 6d. Mode **12 coups** (style progressif)

- Grille visuelle de 12 "étoiles" ou cases à remplir
- Chaque bonne réponse allume une case
- Tension visuelle : combien de cases restantes ?

#### 6e. Mode **Survie** (vies)

- 3 cœurs / vies en haut
- Mauvaise réponse = perte d'une vie (animation)
- Game over si 0 vie

**Règle commune à tous les modes :**

- Jamais de défilement pendant la question
- Tout tient sur un écran mobile (375×667 min)
- La question est toujours en haut, les choices en bas

---

### 7. `ResultScreen` — `/play/result`

- Score final (grand chiffre animé au comptage)
- Récapitulatif : bonnes/mauvaises/passées
- Barre de performance (ex: 70%)
- Message contextuel selon performance (encouragement/félicitation)
- Boutons :
  - **"Rejouer"** (même config)
  - **"Changer de mode"**
  - **"Accueil"**
- Optionnel : "Voir les corrections" → liste des questions avec bonne réponse

---

### 8. `ExploreScreen` — `/explore`

- Recherche par mot-clé
- Navigation dans l'arbre thème/catégorie (même logique que ScopeSelection mais en mode browse)
- Cards de thèmes avec nombre de questions disponibles

---

### 9. `LeaderboardScreen` — `/leaderboard`

- Tabs : Global | Amis | Ce mois
- Liste scrollable de joueurs avec rang, pseudo, score
- Ton propre rang mis en évidence (sticky ou highlighted)

---

### 10. `ProfileScreen` — `/profile`

- Avatar + pseudo + niveau
- Stats détaillées : topics maîtrisés, précision moyenne, streak
- Historique des parties récentes
- Bouton déconnexion

---

### 11. `SettingsScreen` — `/settings`

- Thème (clair/sombre)
- Son activé/désactivé
- Notifications
- À propos

---

## Design System

### Palette (dark mode prioritaire)

```
Background principal  : #0F0F14
Surface carte         : #1A1A24
Accent principal      : #7C3AED  (violet quiz)
Accent secondaire     : #06B6D4  (cyan)
Succès                : #22C55E
Erreur                : #EF4444
Warning               : #F59E0B
Texte principal       : #F8FAFC
Texte secondaire      : #94A3B8
```

### Typographie

- Display/titres : `font-bold` ou `font-extrabold`, tracking serré
- Corps : `font-medium`, lisible à 14px minimum
- Chiffres de score : `font-mono font-black` pour l'impact

### Composants clés à construire

- `QuestionCard` : texte de question, numéro, niveau badge
- `ChoiceButton` : état normal/sélectionné/correct/incorrect avec animation
- `ProgressBar` : fine, colorée, animée
- `TimerRing` : cercle SVG animé pour le compte à rebours
- `ScopeItem` : item de liste avec "Jouer ici" et "Explorer"
- `ModeCard` : card de sélection de mode (home)
- `PlayerToken` : avatar + score pour modes multi
- `LifeBar` : cœurs animés pour mode survie
- `BreadcrumbNav` : navigation hiérarchique scrollable

---

## État global Zustand

```typescript
// gameStore.ts
interface GameStore {
  // Scope sélectionné
  selectedScope: {
    level: 'theme' | 'category' | 'subcategory' | 'topic'
    id: string
    label: string
    breadcrumb: { id: string; label: string; level: string }[]
  } | null

  // Mode de jeu
  selectedMode: GameMode | null

  // Config de la partie
  gameConfig: {
    questionCount: number
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
    timePerQuestion?: number  // pour mode flash
    playerCount?: number       // pour mode multi
  }

  // Session en cours
  session: {
    questions: Question[]
    currentIndex: number
    answers: Answer[]
    players: Player[]         // pour modes multi
    startedAt: Date
  } | null

  // Actions
  setScope: (scope: ...) => void
  setMode: (mode: GameMode) => void
  setConfig: (config: ...) => void
  initSession: (questions: Question[]) => void
  submitAnswer: (choiceId: string) => void
  nextQuestion: () => void
  resetGame: () => void
}
```

---

## Types TypeScript

```typescript
type GameMode =
  | "classic"
  | "flash"
  | "genius" // génie en herbe
  | "twelve_hits" // 12 coups
  | "survival"; // mode survie avec vies

type ScopeLevel = "theme" | "category" | "subcategory" | "topic";

interface Theme {
  id: string;
  name: string;
  icon: string;
  color: string;
  categoryCount: number;
}
interface Category {
  id: string;
  themeId: string;
  name: string;
  subcategoryCount: number;
}
interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  topicCount: number;
}
interface Topic {
  id: string;
  subcategoryId: string;
  name: string;
  questionCount: number;
}

interface Question {
  id: string;
  topicId: string;
  text: string;
  level: "easy" | "medium" | "hard";
  choices: Choice[];
}

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Player {
  id: string;
  name: string;
  score: number;
  avatar?: string;
}

interface Answer {
  questionId: string;
  choiceId: string;
  isCorrect: boolean;
  timeSpent?: number;
}
```

---

## Règles de développement

1. **Mobile-first absolu** : breakpoint de base = 375px. `md:` et `lg:` sont des enrichissements, jamais la base.
2. **Touch targets** : tout élément tappable fait minimum `44×44px` (recommandation Apple/Google).
3. **Feedback tactile** : chaque tap déclenche une réaction visuelle immédiate (scale, couleur).
4. **Pas de hover-only** : aucune interaction critique ne repose sur le hover.
5. **Transitions fluides** : toutes les navigations entre écrans ont une animation (slide, fade, scale).
6. **États de chargement** : chaque appel API a son skeleton ou spinner.
7. **États vides** : chaque liste vide a un écran explicatif avec CTA.
8. **Accessibilité minimale** : contrastes WCAG AA, aria-labels sur les icônes, focus visible.
9. **Données mockées** : utiliser des mocks TypeScript typés pour simuler le backend tant qu'il n'est pas branché.
10. **Composants isolés** : chaque composant dans son propre fichier, props typées strictement.

---

## Structure de fichiers suggérée

```
src/
├── components/
│   ├── ui/              # shadcn/ui re-exports
│   ├── game/            # QuestionCard, ChoiceButton, TimerRing, LifeBar...
│   ├── navigation/      # BottomNav, BreadcrumbNav
│   └── shared/          # ModeCard, ScopeItem, PlayerToken...
├── screens/
│   ├── SplashScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ModeDetailScreen.tsx
│   ├── ScopeSelectionScreen.tsx
│   ├── GameConfigScreen.tsx
│   ├── game/
│   │   ├── GameShell.tsx
│   │   ├── ClassicMode.tsx
│   │   ├── FlashMode.tsx
│   │   ├── GeniusMode.tsx
│   │   ├── TwelveHitsMode.tsx
│   │   └── SurvivalMode.tsx
│   ├── ResultScreen.tsx
│   ├── ExploreScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── store/
│   └── gameStore.ts
├── types/
│   └── index.ts
├── mocks/
│   └── data.ts
├── hooks/
│   ├── useGameSession.ts
│   └── useScopeNavigation.ts
└── router/
    └── index.tsx
```

---

## Ordre de développement recommandé

1. Setup projet (Vite + React + TS + Tailwind + shadcn + Zustand + Framer Motion)
2. Types TypeScript + mocks de données
3. Router + navigation bottom
4. `HomeScreen` avec les mode cards
5. `ScopeSelectionScreen` avec navigation hiérarchique
6. `GameConfigScreen`
7. `GameShell` + `ClassicMode` (le plus simple)
8. `ResultScreen`
9. Les autres modes de jeu (Flash, Génie, 12 coups, Survie)
10. Screens secondaires (Explore, Leaderboard, Profile, Settings)
11. Connexion backend réelle (remplacement des mocks)
