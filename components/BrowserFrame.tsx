
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

interface BrowserFrameProps {
  children: React.ReactNode;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("localhost:5173");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.host || "localhost:5173");
    }
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
      {!isFullscreen && (
        <div className="bg-[#0f172a] border-b border-white/5 p-2 flex items-center gap-4 shrink-0 select-none z-50">
          <div className="flex gap-1.5 px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-black/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-black/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-black/10"></div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-[#1e293b] px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
            <Icons.Vite className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-slate-300">Lab Console</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          </div>

          <div className="flex-1 max-w-xl mx-auto h-9 bg-black/40 border border-white/10 rounded-xl flex items-center px-4 gap-3 shadow-sm group">
            <div className="text-slate-500 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="text-[10px] font-mono text-slate-400 truncate flex-1 flex items-center gap-1">
              <span className="text-green-500/60 font-bold">http://</span>
              {currentUrl}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3">
             <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className={`p-2 rounded-lg transition-all ${showTerminal ? 'text-white bg-blue-500/20 border border-blue-500/40 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
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

      <div className="flex-1 overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>

        {showTerminal && !isFullscreen && (
          <div className="h-44 bg-[#020617] border-t border-white/5 flex flex-col font-mono text-[11px] shrink-0 animate-in slide-in-from-bottom-full duration-300 z-[100]">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold tracking-tighter uppercase text-[9px]">Vite Local Console</span>
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-slate-500 hover:text-white transition-colors">×</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 custom-scrollbar bg-black/40">
              <div className="flex gap-2">
                <span className="text-[#646cff] font-bold">VITE v6.0.2</span>
                <span className="text-slate-500">ready in 92 ms</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 mt-2">
                <span className="text-slate-500 font-bold">➜ URL:</span>
                <span className="text-cyan-400 font-bold">http://localhost:5173/</span>
              </div>
              <div className="flex gap-2 text-green-500 mt-2">
                <span className="opacity-50 tracking-tighter">NODE_STABLE</span>
                <span>Environment running without external deployment modules.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
           <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Lab Session Active</span>
           <button onClick={toggleFullscreen} className="text-slate-400 hover:text-white transition-colors">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default BrowserFrame;
