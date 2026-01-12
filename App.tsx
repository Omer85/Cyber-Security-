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
  const [completedModules] = useState<Set<ModuleType>>(new Set([ModuleType.BASICS]));
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(!!process.env.API_KEY);

  useEffect(() => {
    // Periodically check if API key has been injected or selected
    const checkKey = () => {
      if (process.env.API_KEY) {
        setHasApiKey(true);
      }
    };
    const interval = setInterval(checkKey, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async () => {
    if ((window as any).aistudio) {
      try {
        setIsAuthenticating(true);
        await (window as any).aistudio.openSelectKey();
        // Instruction: Assume successful selection and proceed
        setHasApiKey(true);
      } catch (err) {
        console.error("Authentication failed:", err);
      } finally {
        setIsAuthenticating(false);
      }
    } else {
      alert("AI Studio environment not detected. Ensure you are running this in a compatible AI development lab.");
    }
  };

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
              description="Core pillars of resilient digital infrastructure. Master the foundation of operational security."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModuleCard title="CIA Triad" icon={<Icons.Shield />}>
                Confidentiality, Integrity, and Availability. The fundamental goal of security.
              </ModuleCard>
              <ModuleCard title="Defense in Depth" icon={<Icons.Network />}>
                Layered security controls to prevent single points of failure across the stack.
              </ModuleCard>
              <ModuleCard title="Zero Trust" icon={<Icons.Alert />}>
                Never trust, always verify every access request regardless of origin.
              </ModuleCard>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
              <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 w-full shadow-lg">
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
            <ModuleHeader title="Threat Landscape" description="Analyze tactics, techniques, and procedures used by modern threat actors." />
            <MalwareShowcase />
          </div>
        );
      case ModuleType.DEFENSES:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Tactical Defenses" description="Deploy active countermeasures to protect critical infrastructure." />
            <NetworkSimulator />
          </div>
        );
      case ModuleType.PROBLEM_SOLVING:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Problem Solving Lab" description="Analyze and rectify broken security architectures." />
            <ProblemSolvingLab />
          </div>
        );
      case ModuleType.AI_LAB:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="AI Forensic Laboratory" description="Real-time log analysis and threat modeling with Gemini intelligence." />
            <AILab />
          </div>
        );
      case ModuleType.QUIZ:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ModuleHeader title="Field Competency Exam" description="Validate your security expertise with interactive challenges." />
            <Quiz />
          </div>
        );
      default:
        return null;
    }
  };

  if (!hasApiKey) {
    return (
      <BrowserFrame>
        <div className="h-full bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-900/40 animate-bounce">
                <Icons.Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4 tracking-tight">Departmental Terminal Login</h1>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed">
              Dr. Omer Elsier Tayfour's laboratory requires active AI credentials to authenticate your session. Please connect your departmental API key to begin the workshop.
            </p>
            <button
              onClick={handleAuthenticate}
              disabled={isAuthenticating}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-blue-900/40 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Authenticate Terminal
                  <Icons.Code className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                className="text-[10px] text-blue-400 hover:underline uppercase font-bold tracking-widest"
              >
                Billing Documentation & Key Setup
              </a>
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame>
      <div className="flex h-full bg-slate-950 text-slate-100 selection:bg-blue-500/30">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex gap-4 items-center">
              <div className="p-2.5 bg-blue-600 rounded-lg shrink-0 shadow-lg shadow-blue-900/20">
                 <Icons.Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Computer Engineering</h1>
                <p className="text-blue-400 text-xs font-mono uppercase tracking-widest">Dr. Omer Elsier Tayfour's Security Lab</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-2 px-4 rounded-xl shadow-inner">
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
              <Icons.Shield className="w-4 h-4" />
              <p className="uppercase font-bold tracking-tighter">Computer Engineering Lab © 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono uppercase px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Faculty Lead: Dr. Omer Elsier Tayfour</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </footer>
        </main>
      </div>
    </BrowserFrame>
  );
};

export default App;