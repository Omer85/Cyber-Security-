
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'none' | 'link' | 'embed'>('none');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // PWA Install Logic
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  const progress = useMemo(() => {
    return Math.round((completedModules.size / Object.keys(ModuleType).length) * 100);
  }, [completedModules]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopyStatus('link');
    setTimeout(() => setCopyStatus('none'), 2000);
  };

  const handleCopyEmbed = async () => {
    const embedCode = `<iframe src="${window.location.href}" width="100%" height="800px" style="border:none; border-radius:12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" allow="camera; microphone; geolocation;"></iframe>`;
    await navigator.clipboard.writeText(embedCode);
    setCopyStatus('embed');
    setTimeout(() => setCopyStatus('none'), 2000);
  };

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
          </div>
        );
      case ModuleType.THREATS:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ModuleHeader 
              title="Threat Landscape" 
              description="Identify the tactics, techniques, and procedures (TTPs) used by modern threat actors."
            />
            <MalwareShowcase />
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
    <BrowserFrame>
      <div className="flex h-full bg-slate-950 text-slate-100 selection:bg-blue-500/30">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-16">
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-white rounded-xl shadow-lg shadow-white/5 shrink-0 hidden md:block group hover:rotate-2 transition-transform">
                 <Icons.KKULogo className="w-16 h-auto" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Academic Infrastructure | Vercel Node</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                    Jahzia students | Computer Engineering
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-blue-400 font-medium">
                    <span className="text-sm">College of Computer Science</span>
                    <span className="h-4 w-px bg-slate-800 mx-2"></span>
                    <span className="text-xs font-mono uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">CyberShield v2.5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {deferredPrompt && (
                <button 
                  onClick={handleInstall}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-600 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40"
                >
                  <Icons.Shield />
                  Install App
                </button>
              )}

              <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 font-bold text-sm hover:text-white hover:border-slate-600 transition-all shadow-lg"
              >
                <Icons.Share />
                Deploy & Frame
              </button>

              <div className="flex items-center gap-6 bg-slate-900/50 border border-slate-800 p-2 pl-4 rounded-2xl">
                 <div className="flex flex-col items-end">
                   <span className="text-[10px] text-slate-500 font-bold uppercase">Class Sync</span>
                   <span className="text-sm font-mono font-bold text-blue-400">{progress}%</span>
                 </div>
                 <div className="h-10 w-px bg-slate-800"></div>
                 <div className="flex -space-x-2">
                   {[1,2,3,4].map(n => (
                     <div key={n} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-help">
                       <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${n * 23 + 55}`} alt="trainee" />
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">+28</div>
                 </div>
              </div>
            </div>
          </header>

          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>

          <footer className="mt-24 pt-12 border-t border-slate-900 text-slate-600 text-xs flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                 <Icons.Shield />
              </div>
              <p>© 2024 Jahzia Workshop - College of Computer Science | King Khalid University.</p>
            </div>
            <div className="flex gap-4">
              <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded font-mono text-[9px] border border-green-500/20 uppercase">Environment: Stable</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded font-mono text-[9px] border border-slate-700 uppercase">Version 2.5.0-PRO</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/60" onClick={() => setShowShareModal(false)}>
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-8 border-b border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Application Deployment</h3>
                <button onClick={() => setShowShareModal(false)} className="text-slate-500 hover:text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <p className="text-slate-400 text-sm">Convert this web project into a standalone engineering lab for students.</p>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Option 1: Link */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Global Web Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-xs font-mono text-slate-400 truncate">
                    {window.location.href}
                  </div>
                  <button 
                    onClick={handleCopyLink}
                    className={`px-4 rounded-xl font-bold text-xs transition-all ${
                      copyStatus === 'link' ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copyStatus === 'link' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Option 2: Embed */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Native Iframe Wrapper (LMS Frame)</label>
                <div className="relative">
                  <textarea 
                    readOnly
                    value={`<iframe src="${window.location.href}" width="100%" height="800px" style="border:none; border-radius:12px; overflow:hidden;"></iframe>`}
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-[10px] font-mono text-blue-400 h-20 resize-none"
                  />
                  <button 
                    onClick={handleCopyEmbed}
                    className="absolute bottom-3 right-3 bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-700"
                  >
                    {copyStatus === 'embed' ? 'Copied Embed!' : 'Copy Code'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 italic">This allows you to "frame" the app inside King Khalid University's internal portals.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-6 flex justify-center border-t border-slate-800/50">
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Dismiss Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </BrowserFrame>
  );
};

export default App;
