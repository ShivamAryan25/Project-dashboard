"use client";

import React from "react";
import Link from "next/link";

type TaskProps = {
  id: string;
  title: string;
  start: string;
  end: string;
  projectId: string;
  projectName: string;
  status: string;
  priority: string;
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  view?: "month" | "week" | "day";
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function CalendarTask({
  id,
  title,
  start,
  end,
  projectId,
  projectName,
  status,
  priority,
  assignee,
  view = "month",
  style = {},
  onClick,
}: TaskProps) {
  // Parse dates
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Generate background color based on priority
  const getBackgroundColor = () => {
    switch (priority) {
      case "high":
        return "bg-rose-100 dark:bg-rose-900/30 border-l-4 border-rose-500";
      case "medium":
        return "bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500";
      case "low":
        return "bg-emerald-100 dark:bg-emerald-900/30 border-l-4 border-emerald-500";
      default:
        return "bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500";
    }
  };

  // Generate status badge
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            In Progress
          </span>
        );
      case "delayed":
        return (
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
            Delayed
          </span>
        );
      case "upcoming":
        return (
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  // Get initials from assignee name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  // Generate avatar color based on assignee id for consistency
  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];

    // Simple hash function to get a consistent color for each user
    const hash = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Render different views based on the view prop
  if (view === "month") {
    return (
      <div
        className={`px-2 py-1 rounded-sm text-xs overflow-hidden ${getBackgroundColor()} transition-all duration-200 hover:shadow-md hover:brightness-95 dark:hover:brightness-125 cursor-pointer`}
        onClick={onClick}
        style={style}
      >
        <div className="font-medium truncate">{title}</div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {formatTime(startDate)}
          </div>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${getAvatarColor(
              assignee.id
            )}`}
          >
            {getInitials(assignee.name)}
          </div>
        </div>
      </div>
    );
  }

  if (view === "week" || view === "day") {
    return (
      <div
        className={`absolute px-2 py-1 rounded-sm ${getBackgroundColor()} hover:shadow-md transition-all duration-200 cursor-pointer z-10 overflow-hidden group`}
        style={{
          ...style,
          width: "calc(100% - 4px)", // Small gap on the right
          left: "2px",
        }}
        onClick={onClick}
      >
        <div className="font-medium text-xs truncate">{title}</div>
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {formatTime(startDate)} - {formatTime(endDate)}
          </div>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${getAvatarColor(
              assignee.id
            )}`}
          >
            {getInitials(assignee.name)}
          </div>
        </div>

        <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          <button className="p-0.5 rounded bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button className="p-0.5 rounded bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Detailed task view (could be used in popovers/modals)
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        {getStatusBadge()}
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {startDate.toLocaleDateString()} {formatTime(startDate)} -{" "}
            {formatTime(endDate)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <Link
            href={`/projects/${projectId}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {projectName}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${getAvatarColor(
                assignee.id
              )}`}
            >
              {getInitials(assignee.name)}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {assignee.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/projects/${projectId}/tasks/${id}`}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
        >
          View Details
        </Link>
        <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          Mark as Complete
        </button>
      </div>
    </div>
  );
}
