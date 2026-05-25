'use client';

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string | Date;
  onExpire?: () => void;
  className?: string;
  variant?: 'compact' | 'premium' | 'badge';
}

export default function CountdownTimer({
  targetDate,
  onExpire,
  className = '',
  variant = 'premium',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        if (onExpire) onExpire();
        return true;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds, isExpired: false });
      return false;
    };

    const expired = calculateTime();
    if (expired) return;

    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, isMounted, onExpire]);

  if (!isMounted) {
    return (
      <div className={`animate-pulse bg-gray-200/50 rounded-lg h-9 w-32 ${className}`} />
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className={`inline-flex items-center gap-1 bg-red/10 text-red text-xs font-bold px-2.5 py-1 rounded-md border border-red/20 ${className}`}>
        <Flame className="w-3.5 h-3.5 fill-red animate-pulse" />
        <span>Offer Ended</span>
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-accent-dark text-white px-2.5 py-1 rounded-full text-xs font-extrabold shadow-sm ${className}`}>
        <Flame className="w-3.5 h-3.5 fill-white animate-bounce" />
        <span>
          {formatNumber(timeLeft.hours)}h : {formatNumber(timeLeft.minutes)}m : {formatNumber(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1 text-accent font-bold text-sm tracking-wide ${className}`}>
        <Flame className="w-4 h-4 fill-accent animate-pulse" />
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mr-0.5">Ends in:</span>
        <span className="tabular-nums">
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  // Premium design (default)
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1 bg-light-orange/20 border border-accent/20 rounded-lg px-2.5 py-1 shadow-[0_2px_10px_rgba(230,126,34,0.05)]">
        <Flame className="w-4 h-4 text-accent fill-accent animate-bounce mr-1.5" />
        <span className="text-[10px] text-accent-dark font-black uppercase tracking-wider hidden sm:inline mr-1">Flash Ends In</span>
        
        <div className="flex items-center gap-1 text-accent-dark font-extrabold text-sm tabular-nums">
          <div className="flex flex-col items-center">
            <span className="bg-white border border-light-orange rounded px-1.5 py-0.5 min-w-[26px] text-center shadow-sm">
              {formatNumber(timeLeft.hours)}
            </span>
          </div>
          <span className="animate-pulse text-accent/50 font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="bg-white border border-light-orange rounded px-1.5 py-0.5 min-w-[26px] text-center shadow-sm">
              {formatNumber(timeLeft.minutes)}
            </span>
          </div>
          <span className="animate-pulse text-accent/50 font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="bg-white border border-light-orange rounded px-1.5 py-0.5 min-w-[26px] text-center shadow-sm">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
