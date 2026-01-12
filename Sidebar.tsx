
import React from 'react';
import { ModuleType } from './types';
import { Icons } from './constants';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { type: ModuleType.BASICS, icon: <Icons.Shield />, label: 'Security Basics' },
    { type: ModuleType.THREATS, icon: <Icons.Alert />, label: 'Common Threats' },
    { type: ModuleType.DEFENSES, icon: <Icons.Network />, label: 'Network Defenses' },
    { type: ModuleType.PROBLEM_SOLVING, icon: <Icons.Code />, label: 'Problem Solving' },
    { type: ModuleType.AI_LAB, icon: <Icons.Brain />, label: 'Security AI Lab' },
    { type: ModuleType.QUIZ, icon: <Icons.Code />, label: 'Skills Assessment' },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen sticky top-0 border-r border-slate-800 p-6 flex flex-col">
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex items-center gap-2 mt-2">
           <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/40">
             <Icons.Shield className="text-white" />
           </div>
           <h1 className="text-xl font-bold tracking-tight text-white">CyberShield</h1>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Lab Terminal v2.5</span>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveModule(item.type)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeModule === item.type
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold border-2 border-blue-500/30 shrink-0">
            OT
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[11px] font-bold text-white leading-tight truncate">Dr. Omer Elsier Tayfour</span>
            <span className="text-[9px] text-blue-400 font-mono uppercase mt-1">Computer Engineering</span>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Module Progress</p>
          <div className="w-full bg-slate-700 h-2 rounded-full mb-2">
            <div className="bg-blue-500 h-full rounded-full w-2/5"></div>
          </div>
          <p className="text-xs text-slate-400">Progress Tracked</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;