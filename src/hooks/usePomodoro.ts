import { useState, useEffect, useCallback, useRef } from 'react';

interface PomodoroSettings {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}

interface UsePomodoroProps {
  onComplete?: () => void;
}

export function usePomodoro({ onComplete }: UsePomodoroProps) {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [settings, setSettings] = useState<PomodoroSettings>({
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  const initialTime = useRef(time);
  const timer = useRef<number>();

  const progress = (time / initialTime.current) * 100;

  const startTimer = useCallback(() => {
    setIsActive(true);
    timer.current = window.setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer.current);
          setIsActive(false);
          onComplete?.();

          if (mode === 'work') {
            setPomodoroCount((prev) => prev + 1);
            const isLongBreak = (pomodoroCount + 1) % 4 === 0;
            const nextMode = isLongBreak ? 'long-break' : 'short-break';
            setMode(nextMode);
            const nextTime = isLongBreak
              ? settings.longBreakTime * 60
              : settings.shortBreakTime * 60;
            initialTime.current = nextTime;
            return nextTime;
          } else {
            setMode('work');
            const workTime = settings.workTime * 60;
            initialTime.current = workTime;
            return workTime;
          }
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [mode, pomodoroCount, settings, onComplete]);

  const pauseTimer = useCallback(() => {
    clearInterval(timer.current);
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timer.current);
    setIsActive(false);
    const workTime = settings.workTime * 60;
    setTime(workTime);
    initialTime.current = workTime;
    setMode('work');
  }, [settings]);

  const updateSettings = useCallback((newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    if (!isActive) {
      const workTime = newSettings.workTime * 60;
      setTime(workTime);
      initialTime.current = workTime;
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return {
    time,
    isActive,
    mode,
    pomodoroCount,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
  };
}
