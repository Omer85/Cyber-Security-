import React, { useState, useEffect, useCallback } from 'react';
import { generateQuizQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelected(null);
    setIsCorrect(null);
    
    try {
      const data = await generateQuizQuestion("Network Defense Architecture & Cryptography");
      if (data && data.question && Array.isArray(data.options) && data.options.length >= 4) {
        setQuestion(data);
      } else {
        setError("DATA_MALFORMED: The assessment engine returned an invalid data structure. Please retry.");
      }
    } catch (e: any) {
      if (e.message?.includes("API Key Missing")) {
        setError("AUTH_FAILURE: Lab API credentials not found in environment. Contact your administrator.");
      } else {
        setError("NODE_UNRESPONSIVE: The assessment gateway is experiencing high latency or downtime.");
      }
      console.error("Quiz Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleSelect = (index: number) => {
    if (selected !== null || !question) return;
    setSelected(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900 rounded-2xl border border-slate-800">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500/10 rounded-full"></div>
        </div>
        <p className="text-slate-400 font-mono text-[10px] mt-6 animate-pulse tracking-widest uppercase">Initializing Assessment Matrix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <span className="text-2xl animate-pulse">⚠️</span>
        </div>
        <h4 className="text-white font-bold mb-2">Terminal Error</h4>
        <p className="text-slate-400 mb-8 max-w-sm text-xs font-mono">{error}</p>
        <button 
          onClick={fetchQuestion} 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-bold shadow-lg shadow-blue-900/40 transition-all active:scale-95 uppercase tracking-widest"
        >
          Reboot Assessment Node
        </button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl max-w-2xl mx-auto transition-all animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="bg-blue-600/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Engineering Assessment</span>
        </div>
        <span className="text-slate-500 font-mono text-xs tracking-tighter">SUCCESS_PTS: <span className="text-blue-400 font-bold">{(score * 10).toString().padStart(3, '0')}</span></span>
      </div>

      <h3 className="text-lg font-bold mb-8 text-white leading-relaxed">{question.question}</h3>

      <div className="space-y-3 mb-8">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`group w-full text-left p-4 rounded-xl border transition-all duration-300 ${
              selected === i 
                ? (isCorrect ? 'bg-green-600/10 border-green-500 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-red-600/10 border-red-500 text-red-100')
                : (selected !== null && i === question.correctAnswer ? 'bg-green-600/10 border-green-500/50 text-green-200' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 text-slate-300')
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                selected === i 
                  ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                  : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 pt-4 border-t border-slate-800 mt-8">
          <div className={`p-6 rounded-xl border mb-6 ${isCorrect ? 'bg-green-950/20 border-green-500/20' : 'bg-red-950/20 border-red-500/20'}`}>
            <h4 className={`font-bold mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {isCorrect ? 'Technical Validation Successful' : 'Security Breach - Analysis Incomplete'}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed italic">{question.explanation}</p>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={fetchQuestion}
              className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xl shadow-blue-900/40 transform hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Continue to Next Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;