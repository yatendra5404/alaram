import React from 'react';
import { Alarm, TimeFormat } from '../types';
import { Bell, Trash2, Power, Zap, Moon, Sun, Brain, Repeat, Clock, Activity } from 'lucide-react';

interface AlarmCardProps {
  alarm: Alarm;
  format?: TimeFormat;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const AlarmCard: React.FC<AlarmCardProps> = ({ alarm, format = '24h', onToggle, onDelete }) => {
  const daysLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDisplayTime = (timeStr: string) => {
    if (format === '24h') return { time: timeStr, ampm: '' };
    
    let [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return { 
      time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`, 
      ampm 
    };
  };

  const { time, ampm } = getDisplayTime(alarm.time);

  return (
    <div className={`glass relative overflow-hidden transition-all duration-700 group corner-bracket corner-bracket-tl corner-bracket-br ${alarm.isActive ? 'border-glow-cyan' : 'opacity-40 grayscale-[0.8] scale-[0.98]'}`}>
      <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-magenta-500 transition-all duration-700 ${alarm.isActive ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div className="p-8 flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-2 h-2 rounded-full ${alarm.isActive ? 'bg-cyan-500 animate-pulse shadow-[0_0_8px_cyan]' : 'bg-zinc-800'}`}></div>
              <span className="text-[10px] text-cyan-500/80 font-black tracking-[0.4em] uppercase">{alarm.label || 'TEMPORAL_NODE'}</span>
            </div>
            <div className="flex items-baseline space-x-3">
              <span className="text-5xl sm:text-6xl font-black font-orbitron tracking-tighter text-white glow-cyan">{time}</span>
              {ampm && <span className="text-sm font-black font-orbitron text-magenta-500 glow-magenta uppercase">{ampm}</span>}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => onToggle(alarm.id)}
              className={`w-14 h-14 flex items-center justify-center rounded-2xl border transition-all duration-500 ${alarm.isActive ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.1)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}
            >
              <Power size={24} />
            </button>
            <button 
              onClick={() => onDelete(alarm.id)}
              className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-zinc-600 hover:text-red-500 hover:border-red-500/30 transition-all"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <div className="flex space-x-2">
            {daysLabels.map((day, idx) => {
              const isActive = alarm.days.includes(idx);
              return (
                <span key={idx} className={`text-[8px] w-7 h-7 flex items-center justify-center rounded-xl border-2 font-black transition-all ${isActive ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' : 'border-zinc-900 text-zinc-800 bg-black/40'}`}>
                  {day}
                </span>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 px-4 py-2 bg-black/60 rounded-full border border-white/10 shadow-inner">
            <Activity size={12} className={alarm.isActive ? 'text-cyan-400 animate-pulse' : 'text-zinc-800'} />
            <span className="text-[9px] uppercase font-black tracking-[0.2em] text-zinc-600">{alarm.isRepeating ? 'RECURRING' : 'TRANSIENT'}</span>
          </div>
        </div>
      </div>
      
      {/* HUD Telemetry Overlay on Hover */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-1 bg-cyan-500/40 rounded-full"></div>
        <div className="w-1 h-1 bg-cyan-500/40 rounded-full"></div>
        <div className="w-1 h-1 bg-cyan-500/40 rounded-full"></div>
      </div>
    </div>
  );
};

export default AlarmCard;