import React, { useState, useEffect } from 'react';
import { View, JobPosition } from './types';
import Header from './components/Header';
import CareerAssistant from './components/CareerAssistant';
import { 
  Heart, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Brain,
  Building2,
  Search,
  X,
  Check,
  AlertCircle,
  Loader2,
  Users,
  Trophy,
  Calendar,
  Quote,
  ArrowUpRight
} from 'lucide-react';

// --- Mock Data ---
const JOBS: JobPosition[] = [
  {
    id: '1',
    title: 'Psicólogo(a) Clínico(a)',
    company: 'Bem Estar Psicologia',
    type: 'PJ / Autônomo',
    location: 'São Paulo, SP (Híbrido)',
    description: 'Procuramos profissional apaixonado pela abordagem TCC ou Psicanálise para integrar nossa equipe multidisciplinar.',
    requirements: ['CRP Ativo', 'Experiência mínima de 2 anos', 'Especialização concluída ou em andamento']
  },
  {
    id: '2',
    title: 'Analista de RH Sênior',
    company: 'Indústria Farmacêutica (Confidencial)',
    type: 'CLT',
    location: 'Guarulhos, SP',
    description: 'Grande indústria busca especialista em Treinamento & Desenvolvimento e Cultura Organizacional.',
    requirements: ['Inglês Avançado', 'Experiência em indústria', 'Vivência com implementação de cultura']
  },
  {
    id: '3',
    title: 'Assistente Administrativo',
    company: 'Logística Express',
    type: 'CLT',
    location: 'São Paulo, SP (Zona Sul)',
    description: 'Suporte administrativo operacional, controle de planilhas e atendimento a fornecedores.',
    requirements: ['Ensino Médio Completo', 'Excel Intermediário', 'Organização e proatividade']
  },
];

const SERVICES = [
  {
    title: "Psicoterapia Individual",
    desc: "Atendimento personalizado focado no autoconhecimento, tratamento de ansiedade e depressão.",
    icon: <UserIcon className="h-6 w-6" />
  },
  {
    title: "Recrutamento e Seleção",
    desc: "Soluções de R&S para empresas. Encontramos o talento ideal com avaliação psicológica inclusa.",
    icon: <Search className="h-6 w-6" />
  },
  {
    title: "Avaliação Psicológica",
    desc: "Laudos para cirurgias (bariátrica/vasectomia), admissional e concursos públicos.",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    title: "Terapia de Casal",
    desc: "Mediação e fortalecimento de vínculos para casais que buscam melhorar a relação.",
    icon: <Heart className="h-6 w-6" />
  },
  {
    title: "Consultoria de RH",
    desc: "Diagnóstico organizacional, pesquisa de clima e treinamento de lideranças.",
    icon: <Building2 className="h-6 w-6" />
  },
  {
    title: "Orientação Vocacional",
    desc: "Suporte para jovens e adultos em momentos de decisão ou transição de carreira.",
    icon: <Brain className="h-6 w-6" />
  }
];

// Helper icon component
function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}

