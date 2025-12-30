
import React, { useState, useEffect } from 'react';
import { generateMorningBrief } from '../services/geminiService';
import { AlarmMood } from '../types';
import { Sparkles, RefreshCw, Cpu, Activity } from 'lucide-react';

const AIBriefing: React.FC = () => {
  const [brief, setBrief] = useState<{ title: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<AlarmMood>('Motivating');

  const fetchBrief = async () => {
    setLoading(true);
    const result = await generateMorningBrief(selectedMood);
    setBrief(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchBrief();
  }, []);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black font-orbitron text-white tracking-widest uppercase">Neural Brief</h2>
          <p className="text-xs text-cyan-500 tracking-[0.2em] font-bold">GEMINI 3.0 COGNITIVE CORE</p>
        </div>
        <button 
          onClick={fetchBrief}
          disabled={loading}
          className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all disabled:opacity-50"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {(['Motivating', 'Calm', 'Aggressive', 'Zen', 'Intellectual'] as AlarmMood[]).map(m => (
          <button
            key={m}
            onClick={() => setSelectedMood(m)}
            className={`px-3 py-2 text-[10px] font-bold uppercase tracking-tighter rounded-lg border transition-all ${selectedMood === m ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' : 'border-zinc-800 bg-zinc-900 text-zinc-500'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
               <Cpu className="text-cyan-500 w-12 h-12 animate-pulse" />
               <div className="absolute inset-0 bg-cyan-500/20 blur-xl animate-pulse"></div>
            </div>
            <p className="text-cyan-500 animate-pulse font-mono text-xs uppercase tracking-[0.3em]">Synthesizing Neural Stream...</p>
          </div>
        ) : brief ? (
          <div className="glass p-8 w-full max-w-2xl relative group overflow-hidden border-cyan-500/20">
            {/* Animated decorative lines */}
            <div className="absolute top-0 right-0 p-4 opacity-30">
               <Activity size={40} className="text-cyan-500" />
            </div>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                <Sparkles size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold font-orbitron text-white tracking-wider border-b border-cyan-500/20 pb-1">{brief.title}</h3>
            </div>
            
            <p className="text-zinc-300 text-lg leading-relaxed font-light italic font-serif">
              "{brief.body}"
            </p>
            
            <div className="mt-8 flex justify-between items-center text-[9px] uppercase tracking-widest text-zinc-500">
               <span>Origin: Orbital Server 7</span>
               <span>Integrity: 99.4%</span>
               <span>Timestamp: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AIBriefing;
