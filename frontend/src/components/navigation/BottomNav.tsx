import { NavLink } from 'react-router-dom';
import { Home, Compass, Trophy, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/explore', label: 'Explorer', icon: Compass },
    { path: '/leaderboard', label: 'Classement', icon: Trophy },
    { path: '/profile', label: 'Profil', icon: User },
    { path: '/settings', label: 'Réglages', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-game-card/90 backdrop-blur-lg border border-white/5 rounded-2xl py-2 px-3 shadow-2xl z-50 neon-glow-primary">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-game-secondary' : 'text-game-muted hover:text-game-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-glow"
                      className="absolute inset-0 bg-game-secondary/10 border border-game-secondary/20 rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5 z-10" />
                  <span className="text-[10px] mt-1 font-semibold tracking-wide z-10">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
