import React, { useState } from 'react';
import { Sparkles, Send, User, Bot } from 'lucide-react';
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
    <div className="mt-6 bg-brand-50 rounded-xl p-6 border border-brand-100">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-brand-600 mr-2" />
        <h4 className="font-semibold text-brand-800">Assistente de Recrutamento IA</h4>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Tem dúvidas sobre a vaga de <strong>{jobTitle}</strong> ou quer dicas para seu currículo? Pergunte para nossa IA.
      </p>

      {response && (
        <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <Bot className="h-5 w-5 text-brand-500 mt-1 mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed">{response}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleAsk} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Que habilidades são essenciais para esta vaga?"
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none text-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-brand-600 text-white rounded-md hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
};

export default CareerAssistant;