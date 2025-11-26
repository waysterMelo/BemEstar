import React, { useState } from 'react';
import { View, JobPosition } from './types';
import Header from './components/Header';
import CareerAssistant from './components/CareerAssistant';
import { 
  Heart, 
  Briefcase, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  Brain,
  Building2,
  Search,
  Check,
  Loader2,
  Users,
  Leaf,
  ArrowUpRight,
  Globe,
  Clock,
  DollarSign,
  ChevronLeft,
  GraduationCap,
  Award,
  UploadCloud,
  Quote
} from 'lucide-react';

// --- Mock Data Expanded ---
const JOBS: JobPosition[] = [
  {
    id: '1',
    title: 'Psicólogo(a) Clínico(a)',
    company: 'Bem Estar Interno',
    type: 'PJ / Autônomo',
    location: 'São Paulo, SP (Híbrido)',
    description: 'Procuramos profissional apaixonado pela abordagem TCC ou Psicanálise para integrar nossa equipe clínica multidisciplinar.',
    requirements: [
      'CRP Ativo e regularizado', 
      'Experiência clínica mínima de 2 anos', 
      'Pós-graduação em andamento ou concluída',
      'Disponibilidade para atendimentos noturnos (pelo menos 1 dia)'
    ],
    responsibilities: [
      'Realizar atendimentos psicoterapêuticos individuais.',
      'Participar de reuniões de supervisão clínica quinzenais.',
      'Elaborar prontuários e documentos psicológicos conforme normas do CFP.'
    ],
    benefits: [
      'Supervisão Clínica Inclusa',
      'Sistema de Gestão de Pacientes',
      'Infraestrutura de alto padrão nos Jardins',
      'Divulgação e Marketing Pessoal'
    ],
    salary: 'Comissionamento Progressivo (70% repasse)'
  },
  {
    id: '2',
    title: 'Head of People',
    company: 'TechCorp (Confidencial)',
    type: 'CLT',
    location: 'Remoto',
    description: 'Liderar a estratégia de cultura e desenvolvimento organizacional de uma startup em hipercrescimento (Series B).',
    requirements: [
      'Inglês Fluente (Mandatório)', 
      'Experiência prévia em Scale-ups de Tecnologia', 
      'Vivência com implementação de PDI e Avaliação de Desempenho',
      'Liderança de times multidisciplinares'
    ],
    responsibilities: [
      'Estruturar a área de People & Culture do zero.',
      'Desenhar a jornada do colaborador (Onboarding a Offboarding).',
      'Gerir budget da área e KPIs de RH (Turnover, eNPS).'
    ],
    benefits: [
      'Stock Options',
      'Saúde e Odonto Bradesco Top Nacional',
      'Auxílio Remoto e Equipamentos Apple',
      'Gympass Gold'
    ],
    salary: 'R$ 25.000 - R$ 30.000'
  },
  {
    id: '3',
    title: 'Analista de R&S Sênior',
    company: 'Indústria Pharma Global',
    type: 'Híbrido',
    location: 'Guarulhos, SP',
    description: 'Condução de processos seletivos end-to-end para posições técnicas, especialistas e média gestão.',
    requirements: [
      'Superior Completo em Psicologia ou RH', 
      'Experiência robusta em Indústria Farmacêutica ou Bens de Consumo', 
      'Conhecimento em LinkedIn Recruiter'
    ],
    responsibilities: [
      'Alinhamento de perfil com gestores internacionais.',
      'Hunting ativo de perfis especialistas.',
      'Aplicação de testes comportamentais e técnicos.'
    ],
    benefits: [
      'PLR Agressiva (até 4 salários)',
      'Fretado e Restaurante no local',
      'Previdência Privada'
    ],
    salary: 'A combinar'
  },
];

