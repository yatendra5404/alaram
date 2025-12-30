import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, ChevronUp, ChevronDown } from 'lucide-react';

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const [h, setH] = useState(0);
  const [m, setM] = useState(5);
  const [s, setS] = useState(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      const totalSeconds = (h * 3600) + (m * 60) + s;
      if (totalSeconds === 0) return;
      setDuration(totalSeconds);
      setTimeLeft(totalSeconds);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setDuration(0);
  };

  const formatDisplay = (secTotal: number) => {
    const hours = Math.floor(secTotal / 3600);
    const minutes = Math.floor((secTotal % 3600) / 60);
    const seconds = secTotal % 60;
    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0')
    };
  };

  const adjustValue = (type: 'h' | 'm' | 's', amount: number) => {
    if (isRunning) return;
    if (type === 'h') setH(prev => Math.max(0, Math.min(23, prev + amount)));
    if (type === 'm') setM(prev => Math.max(0, Math.min(59, prev + amount)));
    if (type === 's') setS(prev => Math.max(0, Math.min(59, prev + amount)));
  };

  const progress = duration > 0 ? (timeLeft / duration) * 100 : 0;
  const { h: dh, m: dm, s: ds } = formatDisplay(timeLeft > 0 ? timeLeft : (h * 3600 + m * 60 + s));
  
  // RADIUS REDUCED TO ENSURE NO CLIPPING
  const radius = 110; 
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center space-y-12 sm:space-y-16 py-10">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center animate-floating">
        {/* VIEWBOX ADDED TO ENSURE STROKE IS NOT CUT */}
        <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="150" cy="150" r={radius} stroke="currentColor" strokeWidth="2" fill="transparent" className="text-zinc-900/50" />
          <circle 
            cx="150" cy="150" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" 
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * (timeLeft > 0 ? progress : 100)) / 100}
            className={`${timeLeft > 0 ? 'text-cyan-500' : 'text-zinc-800'} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center space-x-1 sm:space-x-2 font-orbitron">
            <TimeUnit value={dh} label="HH" onUp={() => adjustValue('h', 1)} onDown={() => adjustValue('h', -1)} disabled={isRunning || timeLeft > 0} />
            <span className="text-2xl sm:text-4xl font-light text-zinc-700 mb-6">:</span>
            <TimeUnit value={dm} label="MM" onUp={() => adjustValue('m', 1)} onDown={() => adjustValue('m', -1)} disabled={isRunning || timeLeft > 0} />
            <span className="text-2xl sm:text-4xl font-light text-zinc-700 mb-6">:</span>
            <TimeUnit value={ds} label="SS" onUp={() => adjustValue('s', 1)} onDown={() => adjustValue('s', -1)} disabled={isRunning || timeLeft > 0} />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="w-10 sm:w-12 h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 animate-pulse" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <button onClick={resetTimer} className="w-14 h-14 rounded-full glass border-white/5 text-zinc-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95">
          <RotateCcw size={20} />
        </button>
        <button onClick={toggleTimer} className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all shadow-2xl relative group ${isRunning ? 'bg-magenta-500/20 border-2 border-magenta-500 text-magenta-400' : 'bg-cyan-500 text-black border-none'}`}>
          {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1 relative z-10" />}
        </button>
        <div className="w-14 h-14 opacity-0 pointer-events-none"></div>
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: string;
  label: string;
  onUp: () => void;
  onDown: () => void;
  disabled?: boolean;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, onUp, onDown, disabled }) => (
  <div className="flex flex-col items-center">
    {!disabled && <button onClick={onUp} className="p-1 text-zinc-600 hover:text-cyan-500"><ChevronUp size={20} /></button>}
    <span className={`text-4xl sm:text-6xl font-black transition-colors ${!disabled ? 'text-white' : 'text-cyan-500 glow-cyan'}`}>{value}</span>
    <span className="text-[7px] sm:text-[9px] font-black text-zinc-700 tracking-widest mt-1">{label}</span>
    {!disabled && <button onClick={onDown} className="p-1 text-zinc-600 hover:text-cyan-500"><ChevronDown size={20} /></button>}
  </div>
);

export default Timer;