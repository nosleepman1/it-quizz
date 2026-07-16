import { useState } from 'react';
import { motion } from 'framer-motion';
import { getMockData } from '@/mocks/mockData';
import BottomNav from '@/components/navigation/BottomNav';
import { Search, ChevronRight, FolderOpen, Tag, HelpCircle } from 'lucide-react';
import type { ThemeResponse } from '@/types/theme';

const ExploreScreen = () => {
  const themes = getMockData();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Count total questions in a theme
  const getQuestionCount = (theme: ThemeResponse) => {
    let count = 0;
    theme.categories.forEach(c => {
      c.subcategories.forEach(s => {
        s.topics.forEach(t => {
          count += t.questions.length;
        });
      });
    });
    return count;
  };

  // Extract flat list of topics matching search query
  const getFilteredTopics = () => {
    if (!searchQuery.trim()) return [];
    
    const results: Array<{
      themeName: string;
      categoryName: string;
      topicName: string;
      questionCount: number;
      description: string;
    }> = [];

    themes.forEach(t => {
      t.categories.forEach(c => {
        c.subcategories.forEach(s => {
          s.topics.forEach(tp => {
            if (
              tp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              results.push({
                themeName: t.name,
                categoryName: c.name,
                topicName: tp.name,
                questionCount: tp.questions.length,
                description: tp.description
              });
            }
          });
        });
      });
    });

    return results;
  };

  const filteredTopics = getFilteredTopics();
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-28 flex flex-col justify-between font-sans">
      {/* Grid pattern backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
           }} 
      />

      <div className="z-10">
        {/* Header */}
        <header className="mb-5">
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Bibliothèque IT
          </span>
          <h1 className="text-xl font-bold uppercase tracking-wider mt-1 text-game-text">
            Explorer les topics
          </h1>
        </header>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-game-muted/65" />
          <input
            type="text"
            placeholder="Rechercher (ex: React, ACID, Docker)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-game-input border border-game-border rounded-xl pl-11 pr-4 py-3 text-xs text-game-text placeholder-game-muted/30 outline-none transition-all duration-300 focus:border-game-primary/45 focus:shadow-[0_0_10px_rgba(197,168,128,0.06)]"
          />
        </div>

        {/* Display results */}
        {isSearching ? (
          <div className="space-y-3.5">
            <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted mb-2">
              Résultats de recherche ({filteredTopics.length})
            </h3>
            
            {filteredTopics.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-game-card rounded-xl p-4 border border-game-border shadow-md"
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className="text-[7px] uppercase font-bold tracking-wider px-2 py-0.5 bg-game-primary/10 border border-game-primary/20 rounded text-game-primary">
                    {topic.themeName} › {topic.categoryName}
                  </span>
                  <span className="text-[8px] font-mono text-game-muted font-bold flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-game-primary/80" />
                    {topic.questionCount} Questions
                  </span>
                </div>
                <h4 className="text-[10px] font-bold text-game-text mb-1 uppercase tracking-wide">
                  {topic.topicName}
                </h4>
                <p className="text-[9px] text-game-muted leading-relaxed font-medium">
                  {topic.description}
                </p>
              </motion.div>
            ))}

            {filteredTopics.length === 0 && (
              <div className="text-center py-16 text-game-muted">
                <Search className="w-8 h-8 mx-auto opacity-20 mb-3" />
                <p className="text-xs font-bold">Aucun topic trouvé</p>
                <p className="text-[9px] text-game-muted/50 mt-0.5">Essayez avec un autre mot-clé.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
              Thèmes Disponibles
            </h3>

            {themes.map((theme, idx) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-game-card rounded-xl p-4 border border-game-border hover:border-game-primary/20 transition-all duration-300 flex justify-between items-center group shadow-md"
              >
                <div className="flex items-center gap-3.5 mr-2 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-game-input border border-game-border flex items-center justify-center text-game-primary shrink-0">
                    <FolderOpen className="w-4.5 h-4.5 text-game-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-[10px] font-bold text-game-text truncate uppercase tracking-wide">
                      {theme.name}
                    </h4>
                    <p className="text-[9px] text-game-muted leading-relaxed truncate mt-0.5 font-medium">
                      {theme.description}
                    </p>
                    <span className="text-[8px] font-mono text-game-primary/80 font-bold inline-flex items-center gap-1 mt-1.5">
                      <Tag className="w-2.5 h-2.5" />
                      {getQuestionCount(theme)} Questions chargées
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-game-muted group-hover:text-game-text transition-colors duration-300">
                  <ChevronRight className="w-4.5 h-4.5" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default ExploreScreen;