// --- Components ---

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, delay = '0ms', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 hover:bg-white/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-sage-900/5 ${className}`}
    style={{ animationDelay: delay }}
  >
    {children}
  </div>
);

const SectionTitle = ({ subtitle, title, align = 'center' }: { subtitle: string, title: React.ReactNode, align?: 'left' | 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} animate-reveal`}>
    <span className="inline-block py-1 px-3 rounded-full bg-sage-100 text-sage-800 text-xs font-bold tracking-widest uppercase mb-4 border border-sage-200/50">
      {subtitle}
    </span>
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sage-900 leading-[1.1]">
      {title}
    </h2>
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-sage-600" />
        </div>
        <h3 className="font-serif text-2xl text-sage-900 mb-2">Recebemos seu contato</h3>
        <p className="text-sage-600">Nossa equipe entrará em contato em breve.</p>
        <button onClick={() => setIsSuccess(false)} className="mt-6 text-sm underline text-sage-800">Enviar nova mensagem</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-sage-500 ml-1">Nome Completo</label>
        <input 
          required
          type="text" 
          className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-sage-400 focus:bg-white transition-all placeholder-sage-300"
          placeholder="Como gostaria de ser chamado?"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-sage-500 ml-1">E-mail Corporativo ou Pessoal</label>
        <input 
          required
          type="email" 
          className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-sage-400 focus:bg-white transition-all placeholder-sage-300"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-sage-500 ml-1">Sua Mensagem</label>
        <textarea 
          required
          rows={4}
          className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-sage-400 focus:bg-white transition-all placeholder-sage-300 resize-none"
          placeholder="Descreva sua necessidade (Terapia ou Consultoria RH)..."
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>
      <button 
        disabled={isSubmitting}
        className="w-full bg-sage-900 text-alabaster-50 font-medium py-4 rounded-xl hover:bg-sage-800 transition-all shadow-lg shadow-sage-900/10 flex items-center justify-center gap-2"
      >
        {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : 'Enviar Solicitação'} <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

