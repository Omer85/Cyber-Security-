
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

interface BrowserFrameProps {
  children: React.ReactNode;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false); // Default to false to reduce initial load strain
  const [hmrActive, setHmrActive] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("cybershield.kku.edu.sa");

  useEffect(() => {
    // Dynamically set URL based on environment
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.host || "cybershield.kku.edu.sa");
    }

    // Simulate HMR activity sparingly to prevent socket strain
    const interval = setInterval(() => {
      setHmrActive(true);
      const timer = setTimeout(() => setHmrActive(false), 1000);
      return () => clearTimeout(timer);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#020617] overflow-hidden border border-white/5">
      {/* Vite Browser Toolbar */}
      {!isFullscreen && (
        <div className="bg-[#0f172a] border-b border-white/5 p-2 flex items-center gap-4 shrink-0 select-none z-50">
          {/* Window Controls */}
          <div className="flex gap-1.5 px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-black/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-black/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-black/10"></div>
          </div>
          
          {/* Vite Logo Tab */}
          <div className="hidden md:flex items-center gap-2 bg-[#1e293b] px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
            <Icons.Vite className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-slate-300">CyberShield v2.5</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></div>
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-xl mx-auto h-9 bg-black/40 border border-white/10 rounded-xl flex items-center px-4 gap-3 shadow-sm group">
            <div className="text-slate-500 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="text-[10px] font-mono text-slate-400 truncate flex-1 flex items-center gap-1">
              <span className="text-green-500/60 font-bold">https://</span>
              {currentUrl}
            </span>
            {hmrActive && (
              <div className="flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="text-[8px] font-bold text-[#646cff] uppercase tracking-tighter">HMR REFRESH</span>
                <div className="w-1 h-1 rounded-full bg-[#646cff] animate-ping"></div>
              </div>
            )}
          </div>

          {/* Frame Actions */}
          <div className="flex items-center gap-2 px-3">
             <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className={`p-2 rounded-lg transition-all ${showTerminal ? 'text-white bg-[#646cff]/20 border border-[#646cff]/40 shadow-lg shadow-[#646cff]/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              title="Toggle Dev Console"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 10 7 7 7-7"/></svg>
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>

        {/* Vite Simulated Terminal */}
        {showTerminal && !isFullscreen && (
          <div className="h-44 bg-[#020617] border-t border-white/5 flex flex-col font-mono text-[11px] shrink-0 animate-in slide-in-from-bottom-full duration-300 z-[100]">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold tracking-tighter uppercase text-[9px]">Vite Console</span>
                <div className="h-3 w-px bg-slate-800"></div>
                <span className="text-[#646cff] font-bold">dev --host</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600 text-[10px]">UPTIME: 04:12:44</span>
                <button onClick={() => setShowTerminal(false)} className="text-slate-500 hover:text-white transition-colors">×</button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 custom-scrollbar bg-black/40">
              <div className="flex gap-2">
                <span className="text-[#646cff] font-bold">VITE v6.0.2</span>
                <span className="text-slate-500">ready in 92 ms</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 mt-2">
                <span className="text-slate-500 font-bold">➜ Local:</span>
                <span className="text-cyan-400 font-bold underline decoration-cyan-400/30 underline-offset-4">http://localhost:5173/</span>
                <span className="text-slate-500 font-bold">➜ Network:</span>
                <span className="text-slate-400 italic">http://192.168.1.104:5173/</span>
              </div>
              <div className="text-slate-500 mt-2 py-1 px-2 bg-white/5 rounded w-fit text-[10px]">Press <kbd className="text-slate-300">h</kbd> + <kbd className="text-slate-300">Enter</kbd> for CLI options</div>
              <div className="flex gap-2 text-green-500 mt-2 animate-pulse">
                <span className="opacity-50 tracking-tighter">10:55:01 PM</span>
                <span>[vite] module reload /src/App.tsx</span>
              </div>
              <div className="flex gap-2 text-blue-400">
                <span className="opacity-50 tracking-tighter">10:55:05 PM</span>
                <span>[auth] Node verified with KKU Enterprise Gateway</span>
              </div>
              <div className="flex gap-2 text-amber-500/80">
                <span className="opacity-50 tracking-tighter">10:55:12 PM</span>
                <span className="italic">[warn] source-map resolution timed out for @google/genai</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Production Indicator */}
      {isFullscreen && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
           <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Live Node</span>
           <div className="h-4 w-px bg-white/10 mx-1"></div>
           <button onClick={toggleFullscreen} className="text-slate-400 hover:text-white transition-colors">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default BrowserFrame;
