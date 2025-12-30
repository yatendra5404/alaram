import React, { useState, useEffect } from 'react';
import { TimeFormat } from '../types';

interface FuturisticClockProps {
  format?: TimeFormat;
}

const FuturisticClock: React.FC<FuturisticClockProps> = ({ format = '24h' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeParts = (date: Date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    if (format === '12h') {
      hours = hours % 12;
      hours = hours ? hours : 12; 
    }
    
    const hStr = hours.toString().padStart(2, '0');
    const mStr = date.getMinutes().toString().padStart(2, '0');
    const sStr = date.getSeconds().toString().padStart(2, '0');
    
    return { hours: hStr, minutes: mStr, seconds: sStr, ampm };
  };

  const { hours, minutes, seconds, ampm } = formatTimeParts(time);
  const dayName = time.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

  // Progress calculations for rings
  const secProgress = (time.getSeconds() / 60) * 100;
  const minProgress = (time.getMinutes() / 60) * 100;
  const radius = 180;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-20 relative overflow-visible rounded-[3rem] glass border-white/5 w-full max-w-4xl mx-auto shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      {/* Orbital Mechanics */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[120%] h-[120%] opacity-20 -rotate-90">
          {/* Second Ring */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
          <circle 
            cx="200" cy="200" r="180" fill="none" 
            stroke="var(--cyan)" strokeWidth="2" 
            strokeDasharray={2 * Math.PI * 180}
            strokeDashoffset={2 * Math.PI * 180 * (1 - time.getSeconds()/60)}
            className="transition-all duration-1000"
          />
          {/* Minute Ring */}
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(217,70,239,0.05)" strokeWidth="4" />
          <circle 
            cx="200" cy="200" r="160" fill="none" 
            stroke="var(--magenta)" strokeWidth="2" 
            strokeDasharray={2 * Math.PI * 160}
            strokeDashoffset={2 * Math.PI * 160 * (1 - time.getMinutes()/60)}
            className="transition-all duration-1000"
          />
        </svg>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-8 left-8 flex flex-col space-y-1">
        <span className="text-[8px] text-cyan-500/50 font-black tracking-[0.2em]">LAT_SYNC: {Math.random().toFixed(4)}ms</span>
        <div className="w-12 h-[1px] bg-cyan-500/20"></div>
        <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.1em]">Orbital_Link_Active</span>
      </div>

      <div className="text-center relative z-10 w-full flex flex-col items-center">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
          <span className="text-cyan-500 text-[10px] sm:text-xs tracking-[0.6em] font-black uppercase font-orbitron glow-cyan">
            {dayName} — {dateStr}
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 sm:space-x-6">
          <div className="flex flex-col items-center">
             <span className="text-7xl sm:text-9xl md:text-[10rem] font-black font-orbitron tracking-tighter text-white glow-cyan leading-none">
                {hours}
             </span>
             <span className="text-[9px] text-zinc-600 tracking-[0.4em] font-black uppercase mt-2">Hours</span>
          </div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-2 h-2 rounded-full bg-magenta-500 animate-pulse mb-4 shadow-[0_0_10px_rgba(217,70,239,1)]"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" style={{animationDelay: '0.5s'}}></div>
          </div>

          <div className="flex flex-col items-center">
             <span className="text-7xl sm:text-9xl md:text-[10rem] font-black font-orbitron tracking-tighter text-white glow-cyan leading-none">
                {minutes}
             </span>
             <span className="text-[9px] text-zinc-600 tracking-[0.4em] font-black uppercase mt-2">Minutes</span>
          </div>

          <div className="flex flex-col items-center pl-4 sm:pl-10 self-end mb-4">
             <span className="text-3xl sm:text-5xl font-black font-orbitron text-magenta-500 glow-magenta">
                {seconds}
             </span>
             {format === '12h' && <span className="text-xs font-black text-cyan-500 mt-1">{ampm}</span>}
          </div>
        </div>

        <div className="mt-12 flex space-x-12 items-center text-[8px] tracking-[0.5em] text-cyan-500/40 font-black uppercase">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded bg-cyan-500/20 flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-500 rounded-sm"></div>
            </div>
            <span>Core Integrity</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-zinc-500">Flux:</span>
            <span className="text-cyan-500">Stable</span>
          </div>
        </div>
      </div>

      {/* Decorative Corner Readouts */}
      <div className="absolute bottom-6 right-8 text-right flex flex-col items-end opacity-40">
        <div className="text-[6px] font-mono leading-tight">
          01101001 01101110 01101001 01110100<br/>
          SYNC_PROTOCOL_V4.2<br/>
          BUFFER_LOADED_OK
        </div>
      </div>
    </div>
  );
};

export default FuturisticClock;