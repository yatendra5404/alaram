import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return {
      min: minutes.toString().padStart(2, '0'),
      sec: seconds.toString().padStart(2, '0'),
      ms: milliseconds.toString().padStart(2, '0')
    };
  };

  const { min, sec, ms } = formatTime(time);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center space-y-8 sm:space-y-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl animate-pulse-slow"></div>
        <div className="relative flex items-baseline space-x-1 sm:space-x-2 font-orbitron">
          <span className="text-6xl sm:text-7xl md:text-8xl font-black glow-cyan">{min}</span>
          <span className="text-2xl sm:text-4xl text-cyan-500/50">:</span>
          <span className="text-6xl sm:text-7xl md:text-8xl font-black glow-cyan">{sec}</span>
          <span className="text-2xl sm:text-4xl font-bold text-magenta-500 glow-magenta ml-1 sm:ml-2">{ms}</span>
        </div>
      </div>

      <div className="flex space-x-4 sm:space-x-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all ${isRunning ? 'bg-magenta-500/20 border border-magenta-500 text-magenta-400' : 'bg-cyan-500/20 border border-cyan-500 text-cyan-400'}`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={() => { setIsRunning(false); setTime(0); setLaps([]); }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
        >
          <RotateCcw size={24} />
        </button>
        <button
          disabled={!isRunning}
          onClick={() => setLaps([time, ...laps])}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 flex items-center justify-center transition-all disabled:opacity-30"
        >
          <Flag size={24} />
        </button>
      </div>

      <div className="w-full max-h-48 sm:max-h-64 overflow-y-auto space-y-2 pr-2 custom-scroll-container">
        {laps.map((lapTime, index) => {
          const l = formatTime(lapTime);
          return (
            <div key={index} className="glass p-3 sm:p-4 rounded-xl flex justify-between items-center border-white/5 group hover:border-cyan-500/30 transition-all">
              <span className="text-[8px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">LAP {laps.length - index}</span>
              <span className="font-orbitron font-bold text-sm sm:text-base text-cyan-400">{l.min}:{l.sec}.{l.ms}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stopwatch;