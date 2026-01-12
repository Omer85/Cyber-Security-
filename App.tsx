
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ModuleHeader from './components/ModuleHeader';
import ModuleCard from './components/ModuleCard';
import NetworkSimulator from './components/NetworkSimulator';
import SecurityVisualizer from './components/SecurityVisualizer';
import FaultTree from './components/FaultTree';
import MalwareShowcase from './components/MalwareShowcase';
import ProblemSolvingLab from './components/ProblemSolvingLab';
import AILab from './components/AILab';
import Quiz from './components/Quiz';
import { ModuleType } from './types';
import { Icons, COLORS } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.BASICS);
  const [completedModules, setCompletedModules] = useState<Set<ModuleType>>(new Set([ModuleType.BASICS]));

  const progress = useMemo(() => {
    return Math.round((completedModules.size / Object.keys(ModuleType).length) * 100);
  }, [completedModules]);

  const completeModule = (module: ModuleType) => {
    setCompletedModules(prev => new Set([...Array.from(prev), module]));
  };

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.BASICS:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader 
              title="Security Fundamentals" 
              description="Master the architectural pillars that form the foundation of any resilient digital infrastructure."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard title="CIA Triad" icon={<Icons.Shield />}>
                The core paradigm: Confidentiality (secrecy), Integrity (trust), and Availability (access). Every exploit aims to break one of these.
              </ModuleCard>
              <ModuleCard title="Defense in Depth" icon={<Icons.Network />}>
                Layering security controls. Like a castle with moats, walls, and guards, network security requires overlapping protection zones.
              </ModuleCard>
              <ModuleCard title="Zero Trust" icon={<Icons.Alert />}>
                "Never trust, always verify." The modern security mantra where no user or system is trusted by default, even inside the perimeter.
              </ModuleCard>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start mt-12">
              <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 w-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-blue-500 text-2xl">01</span> The Cyber Kill Chain
                </h3>
                <ol className="space-y-4 text-slate-400 text-sm">
                  <li className="flex gap-4"><span className="text-blue-500 font-bold">Recon:</span> Researching target vulnerabilities.</li>
                  <li className="flex gap-4"><span className="text-blue-500 font-bold">Weaponization:</span> Creating the exploit.</li>
                  <li className="flex gap-4"><span className="text-blue-500 font-bold">Delivery:</span> Transmitting the payload (email, USB, web).</li>
                  <li className="flex gap-4"><span className="text-blue-500 font-bold">Exploitation:</span> Triggering the malicious code.</li>
                </ol>
                <div className="mt-8">
                   <SecurityVisualizer />
                </div>
              </div>
              <div className="flex-1 w-full">
                <FaultTree />
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 mt-6">
               <h3 className="text-lg font-bold text-white mb-4">The Engineering Mindset</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">
                 For Computer Engineering students, understanding security is about analyzing systems as complex state machines. Both the Cyber Kill Chain (attacker's view) and Fault Tree Analysis (engineer's view) are critical for building secure systems.
               </p>
               <button 
                  onClick={() => completeModule(ModuleType.THREATS)}
                  className="px-6 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg text-sm font-bold transition-all"
                >
                  Mark Basics as Complete →
                </button>
            </div>
          </div>
        );
      case ModuleType.THREATS:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <ModuleHeader 
                title="Threat Landscape" 
                description="Identify the tactics, techniques, and procedures (TTPs) used by modern threat actors."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard title="Advanced Persistent Threats (APT)" icon={<Icons.Alert />}>
                  High-level attackers who maintain long-term access to a network without being detected.
                </ModuleCard>
                <ModuleCard title="DDoS Attacks" icon={<Icons.Network />}>
                  Distributed Denial of Service attempts to crash systems by flooding them with illegitimate traffic.
                </ModuleCard>
                <ModuleCard title="Insider Threats" icon={<Icons.Code />}>
                  Disgruntled or negligent employees who compromise security from within the trusted network.
                </ModuleCard>
                <ModuleCard title="Supply Chain Attacks" icon={<Icons.Network />}>
                  Attacking a third-party vendor to gain access to their larger customers.
                </ModuleCard>
              </div>
            </div>

            <MalwareShowcase />

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-red-500 pl-4 py-1">
                <h3 className="text-2xl font-bold text-white">Social Engineering Attacks</h3>
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Psychological Vector</span>
              </div>
              <p className="text-slate-400 max-w-3xl">
                Social engineering is the art of manipulating people into divulging confidential information. Unlike technical hacks, these exploit human psychology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-red-500/50 transition-all group">
                  <div className="text-red-400 mb-3 group-hover:scale-110 transition-transform"><Icons.Brain /></div>
                  <h4 className="font-bold text-white mb-2">Phishing</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Fraudulent communications to steal sensitive data.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-red-500/50 transition-all group">
                  <div className="text-red-400 mb-3 group-hover:scale-110 transition-transform"><Icons.Alert /></div>
                  <h4 className="font-bold text-white mb-2">Pretexting</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Fabricated scenarios to trick victims into leaking data.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-red-500/50 transition-all group">
                  <div className="text-red-400 mb-3 group-hover:scale-110 transition-transform"><Icons.Shield /></div>
                  <h4 className="font-bold text-white mb-2">Tailgating</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Gaining physical access by following authorized personnel.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-red-500/50 transition-all group">
                  <div className="text-red-400 mb-3 group-hover:scale-110 transition-transform"><Icons.Code /></div>
                  <h4 className="font-bold text-white mb-2">Baiting</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Piquing curiosity with false promises to deliver malware.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case ModuleType.DEFENSES:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader 
              title="Tactical Defenses" 
              description="Deploy and configure active countermeasures to neutralize incoming threats in real-time."
            />
            <NetworkSimulator />
          </div>
        );
      case ModuleType.PROBLEM_SOLVING:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader 
              title="Problem Solving Lab" 
              description="Analyze broken architectures and propose engineering solutions to harden the environment."
            />
            <ProblemSolvingLab />
          </div>
        );
      case ModuleType.AI_LAB:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader 
              title="AI Forensic Laboratory" 
              description="Utilize Gemini to perform high-speed log analysis and threat modeling exercises."
            />
            <AILab />
          </div>
        );
      case ModuleType.QUIZ:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader 
              title="Field Competency Exam" 
              description="Validate your operational security knowledge with dynamic, AI-curated scenarios."
            />
            <Quiz />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
          <div className="flex gap-6 items-start">
            <div className="p-3 bg-white rounded-xl shadow-lg shadow-white/5 shrink-0 hidden md:block">
               <Icons.KKULogo className="w-16 h-auto" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Live Academic Environment | KKU</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                  Jahzia students | Computer Engineering
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-blue-400 font-medium">
                  <span className="text-sm">College of Computer Science</span>
                  <span className="h-4 w-px bg-slate-800 mx-2"></span>
                  <span className="text-sm">King Khalid University</span>
                  <span className="h-4 w-px bg-slate-800 mx-2"></span>
                  <span className="text-xs font-mono uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">CyberShield Workshop</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-slate-900/50 border border-slate-800 p-2 pl-4 rounded-2xl">
             <div className="flex flex-col items-end">
               <span className="text-[10px] text-slate-500 font-bold uppercase">Class Progress</span>
               <span className="text-sm font-mono font-bold text-blue-400">{progress}%</span>
             </div>
             <div className="h-10 w-px bg-slate-800"></div>
             <div className="flex -space-x-2">
               {[1,2,3,4].map(n => (
                 <div key={n} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${n * 23 + 55}`} alt="trainee" />
                 </div>
               ))}
               <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">+28</div>
             </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>

        <footer className="mt-24 pt-12 border-t border-slate-900 text-slate-600 text-xs flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
               <Icons.Shield />
            </div>
            <p>© 2024 Jahzia Workshop - College of Computer Science | King Khalid University. Facilitated by Dr. Omer Elsier Tayfour.</p>
          </div>
          <div className="flex gap-8 font-bold uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-blue-500 transition-colors">KKU Portal</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Threat Database</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Encryption Lab</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
