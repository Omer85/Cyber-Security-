import React, { useState, useEffect, useCallback } from 'react';
import { generateQuizQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  const handleReauth = async () => {
    if ((window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      fetchQuestion();
    }
  };

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelected(null);
    setIsCorrect(null);
    
    try {
      const data = await generateQuizQuestion("Network Defense & Threat Analysis");
      if (data && data.question) {
        setQuestion(data);
      } else {
        setError({ code: 'MALFORMED', message: "Data packet corrupted. Retrying..." });
      }
    } catch (e: any) {
      if (e.message === "AUTH_REQUIRED" || e.status === 401 || e.message?.includes("entity was not found")) {
        setError({ code: 'AUTH', message: "Assessment Terminal Offline: Lab credentials missing or expired." });
      } else {
        setError({ code: 'SERVER', message: "Communication Node Unresponsive. Check network link." });
      }
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
        <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-mono text-[10px] mt-6 tracking-widest uppercase animate-pulse">Accessing Question Bank...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <span className="text-xl">⚠️</span>
        </div>
        <h4 className="text-white font-bold mb-2">Terminal Failure</h4>
        <p className="text-slate-400 mb-8 max-w-xs text-xs font-mono">{error.message}</p>
        <div className="flex gap-3">
          {error.code === 'AUTH' ? (
            <button 
              onClick={handleReauth} 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-900/40 uppercase tracking-widest"
            >
              Authenticate Terminal
            </button>
          ) : (
            <button 
              onClick={fetchQuestion} 
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all border border-slate-700 uppercase tracking-widest"
            >
              Reboot Matrix
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl max-w-2xl mx-auto transition-all animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Active Assessment</span>
        </div>
        <span className="text-slate-500 font-mono text-xs">Score: <span className="text-blue-400 font-bold">{score}</span></span>
      </div>

      <h3 className="text-lg font-bold mb-8 text-white leading-relaxed">{question.question}</h3>

      <div className="space-y-3 mb-8">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
              selected === i 
                ? (isCorrect ? 'bg-green-600/10 border-green-500 text-green-100' : 'bg-red-600/10 border-red-500 text-red-100')
                : (selected !== null && i === question.correctAnswer ? 'bg-green-600/10 border-green-500/50 text-green-200' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 text-slate-300')
            }`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
              selected === i 
                ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                : 'bg-slate-700 text-slate-400'
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm font-medium">{option}</span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 pt-6 border-t border-slate-800">
          <div className={`p-4 rounded-xl border mb-6 ${isCorrect ? 'bg-green-950/20 border-green-500/20' : 'bg-red-950/20 border-red-500/20'}`}>
            <p className="text-slate-400 text-xs leading-relaxed italic">{question.explanation}</p>
          </div>
          <button onClick={fetchQuestion} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-widest">
            Next Challenge
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;