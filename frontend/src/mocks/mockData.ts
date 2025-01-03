import type { ThemeResponse } from '@/types/theme';
import type { CategoryResponse } from '@/types/category';
import type { SubcategoryResponse } from '@/types/SubCategory';
import type { TopicResponse } from '@/types/topic';
import type { QuestionResponse } from '@/types/question';

// -------------------------------------------------------------
// Questions for React Hooks
// -------------------------------------------------------------
const QUESTIONS_REACT_HOOKS: QuestionResponse[] = [
  {
    id: 'q-react-hooks-1',
    question: 'Quel hook est utilisé pour gérer un effet de bord (side effect) dans un composant fonctionnel React ?',
    difficulty: 'easy',
    responses: [
      { id: 101, response: 'useState', is_correct: false },
      { id: 102, response: 'useEffect', is_correct: true },
      { id: 103, response: 'useContext', is_correct: false },
      { id: 104, response: 'useReducer', is_correct: false }
    ]
  },
  {
    id: 'q-react-hooks-2',
    question: 'Quelle est la principale différence entre useMemo et useCallback ?',
    difficulty: 'medium',
    responses: [
      { id: 201, response: 'useMemo mémorise une valeur calculée, tandis que useCallback mémorise la fonction elle-même.', is_correct: true },
      { id: 202, response: 'useCallback est asynchrone, useMemo est synchrone.', is_correct: false },
      { id: 203, response: 'useMemo s\'exécute uniquement côté serveur.', is_correct: false },
      { id: 204, response: 'Il n\'y a aucune différence, ce sont des alias.', is_correct: false }
    ]
  },
  {
    id: 'q-react-hooks-3',
    question: 'Qu\'arrive-t-il si vous passez un tableau vide de dépendances [] à un useEffect ?',
    difficulty: 'easy',
    responses: [
      { id: 301, response: 'L\'effet s\'exécute à chaque rendu du composant.', is_correct: false },
      { id: 302, response: 'L\'effet s\'exécute une seule fois, après le premier rendu.', is_correct: true },
      { id: 303, response: 'L\'effet ne s\'exécute jamais.', is_correct: false },
      { id: 304, response: 'Cela provoque une boucle infinie de rendus.', is_correct: false }
    ]
  },
  {
    id: 'q-react-hooks-4',
    question: 'Dans quel cas devriez-vous utiliser le hook useRef ?',
    difficulty: 'medium',
    responses: [
      { id: 401, response: 'Pour déclencher un re-rendu immédiat lors de la modification de la valeur.', is_correct: false },
      { id: 402, response: 'Pour persister une valeur entre les rendus sans déclencher de re-rendu, ou pour accéder directement à un élément du DOM.', is_correct: true },
      { id: 403, response: 'Uniquement pour stocker des appels API.', is_correct: false },
      { id: 404, response: 'Pour crypter des variables sensibles dans le navigateur.', is_correct: false }
    ]
  },
  {
    id: 'q-react-hooks-5',
    question: 'Comment fonctionne la fonction de nettoyage (cleanup) retournée par useEffect ?',
    difficulty: 'hard',
    responses: [
      { id: 501, response: 'Elle s\'exécute juste avant que le composant soit démonté ou avant de ré-exécuter l\'effet avec de nouvelles dépendances.', is_correct: true },
      { id: 502, response: 'Elle s\'exécute immédiatement après le premier rendu.', is_correct: false },
      { id: 503, response: 'Elle sert à vider le cache du navigateur automatiquement.', is_correct: false },
      { id: 504, response: 'Elle force le garbage collector à libérer la mémoire instantanément.', is_correct: false }
    ]
  }
];

// -------------------------------------------------------------
// Questions for React State
// -------------------------------------------------------------
const QUESTIONS_REACT_STATE: QuestionResponse[] = [
  {
    id: 'q-react-state-1',
    question: 'Quel hook de gestion d\'état local est recommandé pour les états complexes ayant plusieurs sous-valeurs ?',
    difficulty: 'medium',
    responses: [
      { id: 601, response: 'useState', is_correct: false },
      { id: 602, response: 'useReducer', is_correct: true },
      { id: 603, response: 'useRef', is_correct: false },
      { id: 604, response: 'useMemo', is_correct: false }
    ]
  },
  {
    id: 'q-react-state-2',
    question: 'Quel est l\'un des avantages majeurs de Zustand par rapport à Redux ?',
    difficulty: 'easy',
    responses: [
      { id: 701, response: 'Il ne nécessite pas de configurer un Provider global pour envelopper l\'application.', is_correct: true },
      { id: 702, response: 'Il est écrit exclusivement en assembleur.', is_correct: false },
      { id: 703, response: 'Il est intégré d\'office dans les navigateurs.', is_correct: false },
      { id: 704, response: 'Il ne supporte pas le typage TypeScript.', is_correct: false }
    ]
  }
];

