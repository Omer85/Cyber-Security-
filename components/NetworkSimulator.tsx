import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

const NetworkSimulator: React.FC = () => {
  const [firewallActive, setFirewallActive] = useState(false);
  const [attackInProgress, setAttackInProgress] = useState(false);
  const [packets, setPackets] = useState<{ id: number; status: 'blocked' | 'passed'; type: 'good' | 'malicious' }[]>([]);

  const toggleFirewall = () => setFirewallActive(!firewallActive);

  const startSimulation = () => {
    setAttackInProgress(true);
    setPackets([]);
  };

  useEffect(() => {
    if (!attackInProgress) return;

    const interval = setInterval(() => {
      setPackets(prev => {
        // Fix: Explicitly type newPacket to allow both 'passed' and 'blocked' statuses and avoid narrow literal type inference from assignment
        const newPacket: { id: number; status: 'blocked' | 'passed'; type: 'good' | 'malicious' } = {
          id: Date.now(),
          type: Math.random() > 0.3 ? 'good' : 'malicious',
          status: 'passed'
        };

        if (firewallActive && newPacket.type === 'malicious') {
          newPacket.status = 'blocked';
        }

        const next = [newPacket, ...prev].slice(0, 10);
        return next;
      });
    }, 800);

    const timer = setTimeout(() => {
      setAttackInProgress(false);
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [attackInProgress, firewallActive]);

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold mb-1">Defense Simulator</h3>
          <p className="text-slate-400 text-sm">Real-time packet filtering demonstration</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={toggleFirewall}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              firewallActive ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {firewallActive ? 'Firewall: ACTIVE' : 'Firewall: OFF'}
          </button>
          <button 
            onClick={startSimulation}
            disabled={attackInProgress}
            className={`px-6 py-2 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 transition-all ${
              attackInProgress ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {attackInProgress ? 'Simulating...' : 'Start Traffic'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 items-center">
        {/* Internet */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700">
             <span className="text-2xl">🌐</span>
          </div>
          <span className="text-slate-400 text-xs font-bold uppercase">Untrusted Web</span>
        </div>

        {/* The Wall */}
        <div className="relative h-64 flex flex-col items-center justify-center">
          <div className={`w-1 h-full transition-all duration-500 ${firewallActive ? 'bg-green-500 shadow-[0_0_20px_#10b981]' : 'bg-slate-800'}`}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className={`p-4 rounded-xl border-2 transition-all ${firewallActive ? 'bg-green-950/50 border-green-500' : 'bg-slate-800 border-slate-700'}`}>
               <Icons.Shield />
             </div>
          </div>

          {/* Packets */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {packets.map((p, i) => (
              <div 
                key={p.id}
                className={`absolute left-0 w-4 h-4 rounded-full transition-all duration-[2000ms] ease-linear`}
                style={{
                   top: `${(i * 15) % 80 + 10}%`,
                   backgroundColor: p.type === 'good' ? '#3b82f6' : '#ef4444',
                   transform: `translateX(${p.status === 'blocked' ? '120px' : '400px'})`,
                   opacity: p.status === 'blocked' && i > 2 ? 0 : 1
                }}
              >
                {p.status === 'blocked' && <div className="absolute -top-4 text-[10px] text-red-500 font-bold">BLOCK</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Internal Network */}
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 gap-2">
            {[1,2,3,4].map(n => (
              <div key={n} className="w-10 h-10 bg-blue-900/30 rounded border border-blue-500/30 flex items-center justify-center">
                <Icons.Network />
              </div>
            ))}
          </div>
          <span className="text-slate-400 text-xs font-bold uppercase">Secure LAN</span>
        </div>
      </div>

      <div className="mt-8 bg-slate-950 rounded-xl p-4 mono text-sm h-32 overflow-y-auto border border-slate-800">
        <div className="text-green-500 mb-1">$ system monitor initialized...</div>
        {packets.map(p => (
          <div key={p.id} className={p.type === 'malicious' ? 'text-red-400' : 'text-blue-400'}>
            [{new Date(p.id).toLocaleTimeString()}] IP 192.168.1.{Math.floor(Math.random() * 255)}: {p.type === 'good' ? 'DATA_TRANSFER' : 'MALICIOUS_REQUEST'}{' -> '}{p.status.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSimulator;