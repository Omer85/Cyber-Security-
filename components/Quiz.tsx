
import React, { useState, useEffect } from 'react';
import { generateQuizQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';

interface ExtendedQuizQuestion extends QuizQuestion {
  explanation: string;
}

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<ExtendedQuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuestion = async () => {
    setLoading(true);
    setSelected(null);
    setIsCorrect(null);
    const data = await generateQuizQuestion("Network Security & Threat Analysis");
    if (data) setQuestion(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === question?.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900 rounded-2xl border border-slate-800">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium animate-pulse">Consulting CyberShield AI for a challenge...</p>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl max-w-2xl mx-auto transition-all">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Level: Professional</span>
        <span className="text-slate-400 font-mono text-sm">EXP: {score * 150}</span>
      </div>

      <h3 className="text-xl font-bold mb-8 text-white leading-relaxed">{question.question}</h3>

      <div className="space-y-3 mb-8">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
              selected === i 
                ? (isCorrect ? 'bg-green-600/20 border-green-500 text-green-100' : 'bg-red-600/20 border-red-500 text-red-100')
                : (selected !== null && i === question.correctAnswer ? 'bg-green-600/20 border-green-500 text-green-100' : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300 shadow-sm')
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${selected === i ? 'bg-white/10' : 'bg-slate-700'}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className={`p-6 rounded-xl border mb-6 ${isCorrect ? 'bg-green-950/20 border-green-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
            <h4 className={`font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Access Granted' : 'Defense Breached'}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={fetchQuestion}
              className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-900/40 transform hover:scale-105 active:scale-95"
            >
              Request New Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