// -------------------------------------------------------------
// Questions for CSS & Tailwind Flexbox/Grid
// -------------------------------------------------------------
const QUESTIONS_TAILWIND_LAYOUT: QuestionResponse[] = [
  {
    id: 'q-tailwind-1',
    question: 'Quelle classe Tailwind équivaut à la propriété CSS "display: flex" ?',
    difficulty: 'easy',
    responses: [
      { id: 801, response: 'flexbox', is_correct: false },
      { id: 802, response: 'flex', is_correct: true },
      { id: 803, response: 'd-flex', is_correct: false },
      { id: 804, response: 'grid-flex', is_correct: false }
    ]
  },
  {
    id: 'q-tailwind-2',
    question: 'Comment centrez-vous verticalement et horizontalement un élément dans un conteneur flex avec Tailwind ?',
    difficulty: 'medium',
    responses: [
      { id: 901, response: 'flex items-center justify-center', is_correct: true },
      { id: 902, response: 'flex self-center place-self-center', is_correct: false },
      { id: 903, response: 'flex align-middle justify-center', is_correct: false },
      { id: 904, response: 'flex justify-between items-stretch', is_correct: false }
    ]
  }
];

// -------------------------------------------------------------
// Questions for Dockerfiles
// -------------------------------------------------------------
const QUESTIONS_DOCKER_FILE: QuestionResponse[] = [
  {
    id: 'q-docker-1',
    question: 'Quelle instruction Dockerfile est utilisée pour spécifier l\'image parente/de base ?',
    difficulty: 'easy',
    responses: [
      { id: 1001, response: 'FROM', is_correct: true },
      { id: 1002, response: 'BASE', is_correct: false },
      { id: 1003, response: 'RUN', is_correct: false },
      { id: 1004, response: 'IMPORT', is_correct: false }
    ]
  },
  {
    id: 'q-docker-2',
    question: 'Quelle est la différence fondamentale entre les instructions CMD et ENTRYPOINT ?',
    difficulty: 'hard',
    responses: [
      { id: 1101, response: 'ENTRYPOINT définit la commande par défaut immuable, tandis que CMD fournit des arguments par défaut qui peuvent être surchargés au lancement.', is_correct: true },
      { id: 1102, response: 'CMD est exécuté lors de la compilation de l\'image, ENTRYPOINT lors du démarrage.', is_correct: false },
      { id: 1103, response: 'Il n\'y en a pas, CMD est l\'ancienne syntaxe.', is_correct: false },
      { id: 1104, response: 'ENTRYPOINT ne s\'applique qu\'aux images Windows.', is_correct: false }
    ]
  }
];

// -------------------------------------------------------------
// Questions for PostgreSQL ACID Transactions
// -------------------------------------------------------------
const QUESTIONS_POSTGRESQL_ACID: QuestionResponse[] = [
  {
    id: 'q-acid-1',
    question: 'Dans les propriétés ACID, que garantit la notion de Durabilité ?',
    difficulty: 'easy',
    responses: [
      { id: 1201, response: 'Que les transactions validées (committed) sont enregistrées de façon permanente, même en cas de panne de courant ou crash système.', is_correct: true },
      { id: 1202, response: 'Que le système est extrêmement rapide.', is_correct: false },
      { id: 1203, response: 'Que deux utilisateurs ne modifient pas la même donnée en même temps.', is_correct: false },
      { id: 1204, response: 'Que les clés étrangères ne se rompent jamais.', is_correct: false }
    ]
  },
  {
    id: 'q-acid-2',
    question: 'Quel niveau d\'isolation des transactions empêche les lectures fantômes (Phantom Reads) ?',
    difficulty: 'hard',
    responses: [
      { id: 1301, response: 'Read Committed', is_correct: false },
      { id: 1302, response: 'Repeatable Read', is_correct: false },
      { id: 1303, response: 'Serializable', is_correct: true },
      { id: 1304, response: 'Read Uncommitted', is_correct: false }
    ]
  }
];

// -------------------------------------------------------------
// Assembly of the hierarchical structure
// We create the elements with lazy backreferences to avoid compile/circular-reference errors
// -------------------------------------------------------------

