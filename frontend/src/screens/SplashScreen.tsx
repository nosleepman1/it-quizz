import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // If token exists, go to /home, otherwise to /login
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-full h-full bg-game-bg flex flex-col items-center justify-center z-50 font-sans">
      {/* Background radial glow */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-game-primary/5 blur-[90px]" />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center px-6 z-10"
      >
        {/* Pulsing Game Logo Icon */}
        <motion.div
          animate={{ 
            boxShadow: ['0 0 10px rgba(197, 168, 128, 0.05)', '0 0 25px rgba(197, 168, 128, 0.2)', '0 0 10px rgba(197, 168, 128, 0.05)'],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-game-primary/10 border border-game-primary/25 flex items-center justify-center text-game-primary mb-6"
        >
          <Terminal className="w-8 h-8" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl font-light tracking-[0.25em] text-game-text uppercase"
        >
          IT <span className="font-bold text-game-primary">QUIZZ</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[7.5px] font-bold tracking-[0.3em] text-game-muted uppercase mt-3"
        >
          L'arène des développeurs
        </motion.p>
      </motion.div>

      {/* Footer Loader */}
      <div className="absolute bottom-16 w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-1/2 bg-game-primary rounded-full"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
