import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getMockData } from '@/mocks/mockData';
import { 
  ArrowLeft, ArrowRight, Compass, ChevronRight, Play,
  FolderOpen, Server, Layers, Award
} from 'lucide-react';
import type { ThemeResponse } from '@/types/theme';
import type { CategoryResponse } from '@/types/category';
import type { SubcategoryResponse } from '@/types/SubCategory';
import type { ScopeLevel, BreadcrumbItem, SelectedScope } from '@/types/game';

const ScopeSelectionScreen = () => {
  const navigate = useNavigate();
  const setScope = useGameStore((state) => state.setScope);

  const mockThemes = getMockData();

  // Scope tracking states
  const [level, setLevel] = useState<ScopeLevel>('theme');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Active selections
  const [selectedTheme, setSelectedTheme] = useState<ThemeResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryResponse | null>(null);

  // Navigate back/forward slide settings
  const slideVariants: any = {
    initial: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  const handleBreadcrumbClick = (itemIndex: number) => {
    setDirection('backward');
    const target = breadcrumbs[itemIndex];
    const newBreadcrumbs = breadcrumbs.slice(0, itemIndex);
    setBreadcrumbs(newBreadcrumbs);
    setLevel(target.level);

    if (target.level === 'theme') {
      setSelectedTheme(null);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else if (target.level === 'category') {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else if (target.level === 'subcategory') {
      setSelectedSubcategory(null);
    }
  };

  const handlePlayHere = (id: string | number, label: string, currentLevel: ScopeLevel) => {
    // Build selection path for breadcrumb in the config screen
    const selectionBreadcrumbs = [...breadcrumbs];
    if (!selectionBreadcrumbs.find(b => b.id === id)) {
      selectionBreadcrumbs.push({ id, label, level: currentLevel });
    }

    const scope: SelectedScope = {
      level: currentLevel,
      id,
      label,
      breadcrumb: selectionBreadcrumbs
    };

    setScope(scope);
    navigate('/play/config');
  };

  const handleExploreTheme = (theme: ThemeResponse) => {
    setDirection('forward');
    setSelectedTheme(theme);
    setBreadcrumbs([{ id: theme.id, label: theme.name, level: 'theme' }]);
    setLevel('category');
  };

  const handleExploreCategory = (category: CategoryResponse) => {
    setDirection('forward');
    setSelectedCategory(category);
    setBreadcrumbs([
      breadcrumbs[0],
      { id: category.id, label: category.name, level: 'category' }
    ]);
    setLevel('subcategory');
  };

  const handleExploreSubcategory = (subcategory: SubcategoryResponse) => {
    setDirection('forward');
    setSelectedSubcategory(subcategory);
    setBreadcrumbs([
      breadcrumbs[0],
      breadcrumbs[1],
      { id: subcategory.id, label: subcategory.name, level: 'subcategory' }
    ]);
    setLevel('topic');
  };

  // Select icon based on level or custom slugs
  const getLevelIcon = (itemLevel: ScopeLevel) => {
    switch (itemLevel) {
      case 'theme': return FolderOpen;
      case 'category': return Server;
      case 'subcategory': return Layers;
      default: return Award;
    }
  };

  // Get active list items based on the drill down
  const getActiveList = () => {
    if (level === 'theme') return mockThemes;
    if (level === 'category' && selectedTheme) return selectedTheme.categories;
    if (level === 'subcategory' && selectedCategory) return selectedCategory.subcategories;
    if (level === 'topic' && selectedSubcategory) return selectedSubcategory.topics;
    return [];
  };

  const activeItems = getActiveList();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-8 flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Grid backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
           }} 
      />

      <div className="z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <button 
            onClick={() => {
              if (level === 'theme') {
                navigate(-1);
              } else {
                // Emulate back press in breadcrumbs
                handleBreadcrumbClick(breadcrumbs.length - 1);
              }
            }}
            className="w-9 h-9 rounded-lg bg-game-input border border-game-border flex items-center justify-center text-game-muted hover:text-game-text hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Choix du Scope
          </span>
          <div className="w-9" />
        </header>

        {/* Horizontal Scrollable Breadcrumb */}
        <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2.5 mb-5 border-b border-game-border whitespace-nowrap">
          <button
            onClick={() => {
              setDirection('backward');
              setLevel('theme');
              setBreadcrumbs([]);
              setSelectedTheme(null);
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
            className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border transition-all ${
              level === 'theme' 
                ? 'text-game-primary bg-game-primary/10 border-game-primary/20' 
                : 'text-game-muted hover:text-game-text border-transparent'
            }`}
          >
            Scope
          </button>
          
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1 && level === crumb.level;
            return (
              <div key={crumb.id} className="flex items-center gap-1.5 shrink-0">
                <ChevronRight className="w-3 h-3 text-white/20" />
                <button
                  onClick={() => handleBreadcrumbClick(idx)}
                  className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border truncate max-w-[80px] transition-all ${
                    isLast 
                      ? 'text-game-primary bg-game-primary/10 border-game-primary/20' 
                      : 'text-game-muted hover:text-game-text border-transparent'
                  }`}
                >
                  {crumb.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Level list transition block */}
        <div className="relative min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={level}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              {activeItems.map((item: any) => {
                const ItemIcon = getLevelIcon(level);
                return (
                  <div
                    key={item.id}
                    className="bg-game-card rounded-xl p-4 flex items-center justify-between border border-game-border shadow-md"
                  >
                    <div className="flex items-center gap-3.5 mr-2 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-game-input border border-game-border flex items-center justify-center text-game-primary shrink-0">
                        <ItemIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-[10px] font-bold text-game-text truncate leading-tight uppercase tracking-wide">
                          {item.name}
                        </h4>
                        <p className="text-[9px] text-game-muted leading-relaxed truncate mt-0.5 font-medium">
                          {item.description || 'Jouez ou explorez ce niveau'}
                        </p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-2 shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handlePlayHere(item.id, item.name, level)}
                        className="h-8 px-3.5 bg-game-primary/10 hover:bg-game-primary text-game-primary hover:text-game-bg border border-game-primary/20 rounded-lg text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-300 cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        Jouer
                      </motion.button>
                      
                      {level !== 'topic' && (
                        <button
                          onClick={() => {
                            if (level === 'theme') handleExploreTheme(item);
                            else if (level === 'category') handleExploreCategory(item);
                            else if (level === 'subcategory') handleExploreSubcategory(item);
                          }}
                          className="w-8 h-8 bg-game-input hover:bg-white/10 border border-game-border rounded-lg flex items-center justify-center text-game-muted hover:text-game-text transition-all duration-300 cursor-pointer"
                          aria-label="Explorer le niveau inférieur"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {activeItems.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <Compass className="w-10 h-10 text-game-muted mb-4 opacity-30 animate-pulse" />
                  <p className="text-xs font-bold text-game-muted">Vide</p>
                  <p className="text-[10px] text-game-muted/50 mt-1 font-medium">
                    Aucun élément disponible dans cette section.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ScopeSelectionScreen;
