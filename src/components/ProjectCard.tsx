"use client";

import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  team: {
    id: string;
    name: string;
    avatar: string;
  }[];
  status: "in-progress" | "completed" | "delayed" | "on-hold";
  type?: string;
  className?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  progress,
  dueDate,
  team,
  status,
  type,
  className,
}: ProjectCardProps) {
  const statusClasses = {
    "in-progress": "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    completed: "bg-green-500/20 text-green-300 border border-green-500/30",
    delayed: "bg-red-500/20 text-red-300 border border-red-500/30",
    "on-hold": "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  };

  const statusLabels = {
    "in-progress": "In Progress",
    completed: "Completed",
    delayed: "Delayed",
    "on-hold": "On Hold",
  };

  const typeColors: Record<string, string> = {
    Web: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    Mobile: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    Marketing: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    Design: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    Default: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
  };

  const progressColor =
    progress >= 75
      ? "bg-gradient-to-r from-green-500 to-green-400"
      : progress >= 50
      ? "bg-gradient-to-r from-blue-500 to-blue-400"
      : progress >= 25
      ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
      : "bg-gradient-to-r from-red-500 to-red-400";

  return (
    <Link href={`/projects/${id}`} className="block">
      <div
        className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 transition-all hover:bg-white/20 hover:shadow-xl ${className}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-lg font-semibold text-white">{title}</p>
              {type && (
                <span
                  className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                    typeColors[type] || typeColors.Default
                  }`}
                >
                  {type}
                </span>
              )}
            </div>
            <p className="text-sm text-white/70 mt-1">{description}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-lg text-xs font-medium ${statusClasses[status]}`}
          >
            {statusLabels[status]}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-white/70">Progress</span>
            <span className="text-sm font-medium text-white/70">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full ${progressColor}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {team.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full border-2 border-white/20 bg-gradient-to-br from-pink-500 to-purple-600 overflow-hidden"
                title={member.name}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
            ))}
            {team.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/20 flex items-center justify-center text-xs font-semibold text-white">
                +{team.length - 3}
              </div>
            )}
          </div>
          <div className="text-sm text-white/70">Due {dueDate}</div>
        </div>
      </div>
    </Link>
  );
}
