
import React from 'react';
import { Icons } from '../constants';

const FaultTree: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl overflow-hidden relative">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Icons.Code /> Fault Tree Analysis (FTA)
          </h3>
          <p className="text-slate-400 text-sm max-w-xl">
            A top-down, deductive failure analysis that uses Boolean logic to combine lower-level events to understand how a "Top Event" (System Failure) occurs.
          </p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded text-[10px] font-mono text-blue-400">
          LOGIC: BOOLEAN
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-8 py-4">
        {/* Top Undesired Event */}
        <div className="relative z-10">
          <div className="bg-red-950/40 border-2 border-red-500 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Top Event: Database Compromise</span>
          </div>
          <div className="w-0.5 h-8 bg-slate-700 mx-auto"></div>
        </div>

        {/* OR Gate */}
        <div className="relative">
          <div className="bg-slate-800 border border-slate-600 px-4 py-1 rounded-full text-[10px] font-bold text-slate-300">OR GATE</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-slate-700 -z-10"></div>
          <div className="flex justify-between w-[400px] mt-4">
             <div className="w-0.5 h-6 bg-slate-700 ml-[1px]"></div>
             <div className="w-0.5 h-6 bg-slate-700 mr-[1px]"></div>
          </div>
        </div>

        {/* Level 2 Events */}
        <div className="flex gap-12 justify-between w-[500px]">
          {/* Left Branch */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-xs text-slate-300 w-44 text-center">
              Exploitation of Web Vulnerability
            </div>
            <div className="w-0.5 h-8 bg-slate-700"></div>
            <div className="bg-slate-900 border border-blue-500/30 p-2 rounded text-[10px] text-blue-400 font-mono">
              [Basic Event: SQLi]
            </div>
          </div>

          {/* Right Branch */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-xs text-slate-300 w-44 text-center">
              Compromised Administrative Access
            </div>
            <div className="w-0.5 h-8 bg-slate-700"></div>
            
            {/* AND Gate */}
            <div className="bg-slate-800 border border-amber-500/50 px-3 py-1 rounded-full text-[9px] font-bold text-amber-400 mb-2">AND GATE</div>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-700"></div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded text-[9px] text-slate-500 italic w-24 text-center">
                  Stolen Admin Password
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-700"></div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded text-[9px] text-slate-500 italic w-24 text-center">
                  Bypassed MFA (Sim Swap)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating background lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/30"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-blue-500/30"></div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-blue-400 font-bold text-xs uppercase mb-2">Primary Advantage</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            FTA helps engineers identify single points of failure and complex dependencies that could lead to a catastrophic security breach.
          </p>
        </div>
        <div>
          <h4 className="text-amber-400 font-bold text-xs uppercase mb-2">Boolean symbols</h4>
          <div className="flex gap-4 text-[10px] text-slate-500">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-slate-700"></span> Basic Event</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Intermediate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaultTree;
