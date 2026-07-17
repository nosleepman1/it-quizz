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
    <div className="fixed inset-0 w-full h-full bg-game-bg flex flex-col items-center justify-center z-50">
      {/* Background radial glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-game-primary/10 blur-[80px]" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center text-center px-6"
      >
        {/* Pulsing Game Logo Icon */}
        <motion.div
          animate={{ 
            boxShadow: ['0 0 15px rgba(124, 58, 237, 0.4)', '0 0 30px rgba(124, 58, 237, 0.7)', '0 0 15px rgba(124, 58, 237, 0.4)'],
            scale: [1, 1.03, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-3xl bg-game-primary/25 border border-game-primary flex items-center justify-center text-game-text mb-6"
        >
          <Terminal className="w-10 h-10 text-game-text drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-black tracking-tight text-game-text uppercase"
        >
          IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-primary to-game-secondary">QUIZZ</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xs font-semibold tracking-[0.2em] text-game-muted uppercase mt-3"
        >
          L'arène des développeurs
        </motion.p>
      </motion.div>

      {/* Footer Loader */}
      <div className="absolute bottom-16 w-36 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-game-primary to-game-secondary rounded-full"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
