import React, { useState } from 'react';
import { Sparkles, Send, Bot } from 'lucide-react';
import { getCareerAdvice } from '../services/geminiService';

interface CareerAssistantProps {
  jobTitle: string;
}

const CareerAssistant: React.FC<CareerAssistantProps> = ({ jobTitle }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const aiResponse = await getCareerAdvice(jobTitle, query);
    setResponse(aiResponse);
    setLoading(false);
  };

  return (
    <div className="relative mt-8 group">
      {/* Glass Container */}
      <div className="absolute inset-0 bg-gradient-to-r from-sage-100/50 to-clay-100/50 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
      
      <div className="relative bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-300 to-sage-500 flex items-center justify-center shadow-lg shadow-sage-500/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-serif font-bold italic text-sage-900 text-lg">IA Career Guide</h4>
        </div>
        
        <p className="text-sm text-sage-700 mb-6 font-light">
          Esta vaga de <strong className="font-medium">{jobTitle}</strong> exige preparação. Use nossa inteligência para analisar seu fit cultural ou tirar dúvidas técnicas.
        </p>

        {response && (
          <div className="mb-6 animate-reveal">
            <div className="flex gap-4">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-white flex items-center justify-center border border-sage-100">
                <Bot className="h-4 w-4 text-sage-600" />
              </div>
              <div className="bg-white/60 p-4 rounded-2xl rounded-tl-none border border-white/50 text-sm text-sage-800 leading-relaxed shadow-sm">
                {response}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleAsk} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Como me destacar nesta entrevista?"
            className="w-full pl-5 pr-12 py-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:ring-1 focus:ring-sage-300 focus:border-sage-300 outline-none text-sage-900 placeholder-sage-400 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-sage-900 text-white rounded-lg hover:bg-sage-800 disabled:opacity-50 transition-all hover:scale-105 shadow-md"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareerAssistant;