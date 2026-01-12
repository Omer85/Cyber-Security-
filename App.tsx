
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

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Global Error Boundary to prevent "Pipe.onStreamRead" socket crashes from taking down the whole app
 */
// Fix: Use explicit interfaces for Props and State to resolve "Property 'state'/'props' does not exist" errors
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }

  render() {
    // Fix: Access state correctly from typed class
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white p-8">
          <div className="max-w-md text-center space-y-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.Alert />
            </div>
            <h2 className="text-2xl font-bold">Node Desync Detected</h2>
            <p className="text-slate-400 text-sm">The development socket encountered a stream error (Pipe.onStreamRead). This usually happens during intensive hot-reloading.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Restart Environment
            </button>
          </div>
        </div>
      );
    }
    // Fix: Access props correctly from typed class
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.BASICS);
  const [completedModules, setCompletedModules] = useState<Set<ModuleType>>(new Set([ModuleType.BASICS]));
  const [showShareModal, setShowShareModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'none' | 'link' | 'embed' | 'header'>('none');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  // PWA & Standalone Detection
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }
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

  const handleCopyLink = async (type: 'link' | 'header' = 'link') => {
    await navigator.clipboard.writeText(window.location.href);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus('none'), 2000);
  };

  const handleCopyEmbed = async () => {
    const embedCode = `<iframe src="${window.location.href}" width="100%" height="800px" style="border:none; border-radius:12px;" allow="camera; microphone; geolocation;"></iframe>`;
    await navigator.clipboard.writeText(embedCode);
    setCopyStatus('embed');
    setTimeout(() => setCopyStatus('none'), 2000);
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
    <ErrorBoundary>
      <BrowserFrame>
        <div className="flex h-full bg-slate-950 text-slate-100 selection:bg-blue-500/30">
          <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-16">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-white rounded-xl shadow-lg shadow-white/5 shrink-0 hidden md:block group hover:rotate-2 transition-transform">
                   <Icons.KKULogo className="w-16 h-auto" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                       <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                       <span className="absolute w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75"></span>
                    </div>
                    <span className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em] px-2 py-0.5 bg-white/5 rounded">
                      {isStandalone ? 'NATIVE APPLICATION' : 'CLOUD PRODUCTION NODE'}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                      Jahzia students | Computer Engineering
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-blue-400 font-medium">
                      <span className="text-sm">College of Computer Science</span>
                      <span className="h-4 w-px bg-slate-800 mx-2"></span>
                      <span className="text-xs font-mono uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">CyberShield v2.5-STABLE</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Quick URL Copy Button */}
                {!isStandalone && (
                  <button 
                    onClick={() => handleCopyLink('header')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all font-bold text-xs ${
                      copyStatus === 'header' ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Copy Workshop URL"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    {copyStatus === 'header' ? 'Copied' : 'Share URL'}
                  </button>
                )}

                <button 
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-600 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40 group active:scale-95"
                >
                  <Icons.Share />
                  Deployment Hub
                </button>

                <div className="flex items-center gap-6 bg-slate-900/50 border border-slate-800 p-2 pl-4 rounded-2xl">
                   <div className="flex flex-col items-end">
                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Class Sync</span>
                     <span className="text-sm font-mono font-bold text-blue-400">{progress}%</span>
                   </div>
                   <div className="h-10 w-px bg-slate-800"></div>
                   <div className="flex -space-x-2">
                     {[1,2,3,4].map(n => (
                       <div key={n} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-help hover:z-10 transform hover:scale-110">
                         <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${n * 23 + 55}`} alt="trainee" />
                       </div>
                     ))}
                     <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">+28</div>
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
                <div className="flex items-center gap-2 px-2 py-1 bg-green-500/5 text-green-500/80 rounded border border-green-500/20">
                   <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="font-mono uppercase">SSL: Verified</span>
                </div>
                <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded font-mono border border-slate-700 uppercase">v2.5.0-PROD</span>
              </div>
            </footer>
          </main>
        </div>

        {/* Deployment Dashboard Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80 animate-in fade-in duration-300" onClick={() => setShowShareModal(false)}>
            <div className="bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Icons.Vite className="w-6 h-6" /> Distribution Center
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">Deploy this training module to local environments or LMS systems.</p>
                </div>
                <button onClick={() => setShowShareModal(false)} className="text-slate-500 hover:text-white bg-white/5 p-2 rounded-xl transition-all hover:rotate-90">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/20">
                {/* Left Column: Install as App */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/5">
                      <Icons.Shield />
                    </div>
                    <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em]">Local Install</h4>
                  </div>
                  
                  {deferredPrompt ? (
                    <div className="space-y-4">
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Our node architecture supports PWA standards. Install to bypass browser overhead and enable native acceleration.</p>
                      <button 
                        onClick={handleInstall}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-900/40 transition-all flex items-center justify-center gap-2 group"
                      >
                        <Icons.Shield /> 
                        <span className="group-hover:translate-x-1 transition-transform">Deploy to Desktop</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-3 opacity-70 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                          iOS / Safari Deployment
                        </p>
                        <ol className="text-[11px] text-slate-400 space-y-3 list-decimal ml-4 font-medium">
                          <li>Tap the <b className="text-white">Share</b> icon in Safari</li>
                          <li>Find <b className="text-white">"Add to Home Screen"</b></li>
                          <li>Launch as a <b className="text-blue-400">Secure Native Node</b></li>
                        </ol>
                      </div>
                      <p className="text-[9px] text-slate-500 italic leading-tight text-center">Standard Web Application (PWA) manifest detected.</p>
                    </div>
                  )}
                </div>

                {/* Right Column: Web Link */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 shadow-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    </div>
                    <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em]">External Node</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Production Host</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-black/60 border border-white/5 px-4 py-3 rounded-xl text-[11px] font-mono text-blue-400 truncate shadow-inner">
                          {window.location.href}
                        </div>
                        <button 
                          onClick={() => handleCopyLink('link')}
                          className={`px-4 rounded-xl font-bold text-xs transition-all active:scale-90 ${
                            copyStatus === 'link' ? 'bg-green-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          {copyStatus === 'link' ? 'Success' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">LMS Iframe Integration</label>
                      <div className="relative group">
                        <textarea 
                          readOnly
                          value={`<iframe src="${window.location.href}" width="100%" height="800px" style="border-radius:24px; border:1px solid rgba(255,255,255,0.1);"></iframe>`}
                          className="w-full bg-black/60 border border-white/5 p-4 rounded-xl text-[10px] font-mono text-slate-600 h-20 resize-none shadow-inner group-hover:text-slate-400 transition-colors"
                        />
                        <button 
                          onClick={handleCopyEmbed}
                          className="absolute bottom-2 right-2 bg-slate-800/80 backdrop-blur text-slate-400 px-3 py-1.5 rounded-lg text-[9px] font-bold hover:text-white transition-all border border-white/5"
                        >
                          {copyStatus === 'embed' ? 'Copied!' : 'Copy Snippet'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 p-6 flex justify-between items-center border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Network Topology: ENCRYPTED</span>
                </div>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Jahzia Integrated Platform v2.5</p>
              </div>
            </div>
          </div>
        )}
      </BrowserFrame>
    </ErrorBoundary>
  );
};

export default App;
