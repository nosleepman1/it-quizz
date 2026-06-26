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
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-28 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="mb-5">
          <span className="text-[10px] uppercase font-black tracking-widest text-game-muted">
            Bibliothèque IT
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1 text-game-text">
            Explorer les topics
          </h1>
        </header>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-game-muted" />
          <input
            type="text"
            placeholder="Rechercher (ex: React, ACID, Docker)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-xs font-bold placeholder-game-muted focus:outline-none focus:border-game-primary/60 transition-colors"
          />
        </div>

        {/* Display results */}
        {isSearching ? (
          <div className="space-y-3.5">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-game-muted mb-2">
              Résultats de recherche ({filteredTopics.length})
            </h3>
            
            {filteredTopics.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="game-glass-card rounded-2xl p-4 border border-white/5"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] uppercase font-black px-2 py-0.5 bg-game-secondary/10 border border-game-secondary/20 rounded-md text-game-secondary">
                    {topic.themeName} › {topic.categoryName}
                  </span>
                  <span className="text-[9px] font-mono text-game-muted font-bold flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-game-primary" />
                    {topic.questionCount} Questions
                  </span>
                </div>
                <h4 className="text-xs font-black text-game-text mb-1">
                  {topic.topicName}
                </h4>
                <p className="text-[10px] text-game-muted leading-tight">
                  {topic.description}
                </p>
              </motion.div>
            ))}

            {filteredTopics.length === 0 && (
              <div className="text-center py-16 text-game-muted">
                <Search className="w-10 h-10 mx-auto opacity-30 mb-3" />
                <p className="text-xs font-bold">Aucun topic trouvé</p>
                <p className="text-[10px] text-game-muted/65 mt-0.5">Essayez avec un autre mot-clé.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-game-muted">
              Thèmes Disponibles
            </h3>

            {themes.map((theme, idx) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="game-glass-card rounded-2xl p-4 border border-white/5 hover:border-game-primary/30 transition-all flex justify-between items-center"
              >
                <div className="flex items-center gap-3.5 mr-2 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-game-primary shrink-0">
                    <FolderOpen className="w-5 h-5 text-game-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-black text-game-text truncate">
                      {theme.name}
                    </h4>
                    <p className="text-[10px] text-game-muted leading-tight truncate mt-0.5">
                      {theme.description}
                    </p>
                    <span className="text-[9px] font-mono text-game-secondary font-bold inline-flex items-center gap-1 mt-1.5">
                      <Tag className="w-2.5 h-2.5" />
                      {getQuestionCount(theme)} Questions chargées
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-game-muted hover:text-game-text transition-colors">
                  <ChevronRight className="w-5 h-5" />
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
