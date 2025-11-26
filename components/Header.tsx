import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { 
  Home, 
  BookOpen, 
  LayoutGrid, 
  Briefcase, 
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'Início', value: View.HOME, icon: Home },
    { label: 'Sobre', value: View.ABOUT, icon: BookOpen },
    { label: 'Serviços', value: View.SERVICES, icon: LayoutGrid },
    { label: 'Vagas', value: View.CAREERS, icon: Briefcase },
    { label: 'Contato', value: View.CONTACT, icon: MessageCircle },
  ];

  return (
    <>
      {/* Top Brand Indicator (Minimalist) */}
      <div className="fixed top-6 left-6 z-40 mix-blend-difference text-white opacity-80 pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="font-serif-fluid font-bold tracking-widest text-sm uppercase">Bem Estar AI</span>
        </div>
      </div>

      {/* Dynamic Dock (Bottom Navigation) */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
        <div className="glass-dock px-3 py-3 rounded-full flex items-center gap-2 md:gap-3 scale-90 md:scale-100 origin-bottom">
          
          {navItems.map((item) => {
            const isActive = currentView === item.value;
            const Icon = item.icon;
            
            return (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`
                  relative group p-3 rounded-full transition-all duration-300 ease-out
                  flex items-center justify-center
                  ${isActive 
                    ? 'bg-black text-white shadow-lg scale-110' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-black hover:scale-110'}
                `}
              >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md pointer-events-none">
                  {item.label}
                </span>

                {/* Active Dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Header;