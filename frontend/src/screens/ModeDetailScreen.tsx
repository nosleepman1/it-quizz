import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getMockData } from '@/mocks/mockData';
import { 
  ArrowLeft, Play, Zap, Users, Award, ShieldAlert,
  Info, CheckCircle2, AlertCircle
} from 'lucide-react';
import type { GameMode } from '@/types/game';
import type { QuestionResponse } from '@/types/question';

const ModeDetailScreen = () => {
  const { modeId } = useParams<{ modeId: string }>();
  const navigate = useNavigate();
  const setMode = useGameStore((state) => state.setMode);
  const initSession = useGameStore((state) => state.initSession);

  const activeMode = modeId as GameMode;

  const modeDetails = {
    classic: {
      name: 'Solo Classique',
      icon: Play,
      textColor: 'text-violet-400',
      bgGlow: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
      tag: '🧠 Apprentissage & Détente',
      description: 'Testez vos connaissances en développement web, base de données, réseaux et devops à votre rythme sans stress de temps.',
      rules: [
        '10 questions au total',
        'Choix multiples (4 options)',
        'Feedback immédiat à chaque réponse',
        'Prenez tout votre temps pour réfléchir'
      ]
    },
    flash: {
      name: 'Question Flash',
      icon: Zap,
      textColor: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      tag: '⚡ Réflexes & Rapidité',
      description: 'Attention les yeux ! Ce mode met à l\'épreuve votre rapidité de lecture et vos réflexes de décision sous haute pression.',
      rules: [
        '15 secondes maximum par question',
        'Enchaînement ultra-rapide sans temps mort',
        'Pas de feedback long entre les questions',
        'Score bonus basé sur le temps restant'
      ]
    },
    genius: {
      name: 'Génie en Herbe',
      icon: Users,
      textColor: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      tag: '👥 Multijoueur Local',
      description: 'L\'expérience ultime du salon de jeu. Affrontez jusqu\'à 4 amis assis à vos côtés. Chacun répond à tour de rôle.',
      rules: [
        'De 2 à 4 joueurs sur le même mobile',
        'Système de jeu en tour par tour',
        'Attribution automatique des points par bonne réponse',
        'Affichage du gagnant et podium en fin de partie'
      ]
    },
    twelve_hits: {
      name: 'Les 12 Coups',
      icon: Award,
      textColor: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      tag: '🏆 Série & Endurance',
      description: 'Le but est simple en apparence : accumuler 12 bonnes réponses consécutives pour valider la grille d\'or.',
      rules: [
        'Série de 12 bonnes réponses ciblées',
        'Chaque bonne réponse éclaire une étoile',
        'Grille visuelle de progression',
        'Tension exponentielle au fur et à mesure'
      ]
    },
    survival: {
      name: 'Mode Survie',
      icon: ShieldAlert,
      textColor: 'text-rose-400',
      bgGlow: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      tag: '💀 Hardcore & Précision',
      description: 'Ne convient pas aux novices. Vous commencez avec 3 vies (cœurs). Une seule mauvaise réponse et vous perdez un cœur.',
      rules: [
        '3 vies au départ',
        'Pas de limite au nombre de questions',
        'Une mauvaise réponse = perte d\'une vie',
        'Partie terminée à 0 vie (Game Over)'
      ]
    }
  }[activeMode] || {
    name: 'Mode Inconnu',
    icon: Info,
    textColor: 'text-gray-400',
    bgGlow: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    tag: 'Inconnu',
    description: 'Ce mode de jeu n\'existe pas.',
    rules: []
  };

  const Icon = modeDetails.icon;

  // Flatten mock data and retrieve all questions
  const handleRandomStart = () => {
    setMode(activeMode);
    
    // Gather all questions in hierarchical mock database
    const themes = getMockData();
    const allQuestions: QuestionResponse[] = [];
    
    themes.forEach(t => {
      t.categories.forEach(c => {
        c.subcategories.forEach(s => {
          s.topics.forEach(tp => {
            tp.questions.forEach(q => {
              // Avoid duplicates
              if (!allQuestions.find(existing => existing.id === q.id)) {
                allQuestions.push(q);
              }
            });
          });
        });
      });
    });

    if (allQuestions.length === 0) {
      alert('Aucune question disponible.');
      return;
    }

    // Shuffle questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    
    // Initialize session and direct to game screen
    initSession(shuffled);
    navigate('/play/game');
  };

  const handleConfigureStart = () => {
    setMode(activeMode);
    navigate('/play/scope');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-8 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-game-muted hover:text-game-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase font-bold tracking-widest text-game-muted">
            Détails Mode
          </span>
          <div className="w-10" />
        </header>

        {/* Mode Presentation Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`game-glass-card rounded-3xl p-6 border ${modeDetails.borderColor} ${modeDetails.bgGlow} flex flex-col items-center text-center mb-6`}
        >
          <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${modeDetails.textColor}`}>
            <Icon className="w-8 h-8" />
          </div>
          <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 bg-white/5 border border-white/5 rounded-full mb-3.5 ${modeDetails.textColor}`}>
            {modeDetails.tag}
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mb-3">
            {modeDetails.name}
          </h1>
          <p className="text-xs text-game-muted leading-relaxed px-2">
            {modeDetails.description}
          </p>
        </motion.div>

        {/* Rules section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/5 border border-white/5 rounded-3xl p-5 mb-6"
        >
          <h3 className="text-xs uppercase font-black tracking-widest text-game-muted mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-game-secondary" />
            Règles & Conditions
          </h3>
          <ul className="space-y-3.5">
            {modeDetails.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start text-xs font-semibold text-game-text leading-tight">
                <CheckCircle2 className="w-4.5 h-4.5 text-game-secondary shrink-0 mr-2.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Action Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-3"
      >
        <button
          onClick={handleConfigureStart}
          className="w-full py-4 bg-gradient-to-r from-game-primary to-game-secondary rounded-2xl text-xs font-black uppercase tracking-wider text-game-text hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] cursor-pointer"
        >
          Configurer la Partie
        </button>
        <button
          onClick={handleRandomStart}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-wider text-game-muted hover:text-game-text active:scale-95 transition-all cursor-pointer"
        >
          Lancer en Aléatoire
        </button>
      </motion.div>
    </div>
  );
};

export default ModeDetailScreen;
