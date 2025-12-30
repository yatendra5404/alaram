
import React, { useState } from 'react';
import { Reminder } from '../types';
import { Plus, Check, Trash2, Calendar } from 'lucide-react';

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [inputText, setInputText] = useState('');
  const [inputTime, setInputTime] = useState('12:00');

  const addReminder = () => {
    if (!inputText) return;
    const newRem: Reminder = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      time: inputTime,
      isCompleted: false
    };
    setReminders([newRem, ...reminders]);
    setInputText('');
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, isCompleted: !r.isCompleted } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="w-full max-w-4xl flex flex-col space-y-8 h-full">
      <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
        <h3 className="text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">Input Neural Hook</h3>
        <div className="flex space-x-3">
          <input 
            type="text" 
            placeholder="System Task..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 focus:border-cyan-500 outline-none transition-all"
          />
          <input 
            type="time" 
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-cyan-500 font-bold outline-none"
          />
          <button 
            onClick={addReminder}
            className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center space-x-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Connect</span>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-4 pr-2">
        {reminders.map(r => (
          <div key={r.id} className={`glass p-4 rounded-2xl flex justify-between items-center group transition-all duration-500 ${r.isCompleted ? 'opacity-40 grayscale' : 'border-l-4 border-l-cyan-500'}`}>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => toggleReminder(r.id)}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${r.isCompleted ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-zinc-700 text-transparent'}`}
              >
                <Check size={14} />
              </button>
              <div>
                <p className={`text-lg font-medium tracking-wide ${r.isCompleted ? 'line-through text-zinc-500' : 'text-white'}`}>{r.text}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar size={10} className="text-cyan-500" />
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{r.time} LOCAL SYNC</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => deleteReminder(r.id)}
              className="p-2 text-zinc-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {reminders.length === 0 && (
          <div className="py-20 text-center text-zinc-700 border border-dashed border-zinc-800 rounded-3xl">
            <p className="font-orbitron tracking-[0.2em] text-sm uppercase">Neural Buffer Clear</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;
