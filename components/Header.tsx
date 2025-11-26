import React, { useState } from 'react';
import { View } from '../types';
import { Menu, X, Brain } from 'lucide-react';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Início', value: View.HOME },
    { label: 'A Dra. Sônia', value: View.ABOUT },
    { label: 'Serviços', value: View.SERVICES },
    { label: 'Vagas', value: View.CAREERS },
    { label: 'Contato', value: View.CONTACT },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setView(View.HOME)}>
            <Brain className="h-8 w-8 text-brand-600" />
            <div className="ml-3 flex flex-col">
              <span className="text-xl font-bold text-gray-800 leading-none">Bem Estar</span>
              <span className="text-xs text-brand-600 font-medium tracking-wider uppercase">Psicologia & RH</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`${
                  currentView === item.value
                    ? 'text-brand-600 border-b-2 border-brand-600'
                    : 'text-gray-500 hover:text-brand-500 transition-colors'
                } px-1 py-2 text-sm font-medium h-full flex items-center`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(View.CONTACT)}
              className="bg-brand-600 text-white px-5 py-2 rounded-full hover:bg-brand-700 transition-colors text-sm font-medium shadow-sm"
            >
              Agendar / Contratar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-brand-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`${
                  currentView === item.value
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-50'
                } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
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