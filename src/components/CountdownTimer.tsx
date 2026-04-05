import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
  label: string;
}

const CountdownTimer = ({ targetDate, label }: CountdownTimerProps) => {
  const calcTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(calcTimeLeft), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const blocks = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <div className="inline-flex flex-col items-center">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">{label}</p>
      <div className="flex gap-3 md:gap-4">
        {blocks.map((b) => (
          <div key={b.label} className="glass rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[85px]">
            <span className="font-display text-3xl md:text-4xl font-bold text-foreground block">
              {String(b.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
