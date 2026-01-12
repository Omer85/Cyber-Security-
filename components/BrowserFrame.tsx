
import React from 'react';

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ children, url = "security.kku.edu.sa/jahzia" }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 overflow-hidden">
      {/* Browser Toolbar */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-3 flex items-center gap-4 shrink-0 select-none">
        {/* Window Controls */}
        <div className="flex gap-2 px-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-900/50 shadow-inner"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-900/50 shadow-inner"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-900/50 shadow-inner"></div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex gap-3 text-slate-500 ml-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-30"><path d="m9 18 6-6-6-6"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/></svg>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-2xl mx-auto h-8 bg-slate-950/50 border border-slate-700/50 rounded-lg flex items-center px-4 gap-2">
          <div className="text-green-500 shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span className="text-[11px] font-mono text-slate-400 truncate tracking-tight">{url}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-4 px-4 text-slate-400">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Academic Node: Active</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default BrowserFrame;
