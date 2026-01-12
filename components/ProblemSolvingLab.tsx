
import React, { useState } from 'react';
import { Icons } from '../constants';

interface Challenge {
  id: number;
  title: string;
  scenario: string;
  flaw: string;
  options: {
    text: string;
    isOptimal: boolean;
    feedback: string;
  }[];
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "The Flat Network Crisis",
    scenario: "A medium-sized KKU department has all its workstations, the web server, and the research database on the same VLAN (192.168.1.0/24). A student's laptop in the lab was infected with Ransomware.",
    flaw: "Lack of network segmentation allows the ransomware to spread laterally to the research database via simple SMB scanning.",
    options: [
      {
        text: "Install a stronger Anti-Virus on all workstations.",
        isOptimal: false,
        feedback: "AV is a host-based control. It doesn't solve the architectural flaw of a flat network. The attacker can still pivot if they bypass the AV."
      },
      {
        text: "Implement VLAN Segmentation and an Internal Firewall (Micro-segmentation).",
        isOptimal: true,
        feedback: "Correct! By placing the database in a private VLAN and restricting access via a firewall, you stop lateral movement even if a workstation is compromised."
      },
      {
        text: "Change all administrative passwords to be more complex.",
        isOptimal: false,
        feedback: "Complex passwords are good, but many lateral movement techniques (like Pass-the-Hash) don't require the plaintext password."
      }
    ]
  },
  {
    id: 2,
    title: "Exposed API Endpoint",
    scenario: "An engineering project uses an API to report sensor data to a cloud database. The API key is currently hardcoded in the frontend JavaScript code of the dashboard.",
    flaw: "Anyone who views the source code of the dashboard can steal the API key and delete or modify research data.",
    options: [
      {
        text: "Obfuscate the JavaScript code to make it harder to read.",
        isOptimal: false,
        feedback: "Obfuscation is not security. It only delays a determined attacker for a few minutes."
      },
      {
        text: "Move the API call to a backend proxy server and use Environment Variables.",
        isOptimal: true,
        feedback: "Perfect. The frontend calls your server, and your server (securely holding the key) calls the API. The key never reaches the client."
      },
      {
        text: "Set the API key to expire every 24 hours.",
        isOptimal: false,
        feedback: "While rotation is good, it doesn't fix the fundamental leak. The attacker just needs to refresh the page to get the new key."
      }
    ]
  }
];

const ProblemSolvingLab: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const challenge = challenges[currentIdx];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setShowFeedback(true);
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentIdx((prev) => (prev + 1) % challenges.length);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-blue-900/20 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Architectural Challenge #{challenge.id}</h3>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded border border-blue-500/30 uppercase">System Design</span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] font-bold rounded border border-purple-500/30 uppercase">Problem Solving</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500 font-bold uppercase mb-1">Success Rate</div>
             <div className="text-lg font-mono text-green-400 font-bold">84%</div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> The Scenario
                </h4>
                <p className="text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  {challenge.scenario}
                </p>
              </section>

              <section>
                <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Critical Flaw
                </h4>
                <p className="text-slate-400 italic text-sm border-l-2 border-red-500/50 pl-4 py-1">
                  {challenge.flaw}
                </p>
              </section>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Proposed Engineering Fixes</h4>
              {challenge.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={showFeedback}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                    selectedOption === i 
                      ? (opt.isOptimal ? 'bg-green-600/10 border-green-500' : 'bg-red-600/10 border-red-500')
                      : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      selectedOption === i 
                        ? (opt.isOptimal ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm font-medium ${selectedOption === i ? 'text-white' : 'text-slate-300'}`}>
                      {opt.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div className="animate-in slide-in-from-top-4 fade-in duration-500 bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full shrink-0 ${challenge.options[selectedOption!].isOptimal ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {challenge.options[selectedOption!].isOptimal ? <Icons.Shield /> : <Icons.Alert />}
                </div>
                <div>
                  <h5 className={`font-bold mb-1 ${challenge.options[selectedOption!].isOptimal ? 'text-green-400' : 'text-red-400'}`}>
                    {challenge.options[selectedOption!].isOptimal ? 'Optimal Engineering Choice' : 'Sub-optimal Approach'}
                  </h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {challenge.options[selectedOption!].feedback}
                  </p>
                  <button 
                    onClick={nextChallenge}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Next Challenge →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 flex items-start gap-4">
         <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 border-2 border-blue-400">
           <Icons.Brain />
         </div>
         <div>
           <h4 className="font-bold text-blue-400 mb-1">Problem Solving Methodology</h4>
           <p className="text-xs text-slate-400 leading-relaxed">
             In computer engineering, we don't just 'patch' problems. We look for the root cause in the system architecture. When solving these challenges, ask yourself: <em>Is this fix scalable? Does it adhere to the principle of Least Privilege? Does it eliminate the entire class of vulnerability?</em>
           </p>
         </div>
      </div>
    </div>
  );
};

export default ProblemSolvingLab;
