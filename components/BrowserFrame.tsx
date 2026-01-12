
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ children, url = "localhost:5173" }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [hmrActive, setHmrActive] = useState(false);

  useEffect(() => {
    // Simulate HMR activity periodically
    const interval = setInterval(() => {
      setHmrActive(true);
      setTimeout(() => setHmrActive(false), 800);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#020617] overflow-hidden">
      {/* Vite Browser Toolbar */}
      {!isFullscreen && (
        <div className="bg-[#0f172a] border-b border-white/5 p-2 flex items-center gap-4 shrink-0 select-none z-50">
          {/* Window Controls */}
          <div className="flex gap-1.5 px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
          </div>
          
          {/* Vite Logo Tab */}
          <div className="hidden md:flex items-center gap-2 bg-[#1e293b] px-3 py-1.5 rounded-lg border border-white/5">
            <Icons.Vite className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-slate-300">Vite + React</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-xl mx-auto h-8 bg-black/40 border border-white/10 rounded-lg flex items-center px-4 gap-3">
            <div className="text-slate-500 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/></svg>
            </div>
            <span className="text-[10px] font-mono text-slate-400 truncate flex-1">{url}</span>
            {hmrActive && (
              <div className="flex items-center gap-1.5 animate-pulse">
                <span className="text-[9px] font-bold text-[#646cff] uppercase">HMR update</span>
                <div className="w-1 h-1 rounded-full bg-[#646cff]"></div>
              </div>
            )}
          </div>

          {/* Frame Actions */}
          <div className="flex items-center gap-2 px-3">
             <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className={`p-1.5 rounded-md transition-colors ${showTerminal ? 'text-white bg-white/10' : 'text-slate-500 hover:text-white'}`}
              title="Toggle Vite Terminal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 10 7 7 7-7"/></svg>
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-1.5 text-slate-500 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
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
          <div className="h-40 bg-[#000000] border-t border-white/5 flex flex-col font-mono text-[11px] shrink-0 animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between px-4 py-1.5 bg-white/5">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold">TERMINAL</span>
                <span className="text-[#646cff] font-bold">vite dev</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600">6.0.2</span>
                <button onClick={() => setShowTerminal(false)} className="text-slate-500 hover:text-white">×</button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-1">
              <div className="flex gap-2">
                <span className="text-[#646cff] font-bold">VITE v6.0.2</span>
                <span className="text-slate-500">ready in 128 ms</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 mt-2">
                <span className="text-slate-400">➜  Local:</span>
                <span className="text-cyan-400">http://localhost:5173/</span>
                <span className="text-slate-400">➜  Network:</span>
                <span className="text-slate-500">use --host to expose</span>
              </div>
              <div className="text-slate-500 mt-2 italic">press h + enter to show help</div>
              <div className="flex gap-2 text-green-500 mt-2">
                <span className="opacity-50 tracking-tighter">10:42:05 PM</span>
                <span>[vite] hmr update /src/App.tsx</span>
              </div>
              <div className="flex gap-2 text-blue-400">
                <span className="opacity-50 tracking-tighter">10:42:15 PM</span>
                <span>[security-node] Handshake established with King Khalid University API</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Standalone Indicator */}
      {isFullscreen && (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
           <Icons.Vite className="w-3 h-3" />
           <span className="text-[9px] font-bold text-white uppercase tracking-widest">Production Node</span>
           <button onClick={toggleFullscreen} className="ml-2 text-slate-400 hover:text-white">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default BrowserFrame;
