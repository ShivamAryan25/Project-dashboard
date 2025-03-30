"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

type TaskDetailModalProps = {
  task: {
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
  } | null;
  onClose: () => void;
};

export default function TaskDetailModal({
  task,
  onClose,
}: TaskDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!task) return null;

  // Parse dates
  const startDate = new Date(task.start);
  const endDate = new Date(task.end);

  // Format date and time
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Calculate duration in hours and minutes
  const calculateDuration = () => {
    const durationMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `${minutes} min`;
    } else if (minutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${minutes} min`;
    }
  };

  // Generate background color based on priority
  const getPriorityBadge = () => {
    switch (task.priority) {
      case "high":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
            High Priority
          </span>
        );
      case "medium":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Medium Priority
          </span>
        );
      case "low":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            Low Priority
          </span>
        );
      default:
        return null;
    }
  };

  // Generate status badge
  const getStatusBadge = () => {
    switch (task.status) {
      case "completed":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            In Progress
          </span>
        );
      case "delayed":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
            Delayed
          </span>
        );
      case "upcoming":
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto"
        style={{ animation: "scale-in 0.2s ease-out" }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {task.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {getStatusBadge()}
            {getPriorityBadge()}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date and Time
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatDate(startDate)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatTime(startDate)} - {formatTime(endDate)} (
                  {calculateDuration()})
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project
                </h3>
                <Link
                  href={`/projects/${task.projectId}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                >
                  {task.projectName}
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assigned to
                </h3>
                <div className="flex items-center mt-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs mr-2 ${getAvatarColor(
                      task.assignee.id
                    )}`}
                  >
                    {getInitials(task.assignee.name)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {task.assignee.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  This is a placeholder for the task description. In a real
                  application, this would contain the detailed description of
                  the task.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comments
                </h3>
                <div className="mt-2 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs">
                      JD
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        John Doe
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Let&apos;s discuss this during our next meeting.
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                        2 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 font-medium text-sm">
              Complete Task
            </button>
            <Link
              href={`/projects/${task.projectId}/tasks/${task.id}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-medium text-sm"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
