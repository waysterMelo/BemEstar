import React, { useState, useEffect } from 'react';
import { View, JobPosition } from './types';
import Header from './components/Header';
import CareerAssistant from './components/CareerAssistant';
import { 
  Heart, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  Brain,
  Search,
  Check,
  Loader2,
  Users,
  Leaf,
  ArrowUpRight,
  Globe,
  DollarSign,
  ChevronLeft,
  GraduationCap,
  Award,
  UploadCloud,
  Layers,
  Sparkles,
  Zap,
  Activity,
  Dna
} from 'lucide-react';

// --- Types & Data ---
// (Mantendo os dados originais, mas a estrutura visual será nova)
const JOBS: JobPosition[] = [
  {
    id: '1',
    title: 'Psicólogo(a) Clínico(a)',
    company: 'Bem Estar Interno',
    type: 'PJ / Autônomo',
    location: 'São Paulo, SP (Híbrido)',
    description: 'Procuramos profissional apaixonado pela abordagem TCC ou Psicanálise para integrar nossa equipe clínica multidisciplinar.',
    requirements: ['CRP Ativo e regularizado', 'Experiência clínica mínima de 2 anos', 'Pós-graduação em andamento ou concluída'],
    responsibilities: ['Realizar atendimentos psicoterapêuticos individuais.', 'Participar de reuniões de supervisão clínica quinzenais.'],
    benefits: ['Supervisão Clínica Inclusa', 'Sistema de Gestão de Pacientes', 'Infraestrutura de alto padrão'],
    salary: 'Comissionamento Progressivo'
  },
  {
    id: '2',
    title: 'Head of People',
    company: 'TechCorp',
    type: 'CLT',
    location: 'Remoto',
    description: 'Liderar a estratégia de cultura e desenvolvimento organizacional de uma startup em hipercrescimento.',
    requirements: ['Inglês Fluente', 'Experiência em Scale-ups', 'Vivência com PDI'],
    responsibilities: ['Estruturar a área de People & Culture.', 'Desenhar jornada do colaborador.'],
    benefits: ['Stock Options', 'Saúde Bradesco', 'Auxílio Remoto'],
    salary: 'R$ 25k - R$ 30k'
  },
  {
    id: '3',
    title: 'Analista de R&S Sênior',
    company: 'Pharma Global',
    type: 'Híbrido',
    location: 'Guarulhos, SP',
    description: 'Condução de processos seletivos end-to-end para posições técnicas.',
    requirements: ['Superior Completo', 'Experiência em Pharma', 'LinkedIn Recruiter'],
    responsibilities: ['Alinhamento de perfil internacional.', 'Hunting ativo.'],
    benefits: ['PLR Agressiva', 'Fretado', 'Previdência'],
    salary: 'A combinar'
  },
];

// --- New Components ---

