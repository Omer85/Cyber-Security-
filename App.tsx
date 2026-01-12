
import React, { useState, useMemo, useEffect } from 'react';
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
import BrowserFrame from './components/BrowserFrame';
import { ModuleType } from './types';
import { Icons } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.BASICS);
  const [completedModules, setCompletedModules] = useState<Set<ModuleType>>(new Set([ModuleType.BASICS]));

  const progress = useMemo(() => {
    return Math.round((completedModules.size / Object.keys(ModuleType).length) * 100);
  }, [completedModules]);

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
                The core paradigm: Confidentiality (secrecy), Integrity (trust), and Availability (access).
              </ModuleCard>
              <ModuleCard title="Defense in Depth" icon={<Icons.Network />}>
                Layering security controls to create overlapping protection zones.
              </ModuleCard>
              <ModuleCard title="Zero Trust" icon={<Icons.Alert />}>
                "Never trust, always verify." No user or system is trusted by default.
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
                  <li className="flex gap-4"><span className="text-blue-500 font-bold">Delivery:</span> Transmitting the payload.</li>
                </ol>
                <div className="mt-8">
                   <SecurityVisualizer />
                </div>
              </div>
              <div className="flex-1 w-full">
                <FaultTree />
              </div>
            </div>
          </div>
        );
      case ModuleType.THREATS:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader title="Threat Landscape" description="Identify tactics used by modern threat actors." />
            <MalwareShowcase />
          </div>
        );
      case ModuleType.DEFENSES:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader title="Tactical Defenses" description="Deploy active countermeasures to neutralize threats." />
            <NetworkSimulator />
          </div>
        );
      case ModuleType.PROBLEM_SOLVING:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader title="Problem Solving Lab" description="Analyze broken architectures and propose solutions." />
            <ProblemSolvingLab />
          </div>
        );
      case ModuleType.AI_LAB:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader title="AI Forensic Laboratory" description="Utilize Gemini to perform log analysis and threat modeling." />
            <AILab />
          </div>
        );
      case ModuleType.QUIZ:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader title="Field Competency Exam" description="Validate your knowledge with AI-curated scenarios." />
            <Quiz />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <BrowserFrame>
      <div className="flex h-full bg-slate-950 text-slate-100 selection:bg-blue-500/30">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
          <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-16">
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-white rounded-xl shadow-lg shrink-0 hidden md:block">
                 <Icons.KKULogo className="w-16 h-auto" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                     <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                     <span className="absolute w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75"></span>
                  </div>
                  <span className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em] px-2 py-0.5 bg-white/5 rounded">
                    Local Lab Instance
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Jahzia Security Workshop</h1>
                  <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                    <span>College of Computer Science</span>
                    <span className="h-4 w-px bg-slate-800"></span>
                    <span className="text-xs font-mono uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">v2.5.0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-6 bg-slate-900/50 border border-slate-800 p-3 px-6 rounded-2xl shadow-inner">
                 <div className="flex flex-col items-end">
                   <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Lab Progress</span>
                   <span className="text-lg font-mono font-bold text-blue-400">{progress}%</span>
                 </div>
                 <div className="h-10 w-px bg-slate-800"></div>
                 <div className="flex -space-x-2">
                   {[1,2,3,4].map(n => (
                     <div key={n} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${n * 23}`} alt="trainee" />
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </header>

          <div className="max-w-6xl mx-auto pb-12">
            {renderContent()}
          </div>

          <footer className="mt-12 pt-12 border-t border-slate-900 text-slate-600 text-[10px] flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                 <Icons.Shield />
              </div>
              <p className="uppercase tracking-widest font-bold">© 2024 College of Computer Science | King Khalid University</p>
            </div>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded font-mono border border-slate-700 uppercase">Local Environment</span>
            </div>
          </footer>
        </main>
      </div>
    </BrowserFrame>
  );
};

export default App;
