"use client";

import React from "react";
import Link from "next/link";

type ProjectProgressPreviewProps = {
  projectId: string;
  progress: number;
  milestones: {
    title: string;
    completedAt?: string;
    isCompleted: boolean;
  }[];
};

export default function ProjectProgressPreview({
  projectId,
  progress,
  milestones,
}: ProjectProgressPreviewProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Project Progress</h2>
        <Link
          href={`/projects/${projectId}/progress`}
          className="text-sm text-pink-300 hover:text-pink-400 transition-colors flex items-center"
        >
          <span>View Timeline</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white/70">{progress}% complete</span>
          <span className="text-white/70">
            {milestones.filter((m) => m.isCompleted).length}/{milestones.length}{" "}
            milestones
          </span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Condensed timeline preview */}
      <div className="relative">
        {/* Main vertical line */}
        <div className="absolute left-2.5 top-0 h-full w-0.5 bg-white/10"></div>

        {/* Milestone previews */}
        <div className="space-y-3 pl-7 relative">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative pb-2">
              {/* Circle marker */}
              <div
                className={`absolute left-[-20px] top-0.5 w-5 h-5 rounded-full border ${
                  milestone.isCompleted
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 border-white"
                    : "bg-white/5 border-white/30"
                } flex items-center justify-center z-10`}
              >
                {milestone.isCompleted && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Milestone content */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${
                    milestone.isCompleted ? "text-white" : "text-white/50"
                  } font-medium`}
                >
                  {milestone.title}
                </span>
                {milestone.completedAt && (
                  <span className="text-xs text-white/40">
                    {milestone.completedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View full timeline button */}
      <div className="mt-5 pt-3 border-t border-white/10">
        <Link
          href={`/projects/${projectId}/progress`}
          className="w-full inline-flex justify-center items-center px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          View Complete Timeline
        </Link>
      </div>
    </div>
  );
}
