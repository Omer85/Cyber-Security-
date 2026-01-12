
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI, analyzeLog } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Icons } from '../constants';

const AILab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Operational Readiness: STANDBY. I am your CyberShield Elite mentor. Paste a suspicious network log or ask a technical question to begin your training.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (isManualLog = false) => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: isManualLog ? `[SYSTEM_LOG_UPLOAD]: \n${userMsg}` : userMsg }]);
    setIsLoading(true);

    try {
      let responseText: string;
      // Trigger log analysis if specifically requested or if it looks like a large log block
      if (isManualLog || (userMsg.length > 100 && (userMsg.includes('GET') || userMsg.includes('POST') || userMsg.includes('IP')))) {
        responseText = await analyzeLog(userMsg);
      } else {
        responseText = await chatWithAI(userMsg) || "Neural link interrupted. Please try again.";
      }
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "CRITICAL ERROR: Failed to communicate with security node. Verify API credentials." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
          </div>
          <span className="font-bold tracking-tight">AI FORRENSIC MENTOR</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">SECURITY LEVEL: TOP SECRET</span>
          <button 
            onClick={() => setMessages([{ role: 'model', text: 'Lab reset complete. Ready for new input.' }])}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Clear Console
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-lg ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none border border-blue-400/20' 
                : 'bg-slate-800/80 backdrop-blur text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              <div className="text-[10px] opacity-50 mb-1 font-bold uppercase tracking-widest">{msg.role}</div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl px-5 py-4 rounded-tl-none border border-slate-700 flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono animate-pulse">THINKING...</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe a scenario or paste a log segment..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 pr-32 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none h-24 text-sm font-mono placeholder:font-sans"
          />
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              onClick={() => handleSend(true)}
              disabled={isLoading || !input.trim()}
              title="Deep Log Analysis"
              className="p-2.5 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white disabled:opacity-30 transition-all border border-slate-700"
            >
              <Icons.Brain />
            </button>
            <button
              onClick={() => handleSend(false)}
              disabled={isLoading || !input.trim()}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all font-bold text-sm shadow-lg shadow-blue-900/40"
            >
              Send <Icons.Code />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILab;
