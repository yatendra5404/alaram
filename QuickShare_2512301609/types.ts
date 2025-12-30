export type AlarmMood = 'Motivating' | 'Calm' | 'Aggressive' | 'Zen' | 'Intellectual';
export type TimeFormat = '12h' | '24h';
export type ViewType = 'Alarms' | 'Stopwatch' | 'Timer' | 'WorldClock'; 

export interface Alarm { 
  id: string; 
  numericId: number; // Required for Native Android AlarmManager 
  time: string; 
  label: string; 
  isActive: boolean; 
  days: number[]; 
  mood: AlarmMood; 
  isRepeating: boolean; 
  lastTriggered?: string; 
}