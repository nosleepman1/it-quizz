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
      textColor: 'text-game-primary',
      borderColor: 'border-game-primary/20',
      tag: 'Apprentissage & Détente',
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
      textColor: 'text-game-warning',
      borderColor: 'border-game-warning/20',
      tag: 'Réflexes & Rapidité',
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
      textColor: 'text-game-primary',
      borderColor: 'border-game-primary/20',
      tag: 'Multijoueur Local',
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
      textColor: 'text-game-success',
      borderColor: 'border-game-success/20',
      tag: 'Série & Endurance',
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
      textColor: 'text-game-error',
      borderColor: 'border-game-error/20',
      tag: 'Hardcore & Précision',
      description: 'Ne convient pas aux novices. Vous commencez avec 3 vies. Une seule mauvaise réponse et vous perdez une vie.',
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
    textColor: 'text-game-muted',
    borderColor: 'border-white/5',
    tag: 'Inconnu',
    description: 'Ce mode de jeu n\'existe pas.',
    rules: []
  };

  const Icon = modeDetails.icon;

  const handleRandomStart = () => {
    setMode(activeMode);
    
    const themes = getMockData();
    const allQuestions: QuestionResponse[] = [];
    
    themes.forEach(t => {
      t.categories.forEach(c => {
        c.subcategories.forEach(s => {
          s.topics.forEach(tp => {
            tp.questions.forEach(q => {
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

    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    
    initSession(shuffled);
    navigate('/play/game');
  };

  const handleConfigureStart = () => {
    setMode(activeMode);
    navigate('/play/scope');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-8 flex flex-col justify-between font-sans">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
           }} 
      />

      <div className="z-10">
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-game-muted hover:text-game-text hover:bg-white/10 active:scale-95 transition-all duration-300"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Détails du Mode
          </span>
          <div className="w-9" />
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`bg-game-card rounded-2xl p-6 border ${modeDetails.borderColor} flex flex-col items-center text-center mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.45)]`}
        >
          <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center mb-4">
            <Icon className={`w-6 h-6 ${modeDetails.textColor}`} />
          </div>
          <span className={`text-[7px] uppercase font-bold tracking-[0.2em] px-3 py-1 bg-black/35 border border-white/5 rounded-md mb-4 ${modeDetails.textColor}`}>
            {modeDetails.tag}
          </span>
          <h1 className="text-xl font-bold uppercase tracking-wider mb-3">
            {modeDetails.name}
          </h1>
          <p className="text-[10px] text-game-muted leading-relaxed px-2 font-medium">
            {modeDetails.description}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-game-card border border-white/5 rounded-2xl p-5 mb-6"
        >
          <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-game-primary/80" />
            Règles & Conditions
          </h3>
          <ul className="space-y-3.5">
            {modeDetails.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start text-[10px] text-game-text leading-tight font-medium">
                <CheckCircle2 className="w-4 h-4 text-game-primary/80 shrink-0 mr-2.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3 z-10"
      >
        <button
          onClick={handleConfigureStart}
          className="w-full py-3.5 bg-game-primary text-game-bg rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#DBC19D] transition-all duration-300 shadow-[0_4px_12px_rgba(197,168,128,0.15)] cursor-pointer"
        >
          Configurer la Partie
        </button>
        <button
          onClick={handleRandomStart}
          className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] text-game-muted hover:text-game-text transition-all duration-300 cursor-pointer"
        >
          Lancer en Aléatoire
        </button>
      </motion.div>
    </div>
  );
};

export default ModeDetailScreen;
