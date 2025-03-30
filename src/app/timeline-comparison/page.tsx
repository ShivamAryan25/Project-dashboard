"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectTimeline from "@/components/ProjectTimeline";
import Link from "next/link";

type TimelineStep = {
  year: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  color: string;
};

type ProjectTimelineData = {
  timeline: TimelineStep[];
  name: string;
};

export default function TimelineComparisonPage() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([
    "1",
    "2",
  ]);
  const [projectData, setProjectData] = useState<
    Record<string, ProjectTimelineData>
  >({});
  const [loading, setLoading] = useState(true);

  // Mock project data
  const availableProjects = [
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "Marketing Campaign" },
    { id: "4", name: "E-commerce Platform" },
    { id: "5", name: "Product Launch" },
  ];

  // Function to toggle project selection
  const toggleProjectSelection = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      // Remove if already selected
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      // Add if not selected (limit to 3 max)
      if (selectedProjects.length < 3) {
        setSelectedProjects([...selectedProjects, projectId]);
      }
    }
  };

  // Mock timeline data for projects
  const getProjectTimeline = (projectId: string) => {
    // Base timelines by project ID
    const timelines: Record<string, any> = {
      "1": [
        {
          year: "Dec 2023",
          title: "Website Launch",
          description:
            "Full site launch with content migration, SEO optimization, and analytics integration.",
          color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
          status: "upcoming",
        },
        {
          year: "Nov 2023",
          title: "Testing & QA",
          description:
            "Comprehensive testing phase including browser compatibility, accessibility, and performance optimization.",
          color: "bg-gradient-to-r from-orange-400 to-orange-600",
          status: "in-progress",
        },
        {
          year: "Oct 2023",
          title: "Frontend Development",
          description:
            "Implementation of responsive UI components based on approved designs.",
          color: "bg-gradient-to-r from-pink-400 to-pink-600",
          status: "completed",
        },
        {
          year: "Sep 2023",
          title: "Design Approval",
          description:
            "Finalization of design mockups and interactive prototypes with stakeholder sign-off.",
          color: "bg-gradient-to-r from-blue-400 to-blue-600",
          status: "completed",
        },
        {
          year: "Aug 2023",
          title: "Project Kickoff",
          description:
            "Initial planning, requirements gathering, and project scope definition.",
          color: "bg-gradient-to-r from-purple-400 to-purple-600",
          status: "completed",
        },
      ],
      "2": [
        {
          year: "Mar 2024",
          title: "App Store Release",
          description:
            "Launch on iOS and Android platforms with initial marketing campaign.",
          color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
          status: "upcoming",
        },
        {
          year: "Feb 2024",
          title: "Beta Testing",
          description:
            "Closed beta with selected users, bug fixing and final adjustments.",
          color: "bg-gradient-to-r from-sky-400 to-sky-600",
          status: "upcoming",
        },
        {
          year: "Jan 2024",
          title: "Feature Development",
          description:
            "Implementation of core app features and integration with backend services.",
          color: "bg-gradient-to-r from-violet-400 to-violet-600",
          status: "in-progress",
        },
        {
          year: "Dec 2023",
          title: "UI/UX Design",
          description:
            "Creation of all app screens, user flows, and interactive prototypes.",
          color: "bg-gradient-to-r from-amber-400 to-amber-600",
          status: "completed",
        },
        {
          year: "Nov 2023",
          title: "Project Planning",
          description:
            "Technical requirements, resource allocation, and timeline planning.",
          color: "bg-gradient-to-r from-red-400 to-red-600",
          status: "completed",
        },
      ],
      "3": [
        {
          year: "Sep 2023",
          title: "Campaign Analysis",
          description: "Final performance analysis and ROI reporting.",
          color: "bg-gradient-to-r from-teal-400 to-teal-600",
          status: "completed",
        },
        {
          year: "Aug 2023",
          title: "Campaign Execution",
          description:
            "Launch of all campaign elements across selected channels.",
          color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
          status: "completed",
        },
        {
          year: "Jul 2023",
          title: "Content Creation",
          description:
            "Development of all creative assets and campaign content.",
          color: "bg-gradient-to-r from-rose-400 to-rose-600",
          status: "completed",
        },
        {
          year: "Jun 2023",
          title: "Strategy Development",
          description:
            "Channel selection, targeting parameters, and messaging framework.",
          color: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600",
          status: "completed",
        },
        {
          year: "May 2023",
          title: "Market Research",
          description:
            "Audience analysis, competitor assessment, and market positioning.",
          color: "bg-gradient-to-r from-lime-400 to-lime-600",
          status: "completed",
        },
      ],
      "4": [
        {
          year: "Apr 2024",
          title: "Platform Launch",
          description:
            "Public launch with full feature set and product catalog.",
          color: "bg-gradient-to-r from-purple-400 to-purple-600",
          status: "upcoming",
        },
        {
          year: "Mar 2024",
          title: "Payment Integration",
          description:
            "Integration of multiple payment gateways and checkout flow optimization.",
          color: "bg-gradient-to-r from-blue-400 to-blue-600",
          status: "upcoming",
        },
        {
          year: "Feb 2024",
          title: "Product Database",
          description:
            "Creation of product catalog system and inventory management.",
          color: "bg-gradient-to-r from-pink-400 to-pink-600",
          status: "in-progress",
        },
        {
          year: "Jan 2024",
          title: "User Management",
          description:
            "Development of user authentication, profiles, and permissions.",
          color: "bg-gradient-to-r from-orange-400 to-orange-600",
          status: "in-progress",
        },
        {
          year: "Dec 2023",
          title: "Platform Architecture",
          description:
            "System design, technology stack selection, and database schema.",
          color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
          status: "completed",
        },
      ],
      "5": [
        {
          year: "Jul 2024",
          title: "Post-Launch Analysis",
          description:
            "Performance metrics, customer feedback, and initial sales analysis.",
          color: "bg-gradient-to-r from-amber-400 to-amber-600",
          status: "upcoming",
        },
        {
          year: "Jun 2024",
          title: "Product Launch",
          description:
            "Official product launch with marketing campaign activation.",
          color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
          status: "upcoming",
        },
        {
          year: "May 2024",
          title: "Marketing Preparation",
          description:
            "Launch event planning, press releases, and promotional materials.",
          color: "bg-gradient-to-r from-violet-400 to-violet-600",
          status: "upcoming",
        },
        {
          year: "Apr 2024",
          title: "Production",
          description: "Manufacturing, quality assurance, and packaging.",
          color: "bg-gradient-to-r from-sky-400 to-sky-600",
          status: "upcoming",
        },
        {
          year: "Mar 2024",
          title: "Final Product Testing",
          description:
            "User acceptance testing, final adjustments, and certification.",
          color: "bg-gradient-to-r from-red-400 to-red-600",
          status: "in-progress",
        },
      ],
    };

    return timelines[projectId] || [];
  };

  // Simulate loading project data
  useEffect(() => {
    // Simulate API loading
    setLoading(true);

    const data: Record<string, ProjectTimelineData> = {};

    // Process selected projects
    selectedProjects.forEach((projectId) => {
      const project = availableProjects.find((p) => p.id === projectId);
      if (project) {
        data[projectId] = {
          name: project.name,
          timeline: getProjectTimeline(projectId),
        };
      }
    });

    setTimeout(() => {
      setProjectData(data);
      setLoading(false);
    }, 500);
  }, [selectedProjects, availableProjects]);

  // Calculate timeline stats for each project
  const getTimelineStats = (timelineData: TimelineStep[]) => {
    const completed = timelineData.filter(
      (step) => step.status === "completed"
    ).length;
    const inProgress = timelineData.filter(
      (step) => step.status === "in-progress"
    ).length;
    const upcoming = timelineData.filter(
      (step) => step.status === "upcoming"
    ).length;
    const total = timelineData.length;
    const progressPercentage = Math.round((completed / total) * 100);

    return { completed, inProgress, upcoming, total, progressPercentage };
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Timeline Comparison
            </h1>
            <p className="text-white/70 mt-2">
              Compare project timelines side by side to track progress across
              multiple initiatives
            </p>
          </div>
          <Link
            href="/project-timeline"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
            Timeline Overview
          </Link>
        </div>
      </div>

      {/* Project selector */}
      <div className="mb-6 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">
          Select Projects to Compare (Max 3)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {availableProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => toggleProjectSelection(project.id)}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                selectedProjects.includes(project.id)
                  ? "bg-pink-500/30 text-white border-2 border-pink-500/50"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border-2 border-transparent"
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline comparison grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="p-4 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white/70">Loading timeline data...</p>
          </div>
        </div>
      ) : (
        <div>
          {/* Project progress stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {selectedProjects.map((projectId) => {
              const project = projectData[projectId];
              if (!project) return null;

              const stats = getTimelineStats(project.timeline);

              return (
                <div
                  key={projectId}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {project.name}
                  </h3>

                  {/* Progress bar */}
                  <div className="mt-3 mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white/70">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-white/70">
                        {stats.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                        style={{ width: `${stats.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-green-300 text-lg font-bold">
                        {stats.completed}
                      </div>
                      <div className="text-xs text-white/60">Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-blue-300 text-lg font-bold">
                        {stats.inProgress}
                      </div>
                      <div className="text-xs text-white/60">In Progress</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-gray-300 text-lg font-bold">
                        {stats.upcoming}
                      </div>
                      <div className="text-xs text-white/60">Upcoming</div>
                    </div>
                  </div>

                  <Link
                    href={`/projects/${projectId}/progress`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm mt-4"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Timeline grid */}
          <div className="grid grid-cols-1 gap-6">
            {selectedProjects.map((projectId) => {
              const project = projectData[projectId];
              if (!project) return null;

              return (
                <div key={projectId} className="relative">
                  <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md py-2 mb-2 rounded-t-xl px-4">
                    <h2 className="text-lg font-semibold text-white">
                      {project.name} Timeline
                    </h2>
                  </div>
                  <ProjectTimeline steps={project.timeline} />
                </div>
              );
            })}
          </div>

          {/* No projects selected state */}
          {selectedProjects.length === 0 && (
            <div className="bg-white/5 rounded-xl p-8 text-center">
              <svg
                className="w-16 h-16 text-white/20 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Projects Selected
              </h3>
              <p className="text-white/60 mb-6">
                Select at least one project to view its timeline
              </p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