export const getMockData = (): ThemeResponse[] => {
  // 1. Create Themes
  const themeSoftware: ThemeResponse = {
    id: 'theme-dev',
    name: 'Développement Software',
    description: 'Frameworks Modernes, Outils Frontend et Backend',
    is_active: true,
    categories: []
  };

  const themeDatabase: ThemeResponse = {
    id: 'theme-db',
    name: 'Bases de Données',
    description: 'Stockage SQL & NoSQL, Indexation et Performances',
    is_active: true,
    categories: []
  };

  const themeDevops: ThemeResponse = {
    id: 'theme-devops',
    name: 'DevOps & Cloud',
    description: 'Conteneurs, CI/CD et Hébergement Cloud',
    is_active: true,
    categories: []
  };

  // -------------------------------------------------------------
  // Theme 1: Software Development
  // -------------------------------------------------------------
  const catFrontend: CategoryResponse = {
    id: 'cat-frontend',
    name: 'Frontend Web',
    theme_id: 'theme-dev',
    slug: 'frontend-web',
    description: 'Frameworks UI et Technologies Navigateur',
    is_active: true,
    icon: 'Layout',
    created_at: '',
    updated_at: '',
    theme: themeSoftware,
    subcategories: []
  };

  const catBackend: CategoryResponse = {
    id: 'cat-backend',
    name: 'Backend & APIs',
    theme_id: 'theme-dev',
    slug: 'backend-apis',
    description: 'Routage, logique métier et microservices',
    is_active: true,
    icon: 'Server',
    created_at: '',
    updated_at: '',
    theme: themeSoftware,
    subcategories: []
  };

  themeSoftware.categories = [catFrontend, catBackend];

  // Frontend subcategories
  const subReact: SubcategoryResponse = {
    id: 11,
    name: 'React Ecosystem',
    category_id: 1, // mapping dummy id
    slug: 'react-ecosystem',
    description: 'React, Hooks, State management',
    is_active: true,
    category: catFrontend,
    topics: []
  };

  const subCss: SubcategoryResponse = {
    id: 12,
    name: 'CSS & Tailwind',
    category_id: 1,
    slug: 'css-tailwind',
    description: 'Responsive design et Intégration',
    is_active: true,
    category: catFrontend,
    topics: []
  };

  catFrontend.subcategories = [subReact, subCss];

  // React topics
  const topicHooks: TopicResponse = {
    id: 111,
    name: 'Hooks React',
    subcategory_id: 11,
    slug: 'hooks-react',
    description: 'useEffect, useState, useMemo, etc.',
    is_active: true,
    icon: 'HookIcon',
    subcategory: subReact,
    questions: QUESTIONS_REACT_HOOKS
  };

  const topicState: TopicResponse = {
    id: 112,
    name: 'Gestion d\'État',
    subcategory_id: 11,
    slug: 'state-management',
    description: 'Context, Zustand, Redux',
    is_active: true,
    icon: 'DatabaseIcon',
    subcategory: subReact,
    questions: QUESTIONS_REACT_STATE
  };

  subReact.topics = [topicHooks, topicState];

  // CSS topics
  const topicTailwind: TopicResponse = {
    id: 121,
    name: 'Flexbox & Grid',
    subcategory_id: 12,
    slug: 'flexbox-grid-tailwind',
    description: 'Mises en page modernes avec TailwindCSS',
    is_active: true,
    icon: 'LayersIcon',
    subcategory: subCss,
    questions: QUESTIONS_TAILWIND_LAYOUT
  };

  subCss.topics = [topicTailwind];

  // -------------------------------------------------------------
  // Theme 2: Databases
  // -------------------------------------------------------------
  const catSql: CategoryResponse = {
    id: 'cat-sql',
    name: 'Bases Relationnelles (SQL)',
    theme_id: 'theme-db',
    slug: 'relational-sql',
    description: 'PostgreSQL, MySQL et requêtes complexes',
    is_active: true,
    icon: 'Database',
    created_at: '',
    updated_at: '',
    theme: themeDatabase,
    subcategories: []
  };

  themeDatabase.categories = [catSql];

  const subPostgres: SubcategoryResponse = {
    id: 21,
    name: 'PostgreSQL',
    category_id: 2,
    slug: 'postgresql',
    description: 'Administration et Requêtes PostgreSQL',
    is_active: true,
    category: catSql,
    topics: []
  };

  catSql.subcategories = [subPostgres];

  const topicAcid: TopicResponse = {
    id: 211,
    name: 'ACID & Transactions',
    subcategory_id: 21,
    slug: 'acid-transactions',
    description: 'Transactions robustes et Niveaux d\'isolation',
    is_active: true,
    icon: 'Lock',
    subcategory: subPostgres,
    questions: QUESTIONS_POSTGRESQL_ACID
  };

  subPostgres.topics = [topicAcid];

  // -------------------------------------------------------------
  // Theme 3: DevOps & Cloud
  // -------------------------------------------------------------
  const catConteneurs: CategoryResponse = {
    id: 'cat-devops-containers',
    name: 'Conteneurs & Orchestration',
    theme_id: 'theme-devops',
    slug: 'containers-orchestration',
    description: 'Docker et Kubernetes pour la production',
    is_active: true,
    icon: 'Cpu',
    created_at: '',
    updated_at: '',
    theme: themeDevops,
    subcategories: []
  };

  themeDevops.categories = [catConteneurs];

  const subDocker: SubcategoryResponse = {
    id: 31,
    name: 'Docker Ecosystem',
    category_id: 3,
    slug: 'docker-ecosystem',
    description: 'Déploiement isolé et Environnements locaux',
    is_active: true,
    category: catConteneurs,
    topics: []
  };

  catConteneurs.subcategories = [subDocker];

  const topicDockerfiles: TopicResponse = {
    id: 311,
    name: 'Dockerfile',
    subcategory_id: 31,
    slug: 'dockerfile',
    description: 'Création d\'images Docker personnalisées',
    is_active: true,
    icon: 'FileCode',
    subcategory: subDocker,
    questions: QUESTIONS_DOCKER_FILE
  };

  subDocker.topics = [topicDockerfiles];

  return [themeSoftware, themeDatabase, themeDevops];
};
