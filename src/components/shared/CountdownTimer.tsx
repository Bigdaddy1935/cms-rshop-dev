"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  endDate: string; // تاریخ پایان به صورت ISO string (مثلاً: "2024-06-30T23:59:59.000Z")
  className?: string;
  showLabels?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  className = "",
  showLabels = true,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const difference = end - now;

      // اگر تاریخ منقضی شده
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          isExpired: true,
        });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        isExpired: false,
      });
    };

    // محاسبه اولیه
    calculateTimeLeft();

    // ست کردن interval برای به‌روزرسانی هر ثانیه
    const timerId = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timerId);
  }, [endDate]);

  // اگر تاریخ گذشته باشد
  if (timeLeft.isExpired) {
    return (
      <div
        className={`inline-flex items-center bg-black/50 border border-gray-400 text-white px-3 py-1 rounded-lg ${className}`}
      >
        <span className="text-sm font-medium">منقضی شده</span>
      </div>
    );
  }

  // فرمت نمایش اعداد (دو رقمی)
  const formatNumber = (num: number) => num.toString().padStart(2, "۰");
  const count = "bg-white/25 p-1 px-2 rounded-lg w-10"

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex flex-row-reverse items-center gap-1">
        {/* روز */}
        {timeLeft.days > 0 && (
          <div className={`flex flex-col items-center ${count}`}>
            <span className="text-white font-bold text-sm">
              {formatNumber(timeLeft.days)}
            </span>
            {showLabels && (
              <span className="text-gray-300 text-[10px]">روز</span>
            )}
          </div>
        )}

        {/* ساعت */}
        <div className={`flex flex-col items-center ${count}`}>
          <span className="text-white font-bold text-sm">
            {formatNumber(timeLeft.hours)}
          </span>
          {showLabels && (
            <span className="text-gray-300 text-[10px]">ساعت</span>
          )}
        </div>

        {/* دقیقه */}
        <div className={`flex flex-col items-center ${count}`}>
          <span className="text-white font-bold text-sm">
            {formatNumber(timeLeft.minutes)}
          </span>
          {showLabels && (
            <span className="text-gray-300 text-[10px]">دقیقه</span>
          )}
        </div>

        {/* ثانیه */}
        <div className={`flex flex-col items-center ${count}`}>
          <span className="text-white font-bold text-sm">
            {formatNumber(timeLeft.seconds)}
          </span>
          {showLabels && (
            <span className="text-gray-300 text-[10px]">ثانیه</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
