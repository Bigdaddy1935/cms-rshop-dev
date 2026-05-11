import { ReactNode } from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: {
    from: string;
    to: string;
    border: string;
    text: string;
    icon: string;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon, color, className = "" }: StatCardProps) => {
  return (
    <div 
      className={`
        bg-gradient-to-r ${color.from} ${color.to} 
        border ${color.border} rounded-xl p-4 
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${color.text}`}>{title}</p>
          <p className={`text-2xl font-bold ${color.icon}`}>
            {value}
          </p>
        </div>
        <div className={`text-3xl ${color.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};