"use client";

import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string | number;
    type: "increase" | "decrease";
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  className,
}: StatCardProps) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 transition-all hover:shadow-xl hover:bg-white/20 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-xl text-white">
          {icon}
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center">
          {change.type === "increase" ? (
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0L12 8.414l-2.293 2.293A1 1 0 019 11a1 1 0 01-.707-.293L7 9.414V13H12z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
          <span
            className={`ml-2 text-sm font-medium ${
              change.type === "increase" ? "text-green-400" : "text-red-400"
            }`}
          >
            {change.value}{" "}
            {change.type === "increase" ? "increase" : "decrease"}
          </span>
        </div>
      )}
    </div>
  );
}
