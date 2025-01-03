import { useEffect } from 'react';
import AppRoutes from "./routes/appRoutes";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') || 'system';
    const html = document.documentElement;
    
    html.classList.remove('theme-blue', 'theme-white', 'dark');
    
    if (savedTheme === 'blue') {
      html.classList.add('theme-blue', 'dark');
    } else if (savedTheme === 'white') {
      html.classList.add('theme-white');
    } else {
      html.classList.add('dark');
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#07070a] flex items-center justify-center md:py-8">
      {/* Immersive mobile container wrapper on desktop, full-screen on mobile */}
      <div className="w-full min-h-screen md:min-h-[812px] md:max-w-[375px] md:h-[812px] md:rounded-[36px] md:border-[8px] md:border-white/5 md:shadow-2xl md:relative md:overflow-hidden bg-game-bg">
        <AppRoutes />
      </div>
      <Toaster position="bottom-right" richColors />
    </main>
  );
};

export default App;