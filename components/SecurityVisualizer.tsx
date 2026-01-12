
import React, { useEffect, useState, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  status: 'secure' | 'warning' | 'compromised';
  type: 'server' | 'workstation' | 'gateway';
}

const SecurityVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initialNodes: Node[] = [
      { id: 'gw-1', x: 50, y: 150, status: 'secure', type: 'gateway' },
      { id: 'srv-1', x: 200, y: 70, status: 'secure', type: 'server' },
      { id: 'srv-2', x: 200, y: 230, status: 'secure', type: 'server' },
      { id: 'ws-1', x: 350, y: 50, status: 'secure', type: 'workstation' },
      { id: 'ws-2', x: 350, y: 150, status: 'secure', type: 'workstation' },
      { id: 'ws-3', x: 350, y: 250, status: 'secure', type: 'workstation' },
    ];
    setNodes(initialNodes);

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (Math.random() > 0.95) {
          const statuses: Node['status'][] = ['secure', 'warning', 'compromised'];
          return { ...node, status: statuses[Math.floor(Math.random() * 3)] };
        }
        return node;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Connections
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      nodes.forEach(node => {
        if (node.type === 'gateway') {
          nodes.filter(n => n.type === 'server').forEach(target => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          });
        }
        if (node.type === 'server') {
          nodes.filter(n => n.type === 'workstation').forEach(target => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          });
        }
      });

      // Draw Nodes
      nodes.forEach(node => {
        const color = node.status === 'secure' ? '#10b981' : node.status === 'warning' ? '#f59e0b' : '#ef4444';
        
        // Outer Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(node.id, node.x - 15, node.y + 20);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes]);

  return (
    <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Topology Monitor</h4>
      </div>
      <canvas 
        ref={canvasRef} 
        width={450} 
        height={300} 
        className="w-full h-auto cursor-crosshair"
      />
      <div className="mt-4 flex gap-4 text-[10px] font-mono uppercase">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Secure</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Suspicious</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Compromised</div>
      </div>
    </div>
  );
};

export default SecurityVisualizer;
