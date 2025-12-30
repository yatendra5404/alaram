import React, { useState, useEffect } from 'react';
import { WorldCity, TimeFormat } from '../types';
import { Globe, Plus, X, Sun, Moon, Search } from 'lucide-react';

interface WorldClockProps {
  format?: TimeFormat;
}

const WorldClock: React.FC<WorldClockProps> = ({ format = '24h' }) => {
  const [cities, setCities] = useState<WorldCity[]>([
    { id: '1', name: 'New York', timezone: 'America/New_York' },
    { id: '2', name: 'London', timezone: 'Europe/London' },
    { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { id: '4', name: 'Dubai', timezone: 'Asia/Dubai' },
    { id: '5', name: 'Singapore', timezone: 'Asia/Singapore' },
    { id: '6', name: 'Berlin', timezone: 'Europe/Berlin' }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeInZone = (timezone: string) => {
    return new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
  };

  const removeCity = (id: string) => {
    setCities(cities.filter(c => c.id !== id));
  };

  const formatZoneTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    if (format === '12h') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      return { time: `${h12.toString().padStart(2, '0')}:${minutes}`, ampm };
    }
    
    return { time: `${hours.toString().padStart(2, '0')}:${minutes}`, ampm: '' };
  };

  const isDay = (date: Date) => {
    const hours = date.getHours();
    return hours >= 6 && hours < 18;
  };

  return (
    <div className="w-full max-w-4xl space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/50 pb-4">
        <h2 className="text-xs font-black tracking-[0.4em] text-zinc-500 uppercase">Global Temporal Status</h2>
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
             <input type="text" placeholder="Search Matrix..." className="bg-black/40 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-zinc-400 focus:border-cyan-500 outline-none w-full sm:w-48 transition-all" />
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all uppercase tracking-wider whitespace-nowrap">
            <Plus size={14} />
            <span>Link Node</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(city => {
          const zoneTime = getTimeInZone(city.timezone);
          const dayStatus = isDay(zoneTime);
          const { time, ampm } = formatZoneTime(zoneTime);
          
          return (
            <div key={city.id} className="glass p-6 rounded-[2rem] relative group border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
              {/* Card background ambient glow */}
              <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-20 transition-all ${dayStatus ? 'bg-amber-500' : 'bg-indigo-500'}`}></div>
              
              <div className={`absolute top-0 right-0 p-4 transition-colors ${dayStatus ? 'text-amber-500' : 'text-indigo-400'}`}>
                {dayStatus ? <Sun size={20} /> : <Moon size={20} />}
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-[0.2em] text-cyan-500 uppercase">{city.name}</span>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{city.timezone.split('/')[0]} SYNC</span>
                </div>
                
                <div className="flex items-baseline space-x-1">
                  <span className="text-5xl font-black font-orbitron tracking-tighter">{time}</span>
                  {ampm && <span className="text-xs font-black font-orbitron text-cyan-500/60 uppercase ml-1">{ampm}</span>}
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,1)]"></div>
                    <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">Sync: Stable</span>
                  </div>
                  <button 
                    onClick={() => removeCity(city.id)}
                    className="p-1 text-zinc-700 hover:text-magenta-500 transition-all hover:bg-magenta-500/10 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center py-10">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all rounded-full"></div>
          <Globe size={140} className="text-cyan-500/10 group-hover:text-cyan-500/30 transition-all duration-1000 group-hover:rotate-[360deg]" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 bg-black/60 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-sm">Scan Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;