const JobApplicationForm = ({ jobTitle, onCancel }: { jobTitle: string, onCancel: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-sage-200 text-center animate-reveal">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-sage-600" />
        </div>
        <h3 className="font-serif text-2xl text-sage-900 mb-2">Aplicação Enviada!</h3>
        <p className="text-sage-600 mb-6">Boa sorte! Nosso time de recrutamento analisará seu perfil para a vaga de {jobTitle}.</p>
        <button onClick={onCancel} className="text-sm font-bold uppercase tracking-widest text-sage-800 hover:text-sage-500 transition-colors">
          Voltar para Vagas
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-sage-200 sticky top-24">
      <h3 className="font-serif text-2xl text-sage-900 mb-1">Aplicar para a vaga</h3>
      <p className="text-sm text-sage-500 mb-6">Envie seus dados para iniciar o processo.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-sage-500 ml-1 block mb-1">Nome Completo</label>
          <input required type="text" className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-sage-400 transition-all" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-sage-500 ml-1 block mb-1">Email</label>
          <input required type="email" className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-sage-400 transition-all" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-sage-500 ml-1 block mb-1">LinkedIn (URL)</label>
          <input required type="url" className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-sage-400 transition-all" />
        </div>
        
        <div className="pt-2">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-sage-300 border-dashed rounded-xl cursor-pointer bg-white/30 hover:bg-white/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 text-sage-400 mb-2" />
                <p className="text-sm text-sage-500"><span className="font-semibold">Clique para enviar CV</span> (PDF)</p>
            </div>
            <input type="file" className="hidden" accept=".pdf" required />
          </label>
        </div>

        <button 
          disabled={isSubmitting}
          className="w-full bg-sage-900 text-alabaster-50 font-medium py-4 rounded-xl hover:bg-sage-800 transition-all shadow-lg shadow-sage-900/10 flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : 'Confirmar Aplicação'}
        </button>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Reset job selection when changing views
  const handleSetView = (view: View) => {
    setCurrentView(view);
    setSelectedJobId(null);
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <div className="min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sage-200/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-float pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-clay-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-float-delayed pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-8 animate-reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-sage-800">Psicologia Clínica & RH Estratégico</span>
              </div>
              
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-sage-900 leading-[0.9] tracking-tight">
                Arquitetura <br/>
                <span className="italic text-sage-500/80">Emocional</span>
              </h1>
              
              <p className="text-xl text-sage-700 max-w-xl leading-relaxed font-light">
                Um santuário para a mente e uma estratégia para a carreira. Unimos o cuidado terapêutico com a inteligência de recrutamento para construir vidas e empresas sólidas.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => handleSetView(View.CONTACT)}
                  className="px-8 py-4 bg-sage-900 text-alabaster-50 rounded-full hover:bg-sage-800 transition-all shadow-xl shadow-sage-900/10 flex items-center gap-2 group"
                >
                  Agendar Atendimento <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => handleSetView(View.CAREERS)}
                  className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-sage-200 text-sage-900 rounded-full hover:bg-white transition-all flex items-center gap-2"
                >
                  Portal de Vagas
                </button>
              </div>
            </div>

            {/* Visual Abstract Composition */}
            <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] hidden md:block">
              <div className="absolute top-10 right-10 w-64 h-80 bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-2xl overflow-hidden animate-float z-20">
                <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-90 mix-blend-overlay" alt="Peace" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-sage-900/50 to-transparent">
                  <div className="flex items-center gap-2 text-white">
                    <Leaf className="w-4 h-4" />
                    <span className="font-serif italic text-lg">Cuidado</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-10 w-72 h-64 bg-sage-900/5 backdrop-blur-xl border border-sage-900/10 rounded-3xl shadow-xl flex flex-col justify-between p-6 animate-float-delayed z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Building2 className="w-6 h-6 text-sage-900" />
                  </div>
                  <span className="text-xs font-mono text-sage-500 bg-sage-100 px-2 py-1 rounded">MATCH</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-sage-900">Talentos</h3>
                  <p className="text-sm text-sage-600 mt-1">Conexões estratégicas para empresas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID: SERVICES TEASER --- */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Nossas Frentes" title={<>Equilíbrio entre <span className="italic font-light">Mente</span> e <span className="italic font-light">Matéria</span></>} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-clay-100/50 cursor-pointer" onClick={() => handleSetView(View.SERVICES)}>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606016159991-dfe492764e12?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sage-900/80"></div>
              <div className="relative h-full p-10 flex flex-col justify-end">
                <Heart className="w-12 h-12 text-clay-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-4xl text-sage-900 group-hover:text-white transition-colors">Psicoterapia Clínica</h3>
                <p className="mt-4 text-sage-700 group-hover:text-white/80 max-w-md text-lg transition-colors">
                  Atendimento individual e de casal. Um espaço seguro para elaborar conflitos e reencontrar o equilíbrio emocional.
                </p>
                <div className="mt-8 flex items-center gap-2 text-sage-900 group-hover:text-white font-medium uppercase tracking-widest text-sm">
                  Saiba mais <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex-1 rounded-[2.5rem] bg-sage-200/30 border border-white/50 p-8 hover:bg-white/40 transition-colors cursor-pointer group relative overflow-hidden" onClick={() => handleSetView(View.SERVICES)}>
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-sage-300/20 rounded-full blur-2xl group-hover:bg-sage-400/30 transition-colors"></div>
                <Briefcase className="w-10 h-10 text-sage-700 mb-4" />
                <h3 className="font-serif text-2xl text-sage-900">Para Empresas</h3>
                <p className="text-sm text-sage-600 mt-2">Recrutamento estratégico e diagnóstico de cultura organizacional.</p>
              </div>

              <div className="flex-1 rounded-[2.5rem] bg-sage-900 text-alabaster-50 p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-10"></div>
                <div className="relative z-10">
                   <div className="text-5xl font-sans font-light mb-2">15+</div>
                   <div className="text-sm uppercase tracking-widest text-sage-300 mb-6">Anos de História</div>
                   <p className="text-sage-200 font-serif italic text-lg leading-relaxed">
                     "Cuidamos de CPFs para fortalecer CNPJs."
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Nosso Portfólio" title={<>Soluções <span className="italic">Integradas</span></>} />
        
        {/* Division 1: Clinical (Organic) */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8 animate-reveal">
            <div className="p-3 bg-clay-100 rounded-full">
              <Leaf className="w-6 h-6 text-clay-900" />
            </div>
            <h3 className="font-serif text-3xl text-sage-900 italic">Núcleo de Psicologia</h3>
            <div className="h-px bg-sage-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <GlassCard className="group">
               <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-6 text-sage-600 group-hover:bg-sage-900 group-hover:text-white transition-colors">
                 <Users className="w-6 h-6" />
               </div>
               <h4 className="font-serif text-2xl text-sage-900 mb-3">Psicoterapia Individual</h4>
               <p className="text-sage-600 leading-relaxed mb-4">
                 Sessões focadas no autoconhecimento e tratamento de transtornos de ansiedade, depressão e burnout. Abordagens em TCC e Psicanálise.
               </p>
               <ul className="space-y-2 text-sm text-sage-500">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sage-400"/> Atendimento Online e Presencial</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sage-400"/> Sigilo Absoluto</li>
               </ul>
             </GlassCard>

             <GlassCard className="group">
               <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-6 text-sage-600 group-hover:bg-sage-900 group-hover:text-white transition-colors">
                 <Heart className="w-6 h-6" />
               </div>
               <h4 className="font-serif text-2xl text-sage-900 mb-3">Terapia de Casal</h4>
               <p className="text-sage-600 leading-relaxed mb-4">
                 Mediação de conflitos e reconstrução de vínculos afetivos. Um espaço neutro para melhorar a comunicação.
               </p>
               <ul className="space-y-2 text-sm text-sage-500">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sage-400"/> Encontros Quinzenais</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sage-400"/> Dinâmicas Relacionais</li>
               </ul>
             </GlassCard>
          </div>
        </div>

        {/* Division 2: Corporate (Structured) */}
        <div>
          <div className="flex items-center gap-4 mb-8 animate-reveal delay-100">
            <div className="p-3 bg-sage-200 rounded-full">
              <Briefcase className="w-6 h-6 text-sage-900" />
            </div>
            <h3 className="font-serif text-3xl text-sage-900 italic">Consultoria Corporativa</h3>
            <div className="h-px bg-sage-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 border border-sage-200 p-8 rounded-3xl hover:border-sage-400 transition-colors">
               <Search className="w-8 h-8 text-sage-700 mb-4" />
               <h4 className="font-bold text-lg text-sage-900 mb-2">Recrutamento & Seleção</h4>
               <p className="text-sm text-sage-600">Hunting estratégico de lideranças e especialistas. Avaliação de fit cultural e técnico.</p>
            </div>
            <div className="bg-white/50 border border-sage-200 p-8 rounded-3xl hover:border-sage-400 transition-colors">
               <Brain className="w-8 h-8 text-sage-700 mb-4" />
               <h4 className="font-bold text-lg text-sage-900 mb-2">Saúde Mental In Company</h4>
               <p className="text-sm text-sage-600">Palestras, rodas de conversa e plantão psicológico para colaboradores.</p>
            </div>
            <div className="bg-white/50 border border-sage-200 p-8 rounded-3xl hover:border-sage-400 transition-colors">
               <Award className="w-8 h-8 text-sage-700 mb-4" />
               <h4 className="font-bold text-lg text-sage-900 mb-2">Treinamento de Líderes</h4>
               <p className="text-sm text-sage-600">Desenvolvimento de soft skills, comunicação não-violenta e gestão humanizada.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen pt-32 pb-20 px-4">
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative animate-reveal">
             <div className="absolute inset-0 bg-sage-200 rounded-[3rem] rotate-3 blur-sm"></div>
             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="Psicóloga Fundadora" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-sage-900 to-transparent text-white">
                   <h3 className="font-serif text-3xl italic">Dra. Helena Vaz</h3>
                   <p className="text-sage-200 text-sm tracking-wider uppercase">Fundadora & Psicóloga Chefe</p>
                </div>
             </div>
          </div>

          <div className="space-y-8 animate-reveal delay-200">
             <h1 className="font-serif text-5xl md:text-6xl text-sage-900">
                "A cura começa na <span className="italic text-clay-400">escuta</span>."
             </h1>
             <p className="text-lg text-sage-700 leading-relaxed font-light">
                Com mais de 15 anos de experiência clínica e corporativa, fundei a Bem Estar com um propósito claro: derrubar os muros entre a saúde mental e o mundo do trabalho.
             </p>
             <p className="text-lg text-sage-700 leading-relaxed font-light">
                Acredito que empresas não são apenas números, são ecossistemas de pessoas. E pessoas saudáveis constroem negócios extraordinários.
             </p>

             <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-4 bg-white/40 border border-sage-200 rounded-2xl">
                   <GraduationCap className="w-6 h-6 text-sage-600 mb-2" />
                   <h4 className="font-bold text-sage-900 text-sm">Mestrado em Psicologia</h4>
                   <p className="text-xs text-sage-500">USP - Universidade de São Paulo</p>
                </div>
                <div className="p-4 bg-white/40 border border-sage-200 rounded-2xl">
                   <Award className="w-6 h-6 text-sage-600 mb-2" />
                   <h4 className="font-bold text-sage-900 text-sm">MBA em Gestão de Pessoas</h4>
                   <p className="text-xs text-sage-500">FGV</p>
                </div>
             </div>

             <div className="relative p-6 bg-sage-100 rounded-2xl mt-8">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-sage-300 opacity-50" />
                <p className="text-sage-800 italic font-serif text-center relative z-10">
                   "Nossa missão é acolher a singularidade de cada indivíduo enquanto potencializamos resultados coletivos."
                </p>
             </div>
          </div>
       </div>
    </div>
  );

  const renderContact = () => (
    <div className="pt-32 pb-20 min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="animate-reveal">
             <span className="text-clay-400 font-serif italic text-2xl block mb-4">Vamos conversar?</span>
             <h1 className="text-5xl md:text-6xl font-sans font-light text-sage-900 mb-8">
               Inicie sua jornada de <br/>transformação.
             </h1>
             <p className="text-lg text-sage-600 mb-12 leading-relaxed">
               Seja para agendar uma sessão de terapia ou para discutir uma parceria corporativa, nossa equipe está pronta para ouvir você com total confidencialidade.
             </p>

             <div className="space-y-8">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600">
                      <Phone className="w-5 h-5"/>
                   </div>
                   <div>
                      <h4 className="font-bold text-sage-900">Contato</h4>
                      <p className="text-sage-600">(11) 99999-9999</p>
                      <p className="text-sm text-sage-400">Seg-Sex, 08h às 19h</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600">
                      <MapPin className="w-5 h-5"/>
                   </div>
                   <div>
                      <h4 className="font-bold text-sage-900">Localização</h4>
                      <p className="text-sage-600">Av. Paulista, 1000 - Jardins</p>
                      <p className="text-sm text-sage-400">São Paulo, SP</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-sage-900/5 animate-reveal delay-200">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCareers = () => {
     // --- JOB DETAIL VIEW ---
     if (selectedJobId) {
        const job = JOBS.find(j => j.id === selectedJobId);
        if (!job) return null;

        return (
          <div className="pt-32 pb-20 min-h-screen px-4 animate-reveal">
             <div className="max-w-7xl mx-auto">
                <button 
                  onClick={() => setSelectedJobId(null)} 
                  className="flex items-center gap-2 text-sage-500 hover:text-sage-900 mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar para Vagas
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Left Column: Details */}
                   <div className="lg:col-span-2 space-y-8">
                      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 shadow-sm">
                          <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold">{job.type}</span>
                            <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold">{job.location}</span>
                          </div>
                          <h1 className="font-serif text-4xl md:text-5xl text-sage-900 mb-2">{job.title}</h1>
                          <p className="text-sage-600 text-lg">{job.company}</p>

                          <div className="h-px w-full bg-sage-200 my-8"></div>

                          <div className="space-y-8">
                             <div>
                                <h3 className="font-bold text-sage-900 text-lg mb-3">Sobre a Vaga</h3>
                                <p className="text-sage-600 leading-relaxed">{job.description}</p>
                             </div>

                             <div>
                                <h3 className="font-bold text-sage-900 text-lg mb-3">Responsabilidades</h3>
                                <ul className="space-y-2">
                                   {job.responsibilities?.map((item, idx) => (
                                     <li key={idx} className="flex items-start gap-3 text-sage-600">
                                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0"></div>
                                       {item}
                                     </li>
                                   ))}
                                </ul>
                             </div>

                             <div>
                                <h3 className="font-bold text-sage-900 text-lg mb-3">Requisitos</h3>
                                <ul className="space-y-2">
                                   {job.requirements.map((item, idx) => (
                                     <li key={idx} className="flex items-start gap-3 text-sage-600">
                                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0"></div>
                                       {item}
                                     </li>
                                   ))}
                                </ul>
                             </div>

                             <div>
                                <h3 className="font-bold text-sage-900 text-lg mb-3">Benefícios</h3>
                                <div className="flex flex-wrap gap-3">
                                   {job.benefits?.map((item, idx) => (
                                     <span key={idx} className="px-4 py-2 bg-white/60 border border-sage-100 rounded-xl text-sage-600 text-sm">
                                       {item}
                                     </span>
                                   ))}
                                </div>
                             </div>

                             {job.salary && (
                               <div className="p-4 bg-sage-50 rounded-xl flex items-center gap-3">
                                  <DollarSign className="w-5 h-5 text-sage-600" />
                                  <span className="text-sage-800 font-medium">Faixa Salarial: {job.salary}</span>
                               </div>
                             )}
                          </div>
                      </div>

                      <CareerAssistant jobTitle={job.title} />
                   </div>

                   {/* Right Column: Application */}
                   <div className="lg:col-span-1">
                      <JobApplicationForm jobTitle={job.title} onCancel={() => setSelectedJobId(null)} />
                   </div>
                </div>
             </div>
          </div>
        );
     }

     // --- JOB LIST VIEW ---
     const filteredJobs = JOBS.filter(job => 
       job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       job.location.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
        <div className="pt-32 pb-20 min-h-screen px-4">
           <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-reveal">
                 <h1 className="font-serif text-5xl md:text-6xl text-sage-900 mb-6">Portal de Talentos</h1>
                 <p className="text-sage-600 max-w-xl mx-auto">
                    Conectamos profissionais excepcionais a empresas que valorizam o capital humano.
                 </p>
              </div>

              {/* Search */}
              <div className="relative max-w-2xl mx-auto mb-16 animate-reveal">
                 <input 
                    type="text" 
                    placeholder="Buscar por cargo ou cidade..." 
                    className="w-full pl-14 pr-6 py-5 rounded-full bg-white/60 border border-sage-200 shadow-sm focus:shadow-lg focus:bg-white transition-all outline-none text-sage-900 placeholder-sage-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-sage-400 w-5 h-5" />
              </div>

              <div className="grid gap-6">
                 {filteredJobs.map((job) => (
                    <GlassCard 
                      key={job.id} 
                      className="group cursor-pointer"
                      onClick={() => setSelectedJobId(job.id)}
                    >
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                             <h3 className="font-serif text-2xl text-sage-900 mb-2 group-hover:text-clay-400 transition-colors">{job.title}</h3>
                             <div className="flex items-center gap-4 text-sm text-sage-500">
                                <span className="flex items-center gap-1"><Building2 className="w-4 h-4"/> {job.company}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location}</span>
                                <span className="px-2 py-0.5 rounded bg-sage-100 text-sage-700 font-medium text-xs">{job.type}</span>
                             </div>
                          </div>
                          <button className="px-6 py-3 rounded-full border border-sage-200 text-sage-700 font-medium hover:bg-sage-900 hover:text-white transition-all whitespace-nowrap">
                             Ver Detalhes
                          </button>
                       </div>
                    </GlassCard>
                 ))}
                 
                 {filteredJobs.length === 0 && (
                   <div className="text-center text-sage-500 py-12">
                     <p>Nenhuma vaga encontrada com esses termos.</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-alabaster-100 text-sage-900 selection:bg-clay-400 selection:text-white">
      <Header currentView={currentView} setView={handleSetView} />
      
      <main>
        {currentView === View.HOME && renderHome()}
        {currentView === View.SERVICES && renderServices()}
        {currentView === View.ABOUT && renderAbout()}
        {currentView === View.CONTACT && renderContact()}
        {currentView === View.CAREERS && renderCareers()}
      </main>

      <footer className="bg-sage-900 text-alabaster-100 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-sage-800 pt-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-6 h-6 text-clay-400" />
              <span className="font-serif text-2xl font-bold">Bem Estar</span>
            </div>
            <p className="text-sage-400 max-w-xs leading-relaxed">
              Arquitetura emocional para indivíduos e estratégia humana para negócios.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Explorar</h4>
            <ul className="space-y-4 text-sage-400">
              <li onClick={() => handleSetView(View.HOME)} className="hover:text-clay-400 cursor-pointer transition-colors">Início</li>
              <li onClick={() => handleSetView(View.CAREERS)} className="hover:text-clay-400 cursor-pointer transition-colors">Vagas</li>
              <li onClick={() => handleSetView(View.CONTACT)} className="hover:text-clay-400 cursor-pointer transition-colors">Contato</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sage-400">
              <li className="hover:text-clay-400 cursor-pointer transition-colors">Privacidade</li>
              <li className="hover:text-clay-400 cursor-pointer transition-colors">Termos</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-sage-800 text-center text-sage-600 text-sm">
          © 2024 Bem Estar Psicologia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;