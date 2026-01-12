
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
import BrowserFrame from './components/BrowserFrame';
import { ModuleType } from './types';
import { Icons } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.BASICS);
  const [completedModules] = useState<Set<ModuleType>>(new Set([ModuleType.BASICS]));

  const progress = useMemo(() => {
    return Math.round((completedModules.size / Object.keys(ModuleType).length) * 100);
  }, [completedModules]);

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.BASICS:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader 
              title="Security Fundamentals" 
              description="Core pillars of resilient digital infrastructure."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModuleCard title="CIA Triad" icon={<Icons.Shield />}>
                Confidentiality, Integrity, and Availability.
              </ModuleCard>
              <ModuleCard title="Defense in Depth" icon={<Icons.Network />}>
                Layered security to prevent single points of failure.
              </ModuleCard>
              <ModuleCard title="Zero Trust" icon={<Icons.Alert />}>
                Never trust, always verify every access request.
              </ModuleCard>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
              <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-4">Topology Monitor</h3>
                <SecurityVisualizer />
              </div>
              <div className="flex-1 w-full">
                <FaultTree />
              </div>
            </div>
          </div>
        );
      case ModuleType.THREATS:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Threat Landscape" description="Analyze tactics used by modern threat actors." />
            <MalwareShowcase />
          </div>
        );
      case ModuleType.DEFENSES:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Tactical Defenses" description="Deploy active countermeasures." />
            <NetworkSimulator />
          </div>
        );
      case ModuleType.PROBLEM_SOLVING:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Problem Solving Lab" description="Analyze broken security architectures." />
            <ProblemSolvingLab />
          </div>
        );
      case ModuleType.AI_LAB:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="AI Forensic Laboratory" description="Real-time log analysis with Gemini." />
            <AILab />
          </div>
        );
      case ModuleType.QUIZ:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Field Competency Exam" description="Validate your security knowledge." />
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
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-white rounded-lg shrink-0">
                 <Icons.KKULogo className="w-12 h-auto" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Jahzia Security Lab</h1>
                <p className="text-blue-400 text-xs font-mono">College of Computer Science | King Khalid University</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-2 px-4 rounded-xl">
               <div className="flex flex-col items-end">
                 <span className="text-[10px] text-slate-500 font-bold uppercase">Progress</span>
                 <span className="text-sm font-mono font-bold text-blue-400">{progress}%</span>
               </div>
               <div className="h-8 w-px bg-slate-800 mx-2"></div>
               <div className="flex -space-x-1">
                 {[1,2,3].map(n => (
                   <div key={n} className="w-6 h-6 rounded-full border border-slate-950 bg-slate-800 overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${n * 23}`} alt="user" />
                   </div>
                 ))}
               </div>
            </div>
          </header>

          <div className="max-w-6xl mx-auto pb-10">
            {renderContent()}
          </div>

          <footer className="mt-8 pt-8 border-t border-slate-900 text-slate-600 text-[10px] flex justify-between items-center pb-8">
            <div className="flex items-center gap-3">
              <Icons.Shield />
              <p className="uppercase font-bold tracking-tighter">Computer Science | KKU © 2024</p>
            </div>
            <span className="font-mono uppercase px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Secure Node: Active</span>
          </footer>
        </main>
      </div>
    </BrowserFrame>
  );
};

export default App;
