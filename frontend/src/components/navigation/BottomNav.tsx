import { NavLink } from 'react-router-dom';
import { Home, Compass, Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/explore', label: 'Explorer', icon: Compass },
    { path: '/leaderboard', label: 'Ligue', icon: Trophy },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-game-card/80 backdrop-blur-xl border border-game-border rounded-2xl py-2 px-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50 select-none">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1.5 px-3.5 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-game-primary' : 'text-game-muted hover:text-game-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-glow"
                      className="absolute inset-0 bg-game-primary/10 border border-game-primary/20 rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <Icon className="w-4 h-4 z-10" />
                  <span className="text-[7.5px] mt-1 font-bold uppercase tracking-wider z-10">
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
