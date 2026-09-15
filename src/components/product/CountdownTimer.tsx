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
  const calculateTime = (target: string | Date) => {
    const difference = +new Date(target) - +new Date();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTime(targetDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const expired = calculateTime(targetDate).isExpired;
    if (expired) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      const result = calculateTime(targetDate);
      setTimeLeft(result);
      if (result.isExpired && onExpire) {
        onExpire();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (!isMounted) {
    return (
      <div className={`inline-flex items-center gap-1 text-gray-400 text-xs font-medium ${className}`}>
        <span className="tabular-nums">--:--:--</span>
      </div>
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
      <div className="flex items-center gap-1.5 text-foreground font-extrabold text-sm tabular-nums">
        <div className="flex flex-col items-center gap-0.5">
          <span className="bg-white border border-gray-200 rounded px-2 py-1 min-w-[32px] text-center shadow-sm text-base font-bold">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">hour</span>
        </div>
        <span className="text-gray-300 font-bold text-base mb-3">:</span>
        <div className="flex flex-col items-center gap-0.5">
          <span className="bg-white border border-gray-200 rounded px-2 py-1 min-w-[32px] text-center shadow-sm text-base font-bold">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">min</span>
        </div>
        <span className="text-gray-300 font-bold text-base mb-3">:</span>
        <div className="flex flex-col items-center gap-0.5">
          <span className="bg-white border border-gray-200 rounded px-2 py-1 min-w-[32px] text-center shadow-sm text-base font-bold">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">sec</span>
        </div>
      </div>
    </div>
  );
}
