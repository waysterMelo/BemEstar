import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { Menu, X, Brain } from 'lucide-react';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', value: View.HOME },
    { label: 'Filosofia', value: View.ABOUT },
    { label: 'Serviços', value: View.SERVICES },
    { label: 'Vagas', value: View.CAREERS },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}>
      <div 
        className={`
          flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
          ${scrolled 
            ? 'bg-alabaster-100/70 backdrop-blur-xl shadow-lg border border-white/40 w-full max-w-5xl' 
            : 'bg-transparent w-full max-w-7xl'}
        `}
      >
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setView(View.HOME)}
        >
          <div className="bg-sage-100 p-2 rounded-full group-hover:bg-sage-300 transition-colors duration-500">
            <Brain className="h-5 w-5 text-sage-900" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-none tracking-tight text-sage-900">Bem Estar</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${currentView === item.value
                  ? 'bg-white/50 text-sage-900 shadow-sm'
                  : 'text-sage-700 hover:text-sage-900 hover:bg-white/20'}
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => handleNavClick(View.CONTACT)}
            className="
              px-6 py-2.5 rounded-full text-sm font-medium text-alabaster-50 
              bg-sage-900 hover:bg-sage-700 
              transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sage-900/10
            "
          >
            Agendar Consulta
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-black/5 text-sage-900"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-alabaster-100/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20 animate-reveal origin-top">
          <div className="flex flex-col space-y-2">
            {[...navItems, { label: 'Contato', value: View.CONTACT }].map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className="text-left px-4 py-3 rounded-xl text-sage-900 hover:bg-sage-100/50 transition-colors font-medium text-lg"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;