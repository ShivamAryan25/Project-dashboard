"use client";

import Link from "next/link";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  projectId: string;
  projectName: string;
}

interface TaskListProps {
  tasks: Task[];
  title: string;
  className?: string;
}

export default function TaskList({ tasks, title, className }: TaskListProps) {
  const [taskItems, setTaskItems] = useState<Task[]>(tasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const toggleTaskCompletion = (taskId: string) => {
    setTaskItems(
      taskItems.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const priorityClasses = {
    low: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
    medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    high: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  const priorityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  const filteredTasks = taskItems.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 transition-all hover:bg-white/20 hover:shadow-xl ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex space-x-1 bg-white/5 rounded-lg p-0.5">
          <button
            onClick={() => setFilter("all")}
            className={`text-xs px-3 py-1 rounded-md transition-all ${
              filter === "all"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`text-xs px-3 py-1 rounded-md transition-all ${
              filter === "pending"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`text-xs px-3 py-1 rounded-md transition-all ${
              filter === "completed"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-white/10 rounded-lg">
            <svg
              className="w-12 h-12 mb-2 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-white/50 text-sm">
              No {filter === "all" ? "" : filter} tasks available
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="shrink-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-5 h-5 rounded-md accent-pink-500 bg-white/5 border-white/20 cursor-pointer"
                  />
                </div>
                <div className="ml-3 truncate">
                  <p
                    className={`text-sm font-medium truncate ${
                      task.completed
                        ? "line-through text-white/40"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/projects/${task.projectId}`}
                      className="text-xs text-white/60 hover:text-pink-300 transition-colors truncate max-w-[100px] inline-block"
                    >
                      {task.projectName}
                    </Link>
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                        priorityClasses[task.priority]
                      }`}
                    >
                      {priorityLabels[task.priority]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center ml-2">
                <span className="text-xs text-white/60 px-2">
                  {task.dueDate}
                </span>
                <button className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