// --- Components ---

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Agendamento de Psicoterapia',
    message: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validators = {
    name: (val: string) => val.length >= 3,
    email: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val: string) => val.length >= 10,
    message: (val: string) => val.length >= 5,
    interest: () => true
  };

  const isValid = (field: keyof typeof formData) => validators[field](formData[field]);
  
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.keys(formData).every(key => isValid(key as keyof typeof formData))) return;

    setIsSubmitting(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const getInputClass = (field: keyof typeof formData) => {
    const base = "w-full pl-4 pr-10 py-3 rounded-lg border outline-none transition-all duration-200";
    if (!touched[field]) return `${base} border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100`;
    return isValid(field) 
      ? `${base} border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-green-50/30`
      : `${base} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/30`;
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center animate-fade-in h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
        <p className="text-gray-600 mb-6">
          Obrigado pelo contato, <strong>{formData.name.split(' ')[0]}</strong>. Nossa equipe retornará em breve.
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setFormData({ name: '', email: '', phone: '', interest: 'Agendamento de Psicoterapia', message: '' }); setTouched({}); }}
          className="text-brand-600 font-semibold hover:text-brand-700 underline decoration-2 underline-offset-4"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600"></div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Envie sua mensagem</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Nome ou Empresa</label>
          <div className="relative">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              className={getInputClass('name')}
              placeholder="Seu nome completo" 
            />
            <div className="absolute right-3 top-3.5 pointer-events-none">
              {touched.name && isValid('name') && <Check className="w-5 h-5 text-green-500 animate-scale-in" />}
              {touched.name && !isValid('name') && <AlertCircle className="w-5 h-5 text-red-500 animate-scale-in" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">E-mail</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={getInputClass('email')}
                placeholder="seu@email.com" 
              />
              <div className="absolute right-3 top-3.5 pointer-events-none">
                {touched.email && isValid('email') && <Check className="w-5 h-5 text-green-500 animate-scale-in" />}
                {touched.email && !isValid('email') && <AlertCircle className="w-5 h-5 text-red-500 animate-scale-in" />}
              </div>
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Telefone</label>
            <div className="relative">
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                className={getInputClass('phone')}
                placeholder="(11) 99999-9999" 
              />
              <div className="absolute right-3 top-3.5 pointer-events-none">
                {touched.phone && isValid('phone') && <Check className="w-5 h-5 text-green-500 animate-scale-in" />}
                {touched.phone && !isValid('phone') && <AlertCircle className="w-5 h-5 text-red-500 animate-scale-in" />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Interesse</label>
          <div className="relative">
            <select 
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition bg-white appearance-none cursor-pointer hover:bg-gray-50"
            >
              <option>Agendamento de Psicoterapia</option>
              <option>Divulgar uma Vaga (Sou Empresa)</option>
              <option>Candidatura a Vaga (Sou Candidato)</option>
              <option>Outros Assuntos</option>
            </select>
            <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Mensagem</label>
          <textarea 
            name="message"
            rows={4} 
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur('message')}
            className={getInputClass('message')}
            placeholder="Como podemos ajudar?"
          ></textarea>
           <div className="absolute right-3 top-10 pointer-events-none">
              {touched.message && isValid('message') && <Check className="w-5 h-5 text-green-500 animate-scale-in" />}
           </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-brand-600 text-white font-bold py-4 rounded-lg hover:bg-brand-700 active:scale-[0.99] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...
            </>
          ) : (
            "Enviar Mensagem"
          )}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          Seus dados estão protegidos e serão usados apenas para este contato.
        </p>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const renderHome = () => (
    <div className="animate-fade-in bg-gray-50">
      {/* Hero Section Professional */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-50 rounded-full filter blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-2">
                <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse"></span>
                <span className="text-sm font-medium text-brand-800 uppercase tracking-wide">Excelência em Cuidado Humano</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Saúde Mental & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
                  Estratégia de RH
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                A <strong>Bem Estar</strong> integra a psicologia clínica ao mundo corporativo. Oferecemos acolhimento terapêutico especializado e soluções estratégicas de recrutamento para empresas que valorizam pessoas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setCurrentView(View.CONTACT)}
                  className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/30 flex items-center justify-center group"
                >
                  Agendar Atendimento
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setCurrentView(View.CAREERS)}
                  className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all hover:border-brand-300 flex items-center justify-center"
                >
                  Portal de Vagas
                </button>
              </div>

              <div className="pt-8 flex items-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mr-2" />
                  Atendimento Humanizado
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mr-2" />
                  Consultoria Especializada
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800" 
                  alt="Profissional em reunião" 
                  className="w-full h-[600px] object-cover"
                />
                {/* Floating Cards for Visual Interest */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg max-w-xs border border-gray-100 animate-fade-in-up">
                  <div className="flex items-start gap-3">
                    <div className="bg-brand-100 p-2 rounded-lg">
                      <Users className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Recrutamento Assertivo</p>
                      <p className="text-xs text-gray-500 mt-1">Encontramos o fit cultural ideal para sua empresa.</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg max-w-xs border border-gray-100 animate-fade-in-up delay-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Cuidado Clínico</p>
                      <p className="text-xs text-gray-500 mt-1">Terapia individual, casal e avaliações.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-brand-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-brand-900 text-white py-12 border-y border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-brand-800/50">
            <div>
              <div className="text-4xl font-bold mb-1">15+</div>
              <div className="text-brand-200 text-sm uppercase tracking-wider">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">5k+</div>
              <div className="text-brand-200 text-sm uppercase tracking-wider">Vidas Impactadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">200+</div>
              <div className="text-brand-200 text-sm uppercase tracking-wider">Empresas Parceiras</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">98%</div>
              <div className="text-brand-200 text-sm uppercase tracking-wider">Satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Section: Methodology */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Soluções Integradas</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Atuamos em duas frentes principais para garantir o bem-estar completo: saúde individual e ambiente corporativo saudável.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Clinical */}
            <div 
              onClick={() => setCurrentView(View.SERVICES)}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl cursor-pointer border border-gray-100 transition-all hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain className="w-48 h-48 text-brand-600" />
              </div>
              <div className="p-10 relative z-10">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-8 text-brand-600 shadow-sm">
                  <UserIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Você e Sua Família</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Atendimento clínico com profissionais especializados. Foco em TCC, Psicanálise e Avaliações Neuropsicológicas. Cuidamos de ansiedade, depressão e conflitos de relacionamento.
                </p>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-brand-500 mr-2"/> Psicoterapia Individual</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-brand-500 mr-2"/> Terapia de Casal</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-brand-500 mr-2"/> Orientação Vocacional</li>
                </ul>
                <span className="text-brand-600 font-bold flex items-center group-hover:translate-x-2 transition-transform">
                  Conhecer Serviços Clínicos <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Card 2: Corporate */}
            <div 
              onClick={() => setCurrentView(View.CONTACT)}
              className="group relative overflow-hidden rounded-3xl bg-gray-900 shadow-xl cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Building2 className="w-48 h-48 text-white" />
              </div>
              <div className="p-10 relative z-10">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-8 text-white shadow-sm">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Para Sua Empresa</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Transforme seu RH. Atuamos como Headhunters para vagas estratégicas e oferecemos consultoria para melhorar o clima organizacional e a saúde mental dos colaboradores.
                </p>
                <ul className="space-y-3 mb-8 text-gray-300">
                  <li className="flex items-center"><Check className="w-4 h-4 text-brand-400 mr-2"/> Recrutamento & Seleção</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-brand-400 mr-2"/> Avaliação Psicológica Admissional</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-brand-400 mr-2"/> Treinamentos Corporativos</li>
                </ul>
                <span className="text-white font-bold flex items-center group-hover:translate-x-2 transition-transform">
                  Soluções para Empresas <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Excelência Técnica</h3>
              <p className="text-gray-600 leading-relaxed">
                Nossa equipe é formada exclusivamente por psicólogos com pós-graduação e vivência prática em grandes organizações.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Agilidade e Foco</h3>
              <p className="text-gray-600 leading-relaxed">
                Processos de seleção ágeis sem perder a qualidade. Para pacientes, facilidade de agendamento e acolhimento imediato.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Abordagem Humanizada</h3>
              <p className="text-gray-600 leading-relaxed">
                Acreditamos que atrás de cada CPF ou CNPJ existem pessoas. Tratamos cada história com a singularidade que ela merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-brand-800 rounded-3xl p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-brand-700/50">
            <div className="lg:w-1/2 space-y-6">
              <Quote className="w-12 h-12 text-brand-400 opacity-50" />
              <h2 className="text-3xl font-bold text-white">
                "A parceria com a Bem Estar mudou a dinâmica da nossa equipe. Contratações mais assertivas e um time muito mais saudável."
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 font-bold">
                  MR
                </div>
                <div>
                  <p className="text-white font-bold">Mariana Rocha</p>
                  <p className="text-brand-300 text-sm">Diretora de RH, TechSolutions</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Pronto para começar?</h3>
              <p className="text-brand-100 mb-8">Agende uma consulta ou solicite uma proposta para sua empresa hoje mesmo.</p>
              <button 
                onClick={() => setCurrentView(View.CONTACT)}
                className="w-full bg-white text-brand-900 font-bold py-4 rounded-xl hover:bg-brand-50 transition flex items-center justify-center"
              >
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <section className="py-20 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-brand-600 transform translate-x-4 translate-y-4 rounded-2xl"></div>
            <img 
              src="https://picsum.photos/600/800?woman" 
              alt="Dra. Sônia" 
              className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dra. Sônia</h2>
            <h3 className="text-xl text-brand-600 font-medium mb-6">Psicóloga Clínica & Consultora de Carreira</h3>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Com mais de 15 anos de experiência, a Dra. Sônia une a psicologia clínica à expertise em Recursos Humanos.
              </p>
              <p>
                Fundadora da Bem Estar, ela lidera uma equipe que cuida da saúde mental de pacientes e auxilia empresas a encontrarem os melhores profissionais, garantindo que a saúde emocional seja um pilar também no ambiente corporativo.
              </p>
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex items-center">
                    <CheckCircle2 className="text-brand-500 mr-2 h-5 w-5"/>
                    <span>Psicologia Clínica</span>
                 </div>
                 <div className="flex items-center">
                    <CheckCircle2 className="text-brand-500 mr-2 h-5 w-5"/>
                    <span>Headhunter</span>
                 </div>
                 <div className="flex items-center">
                    <CheckCircle2 className="text-brand-500 mr-2 h-5 w-5"/>
                    <span>Avaliação Psicológica</span>
                 </div>
                 <div className="flex items-center">
                    <CheckCircle2 className="text-brand-500 mr-2 h-5 w-5"/>
                    <span>Mentoria de Carreira</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderServices = () => (
    <section className="py-20 bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Soluções integradas para saúde mental e gestão de pessoas. Atendemos indivíduos e empresas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {service.desc}
              </p>
              <button onClick={() => setCurrentView(View.CONTACT)} className="text-brand-600 font-medium hover:text-brand-700 inline-flex items-center mt-auto">
                Saiba mais <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCareers = () => {
    // Filter logic
    const filteredJobs = JOBS.filter(job => {
      const term = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
      );
    });

    return (
      <section className="py-20 bg-white animate-fade-in min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold">Recrutamento</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">Portal de Oportunidades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A Bem Estar seleciona talentos para diversas empresas parceiras. 
              Encontre sua próxima oportunidade profissional aqui.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10 relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por cargo, empresa ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition text-gray-700 placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Ex: "Psicólogo", "São Paulo", "Administrativo"
            </p>
          </div>

          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className={`border rounded-xl overflow-hidden transition-all duration-300 ${expandedJob === job.id ? 'border-brand-200 ring-2 ring-brand-100 shadow-lg' : 'border-gray-200 hover:border-brand-200'}`}>
                  <div 
                    className="p-6 cursor-pointer bg-white flex flex-col md:flex-row md:items-start justify-between"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2 md:mb-0 md:float-right md:ml-4">
                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${expandedJob === job.id ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600'}`}>
                            {expandedJob === job.id ? 'Visualizando' : 'Clique para ver'}
                         </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <p className="text-brand-600 font-semibold text-sm mt-1 flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {job.company}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Briefcase className="w-3 h-3 mr-1"/> {job.type}</span>
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><MapPin className="w-3 h-3 mr-1"/> {job.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedJob === job.id && (
                    <div className="px-6 pb-6 bg-white border-t border-gray-100">
                      <div className="py-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Descrição da Vaga:</h4>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">Requisitos:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                          <button className="flex-1 bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition text-center shadow-sm">
                            Candidatar-se para esta Vaga
                          </button>
                          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition text-center">
                            Compartilhar
                          </button>
                        </div>

                        {/* Gemini Integration */}
                        <div className="border-t border-gray-100 pt-6">
                          <CareerAssistant jobTitle={`${job.title} na empresa ${job.company}`} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Nenhuma vaga encontrada</h3>
                <p className="text-gray-500 mt-2">Tente buscar por outros termos ou veja todas as oportunidades limpando a busca.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-brand-600 font-medium hover:underline"
                >
                  Limpar busca
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sou Candidato</h3>
                  <p className="text-gray-600 mb-4">Não achou a vaga ideal? Deixe seu currículo em nosso banco de talentos geral.</p>
                  <button className="text-brand-600 font-bold hover:underline flex items-center">
                      Cadastrar Currículo <ArrowRight className="w-4 h-4 ml-1"/>
                  </button>
              </div>
              <div className="p-8 bg-brand-50 rounded-2xl border border-brand-100">
                  <h3 className="text-lg font-semibold text-brand-900 mb-2">Sou Empresa</h3>
                  <p className="text-brand-700 mb-4">Precisa contratar? Deixe a Bem Estar cuidar do seu processo seletivo.</p>
                  <button onClick={() => setCurrentView(View.CONTACT)} className="text-brand-600 font-bold hover:underline flex items-center">
                      Falar com Consultor <ArrowRight className="w-4 h-4 ml-1"/>
                  </button>
              </div>
          </div>
        </div>
      </section>
    );
  };

  const renderContact = () => (
    <section className="py-20 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fale Conosco</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Seja para cuidar da sua saúde mental ou para contratar nossos serviços de recrutamento, estamos à disposição.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-lg">
                   <Phone className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Telefone / WhatsApp</h3>
                  <p className="text-gray-600">(11) 99999-9999</p>
                  <p className="text-gray-500 text-sm">Seg a Sex, das 8h às 19h</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-lg">
                   <Mail className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">E-mail</h3>
                  <p className="text-gray-600">contato@bemestarpsicologia.com.br</p>
                  <p className="text-gray-600">recrutamento@bemestarpsicologia.com.br</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-100 p-3 rounded-lg">
                   <MapPin className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Endereço</h3>
                  <p className="text-gray-600">Av. Paulista, 1000 - Sala 42</p>
                  <p className="text-gray-600">Bela Vista, São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {currentView === View.HOME && renderHome()}
        {currentView === View.ABOUT && renderAbout()}
        {currentView === View.SERVICES && renderServices()}
        {currentView === View.CAREERS && renderCareers()}
        {currentView === View.CONTACT && renderContact()}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-white mb-4">
              <Brain className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">Bem Estar</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Excelência em Psicologia Clínica e soluções estratégicas de Recrutamento & Seleção para conectar pessoas e empresas.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.HOME)}>Início</li>
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.ABOUT)}>Sobre Nós</li>
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.SERVICES)}>Serviços</li>
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.CAREERS)}>Portal de Vagas</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Áreas</h4>
            <ul className="space-y-2">
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.CONTACT)}>Para Pacientes</li>
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.CAREERS)}>Para Candidatos</li>
              <li className="hover:text-brand-400 cursor-pointer" onClick={() => setCurrentView(View.CONTACT)}>Para Empresas</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;