// 1. Membrane Card: Organic, glass-like, breathing
const MembraneCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}> = ({ children, className = '', onClick, hoverEffect = true }) => (
  <div 
    onClick={onClick}
    className={`
      glass-membrane rounded-[2rem] p-8 relative overflow-hidden transition-all duration-500
      ${hoverEffect ? 'hover:shadow-2xl hover:shadow-iridescent-middle/20 hover:-translate-y-1 cursor-pointer group' : ''}
      ${className}
    `}
  >
    {hoverEffect && (
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-iridescent-start to-iridescent-end opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

// 2. Liquid Button: Modern, rounded, smooth
const LiquidButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-2
      active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
      ${variant === 'primary' 
        ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl' 
        : 'bg-white/50 border border-white/60 text-gray-900 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-md'}
      ${className}
    `}
  >
    {children}
  </button>
);

// 3. Section Header: Minimalist and large
const SectionHeader = ({ label, title }: { label: string, title: string }) => (
  <div className="mb-16 animate-scale-in">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-biolum-cyan animate-pulse"></div>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">{label}</span>
    </div>
    <h2 className="font-serif-fluid text-5xl md:text-6xl text-gray-900 leading-[0.9] tracking-tight">
      {title}
    </h2>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // --- Views ---

  const renderHome = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-iridescent-start/40 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-iridescent-middle/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-iridescent-end/30 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 lg:pt-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm animate-scale-in">
              <Activity className="w-4 h-4 text-biolum-purple" />
              <span className="text-xs font-bold tracking-widest uppercase text-gray-600">Biomimetic Intelligence</span>
            </div>
            
            <h1 className="font-serif-fluid text-7xl md:text-8xl lg:text-9xl text-pearl-900 leading-[0.85] tracking-tight animate-scale-in origin-left">
              Organismo <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 italic pr-4">Digital</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-xl leading-relaxed animate-scale-in animation-delay-200">
              Conectamos a complexidade biológica da mente humana com a precisão estrutural da carreira.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 animate-scale-in animation-delay-400">
              <LiquidButton onClick={() => setCurrentView(View.CONTACT)}>
                Iniciar Sincronização <ArrowRight className="w-4 h-4" />
              </LiquidButton>
              <LiquidButton variant="secondary" onClick={() => setCurrentView(View.SERVICES)}>
                Explorar Ecossistema
              </LiquidButton>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[500px] hidden lg:block perspective-1000">
             {/* 3D Floating Elements */}
             <div className="absolute top-10 right-10 w-72 h-80 glass-membrane rounded-[3rem] animate-float-slow z-20 flex flex-col justify-between p-8 overflow-hidden group border-white/40">
                {/* Background Image: Strong Abstract Fluid (Purple/Blue) */}
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600" 
                  alt="Abstract Fluid" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-700 mix-blend-overlay z-0 filter contrast-125"
                />
                
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-4 shadow-lg shadow-biolum-purple/20">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-serif-fluid italic text-gray-900 mb-1 drop-shadow-sm">Equilíbrio</div>
                  <div className="text-sm text-gray-700 font-bold font-mono uppercase tracking-wider">Bio-Psíquico</div>
                </div>
                
                {/* Abstract Bio-Rhythm Visualization */}
                <div className="relative z-10 flex items-end justify-between h-12 w-full px-2">
                   {[40, 70, 45, 90, 60, 80, 50, 75].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-gradient-to-t from-biolum-cyan to-white rounded-full animate-pulse shadow-sm" 
                        style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                      ></div>
                   ))}
                </div>
             </div>

             <div className="absolute bottom-10 left-0 w-64 h-64 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full shadow-2xl animate-float-slow animation-delay-2000 z-10 flex items-center justify-center overflow-hidden group">
                {/* Background Image: Strong Light Particles/Bokeh */}
                <img 
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600" 
                  alt="Abstract Light" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-700 mix-blend-hard-light z-0"
                />
                <div className="text-center relative z-10">
                   <div className="absolute -inset-8 bg-white/30 blur-xl rounded-full animate-pulse"></div>
                   <div className="relative text-5xl font-serif-fluid italic text-gray-900 drop-shadow-md">2.5k+</div>
                   <div className="relative text-xs font-mono text-gray-800 font-bold mt-2 tracking-widest uppercase">Vidas<br/>Transformadas</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Cellular Grid Teaser */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Vibrant Gradient Card - Redesigned (Vitality Portal v3) */}
           <MembraneCard className="md:col-span-2 overflow-hidden group relative min-h-[350px]" onClick={() => setCurrentView(View.SERVICES)}>
              {/* Strong Deep Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-700 to-cyan-600 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 z-0"></div>
              
              {/* Noise Overlay for texture */}
              <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay z-0"></div>

              <div className="relative z-10 flex flex-col h-full justify-between p-4">
                 <div className="flex justify-between items-start">
                    <span className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg flex items-center justify-center">
                      <Dna className="w-6 h-6 text-white"/>
                    </span>
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/20">
                      <ArrowUpRight className="w-5 h-5 text-white hover:text-black" />
                    </div>
                 </div>
                 
                 <div className="space-y-4 max-w-xl">
                    <h3 className="font-serif-fluid text-5xl text-white drop-shadow-lg leading-none tracking-tight">
                      Psicologia <br/>
                      <span className="italic opacity-90">Integrativa</span>
                    </h3>
                    
                    {/* Glass Strip */}
                    <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2">
                      <p className="text-white font-medium text-base tracking-wide">
                         Neurociência • Corpo • Comportamento
                      </p>
                    </div>
                 </div>
              </div>
           </MembraneCard>
           
           <MembraneCard className="bg-black text-white group" onClick={() => setCurrentView(View.CAREERS)}>
              {/* Background Image: Tech/Data Network */}
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" 
                alt="Data Network" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 z-0"
              />
              <div className="absolute inset-0 bg-noise opacity-20"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                 <Layers className="w-8 h-8 text-biolum-cyan" />
                 <div>
                    <h3 className="font-serif-fluid text-3xl text-white mb-2">Vagas & <br/><span className="italic text-biolum-cyan">Oportunidades</span></h3>
                    <p className="text-gray-400 text-sm mt-4 group-hover:text-white transition-colors">Acesse nosso banco de talentos > </p>
                 </div>
              </div>
           </MembraneCard>
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="min-h-screen pt-32 pb-32 px-6 relative">
       <div className="max-w-7xl mx-auto">
          <SectionHeader label="Ecossistema" title="Módulos de Atuação" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
             {/* Clinical Module */}
             <div className="space-y-6">
                <div className="sticky top-8 z-10 bg-pearl-50/80 backdrop-blur-md py-4 border-b border-gray-200 mb-8">
                   <h3 className="font-mono text-xl text-gray-900 uppercase tracking-widest flex items-center gap-3">
                     <span className="w-3 h-3 bg-biolum-lime rounded-full"></span> Clínica
                   </h3>
                </div>
                
                <MembraneCard className="bg-white">
                   <div className="w-12 h-12 rounded-full bg-pearl-100 flex items-center justify-center mb-6 text-gray-900">
                     <Heart className="w-5 h-5" />
                   </div>
                   <h4 className="font-serif-fluid text-3xl text-gray-900 mb-3">Terapia Individual</h4>
                   <p className="text-gray-600 leading-relaxed">
                     Reconectar sinapses emocionais. Um ambiente estéril de julgamentos e fértil para o crescimento.
                   </p>
                </MembraneCard>

                <MembraneCard className="bg-white">
                   <div className="w-12 h-12 rounded-full bg-pearl-100 flex items-center justify-center mb-6 text-gray-900">
                     <Users className="w-5 h-5" />
                   </div>
                   <h4 className="font-serif-fluid text-3xl text-gray-900 mb-3">Dinâmica de Casal</h4>
                   <p className="text-gray-600 leading-relaxed">
                     Reprogramação da comunicação e alinhamento de expectativas relacionais.
                   </p>
                </MembraneCard>
             </div>

             {/* Corporate Module */}
             <div className="space-y-6">
                <div className="sticky top-8 z-10 bg-pearl-50/80 backdrop-blur-md py-4 border-b border-gray-200 mb-8">
                   <h3 className="font-mono text-xl text-gray-900 uppercase tracking-widest flex items-center gap-3">
                     <span className="w-3 h-3 bg-biolum-purple rounded-full"></span> Corporativo
                   </h3>
                </div>

                <MembraneCard className="bg-white">
                   <div className="w-12 h-12 rounded-full bg-pearl-100 flex items-center justify-center mb-6 text-gray-900">
                     <Search className="w-5 h-5" />
                   </div>
                   <h4 className="font-serif-fluid text-3xl text-gray-900 mb-3">Hunting Estratégico</h4>
                   <p className="text-gray-600 leading-relaxed">
                     Identificação de talentos através de análise de fit cultural e competências técnicas profundas.
                   </p>
                </MembraneCard>

                <MembraneCard className="bg-white">
                   <div className="w-12 h-12 rounded-full bg-pearl-100 flex items-center justify-center mb-6 text-gray-900">
                     <Zap className="w-5 h-5" />
                   </div>
                   <h4 className="font-serif-fluid text-3xl text-gray-900 mb-3">Workshops de Liderança</h4>
                   <p className="text-gray-600 leading-relaxed">
                     Treinamento de soft-skills e gestão de inteligência emocional para líderes do futuro.
                   </p>
                </MembraneCard>
             </div>
          </div>
       </div>
    </div>
  );

  const renderCareers = () => {
    // Detail View
    if (selectedJobId) {
      const job = JOBS.find(j => j.id === selectedJobId);
      if (!job) return null;

      return (
        <div className="min-h-screen pt-32 pb-32 px-6">
           <div className="max-w-6xl mx-auto">
              <button 
                onClick={() => setSelectedJobId(null)} 
                className="group flex items-center gap-2 text-gray-500 hover:text-black mb-12 transition-colors font-mono text-sm uppercase tracking-wider"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar à Matriz
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <div className="lg:col-span-2">
                    <div className="glass-membrane p-10 rounded-[2.5rem] mb-8">
                       <div className="flex flex-wrap gap-3 mb-6">
                          <span className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-mono">{job.type}</span>
                          <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-mono">{job.location}</span>
                       </div>
                       
                       <h1 className="font-serif-fluid text-5xl md:text-6xl text-gray-900 mb-4">{job.title}</h1>
                       <div className="flex items-center gap-2 text-gray-500 font-mono text-sm uppercase">
                          <Briefcase className="w-4 h-4" /> {job.company}
                       </div>

                       <div className="h-px w-full bg-gradient-to-r from-gray-200 to-transparent my-10"></div>

                       <div className="space-y-10">
                          <section>
                            <h3 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-4">Descrição</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">{job.description}</p>
                          </section>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <section>
                                <h3 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-4">Requisitos</h3>
                                <ul className="space-y-3">
                                  {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-biolum-purple flex-shrink-0"></div>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                             </section>
                             <section>
                                <h3 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-4">Benefícios</h3>
                                <div className="flex flex-wrap gap-2">
                                  {job.benefits?.map((ben, i) => (
                                    <span key={i} className="px-3 py-1 bg-pearl-100 rounded-lg text-sm text-gray-600">{ben}</span>
                                  ))}
                                </div>
                             </section>
                          </div>
                       </div>
                    </div>
                    
                    <CareerAssistant jobTitle={job.title} />
                 </div>

                 <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-black text-white p-8 rounded-[2rem] shadow-2xl">
                       <h3 className="font-serif-fluid text-3xl mb-2">Interesse?</h3>
                       <p className="text-gray-400 text-sm mb-8">Envie seus dados para análise de compatibilidade.</p>
                       
                       <form className="space-y-4">
                          <input type="text" placeholder="Nome Completo" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/20" />
                          <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/20" />
                          <button className="w-full bg-white text-black font-medium py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4">
                            Aplicar Agora
                          </button>
                       </form>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
    }

    // List View
    return (
      <div className="min-h-screen pt-32 pb-32 px-6">
         <div className="max-w-5xl mx-auto">
            <SectionHeader label="Oportunidades" title="Banco de Talentos" />

            <div className="grid gap-6">
               {JOBS.map((job) => (
                 <div 
                   key={job.id}
                   onClick={() => setSelectedJobId(job.id)}
                   className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-iridescent-middle/10 transition-all duration-500 cursor-pointer overflow-hidden"
                 >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-iridescent-start via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                       <div>
                          <h3 className="font-serif-fluid text-3xl text-gray-900 group-hover:text-biolum-purple transition-colors mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-mono">
                             <span className="flex items-center gap-1"><Briefcase className="w-3 h-3"/> {job.company}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                             <span>{job.location}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                             <span className="text-biolum-cyan">{job.type}</span>
                          </div>
                       </div>
                       <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="min-h-screen flex items-center justify-center px-6 py-32 relative">
       <div className="max-w-4xl w-full relative z-10">
          <div className="text-center mb-16">
             <div className="inline-block p-4 rounded-full bg-white shadow-sm mb-6 animate-float-slow">
                <Sparkles className="w-8 h-8 text-iridescent-middle" />
             </div>
             <h1 className="font-serif-fluid text-6xl md:text-7xl text-gray-900 mb-6">Iniciar Conexão</h1>
             <p className="text-xl text-gray-600 font-light">Selecione o canal de comunicação para sua necessidade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <MembraneCard className="bg-white hover:bg-black hover:text-white group transition-colors duration-500 text-center">
                <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-pearl-100 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                   <Heart className="w-6 h-6 text-gray-900 group-hover:text-white" />
                </div>
                <h3 className="font-serif-fluid text-3xl mb-2">Paciente</h3>
                <p className="text-sm opacity-70 mb-8">Para agendamento de terapia.</p>
                <button className="w-full py-3 rounded-xl border border-gray-200 group-hover:border-gray-700">WhatsApp Clínica</button>
             </MembraneCard>

             <MembraneCard className="bg-white hover:bg-black hover:text-white group transition-colors duration-500 text-center">
                <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-pearl-100 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                   <Briefcase className="w-6 h-6 text-gray-900 group-hover:text-white" />
                </div>
                <h3 className="font-serif-fluid text-3xl mb-2">Empresa</h3>
                <p className="text-sm opacity-70 mb-8">Para propostas de consultoria.</p>
                <button className="w-full py-3 rounded-xl border border-gray-200 group-hover:border-gray-700">Falar com Consultor</button>
             </MembraneCard>
          </div>
       </div>
    </div>
  );

  const renderAbout = () => (
     <div className="min-h-screen pt-32 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative">
              <div className="absolute inset-0 bg-iridescent-middle/20 blur-3xl rounded-full"></div>
              <div className="relative glass-membrane rounded-[3rem] overflow-hidden aspect-[4/5]">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Founder" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000" />
              </div>
           </div>
           
           <div className="space-y-8">
              <SectionHeader label="Fundadora" title="Dra. Helena Vaz" />
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                "Não existe separação entre quem somos e o que fazemos. A Bem Estar nasceu para integrar essas duas metades, criando um organismo social saudável."
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <GraduationCap className="w-8 h-8 text-biolum-purple mb-4" />
                    <div className="font-serif-fluid text-2xl">Mestrado USP</div>
                    <div className="text-xs font-mono text-gray-500 mt-1">NEUROCIÊNCIA</div>
                 </div>
                 <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <Award className="w-8 h-8 text-biolum-cyan mb-4" />
                    <div className="font-serif-fluid text-2xl">MBA FGV</div>
                    <div className="text-xs font-mono text-gray-500 mt-1">GESTÃO ESTRATÉGICA</div>
                 </div>
              </div>
           </div>
        </div>
     </div>
  );

  return (
    <div className="relative min-h-screen bg-pearl-50 text-gray-900 selection:bg-biolum-purple selection:text-white">
      <Header currentView={currentView} setView={(v) => { setCurrentView(v); setSelectedJobId(null); window.scrollTo(0,0); }} />
      
      <main className="pb-24">
        {currentView === View.HOME && renderHome()}
        {currentView === View.SERVICES && renderServices()}
        {currentView === View.CAREERS && renderCareers()}
        {currentView === View.CONTACT && renderContact()}
        {currentView === View.ABOUT && renderAbout()}
      </main>
    </div>
  );
};

export default App;