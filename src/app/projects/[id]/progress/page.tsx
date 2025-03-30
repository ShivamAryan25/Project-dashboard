"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectTimeline from "@/components/ProjectTimeline";
import TimelineFilter, { TimelineFilters } from "@/components/TimelineFilter";

// Define types for timeline step
interface TimelineStep {
  year: string;
  title: string;
  description: string;
  color: string;
  status: "completed" | "in-progress" | "upcoming";
}

export default function ProjectProgressPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [projectName, setProjectName] = useState<string>("");
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([]);
  const [filteredSteps, setFilteredSteps] = useState<TimelineStep[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to get timeline data based on project ID
  const getTimelineData = useCallback((): TimelineStep[] => {
    // Base timelines by project ID
    const timelines: Record<string, TimelineStep[]> = {
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
  }, [projectId]);

  // Get project name based on ID
  const getProjectTitle = useCallback(() => {
    switch (projectId) {
      case "1":
        return "Website Redesign";
      case "2":
        return "Mobile App Development";
      case "3":
        return "Marketing Campaign";
      case "4":
        return "E-commerce Platform";
      case "5":
        return "Product Launch";
      default:
        return "Unknown Project";
    }
  }, [projectId]);

  // Load project data
  const loadProjectData = useCallback(() => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const projectTitle = getProjectTitle();
      const milestones = getTimelineData();

      setProjectName(projectTitle);
      setTimelineSteps(milestones);
      setFilteredSteps(milestones);
      setLoading(false);
    }, 500);
  }, [getProjectTitle, getTimelineData]);

  // Load project data on mount or when projectId changes
  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  // Handle timeline filter changes
  const handleFilterChange = (filters: TimelineFilters) => {
    // Apply filters to timeline steps
    let filtered = [...timelineSteps];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((step) => step.status === filters.status);
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return filters.sortOrder === "newest-first"
        ? yearB - yearA
        : yearA - yearB;
    });

    setFilteredSteps(filtered);
  };

  // Calculate timeline stats
  const getTimelineStats = () => {
    const completed = timelineSteps.filter(
      (step) => step.status === "completed"
    ).length;
    const inProgress = timelineSteps.filter(
      (step) => step.status === "in-progress"
    ).length;
    const upcoming = timelineSteps.filter(
      (step) => step.status === "upcoming"
    ).length;
    const total = timelineSteps.length;
    const progressPercentage = Math.round((completed / total) * 100);

    return { completed, inProgress, upcoming, total, progressPercentage };
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href={`/projects/${projectId}`}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {projectName} - Progress Timeline
          </h1>
        </div>
        <p className="text-white/70 mt-2">
          A visual representation of the project&apos;s milestones and key
          achievements from inception to completion
        </p>
      </div>

      {/* Timeline Filters */}
      <TimelineFilter onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="p-4 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white/70">Loading timeline data...</p>
          </div>
        </div>
      ) : filteredSteps.length === 0 ? (
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
            No Timeline Data Found
          </h3>
          <p className="text-white/60 mb-6">
            Try adjusting your filters to see more results
          </p>
          <button
            onClick={() =>
              handleFilterChange({
                dateRange: "all",
                status: "all",
                sortOrder: "newest-first",
                groupBy: "none",
              })
            }
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectTimeline steps={filteredSteps} />
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Project Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold">Status</h3>
                  <div className="mt-2 bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-white">On Track</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{
                            width: `${getTimelineStats().progressPercentage}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-white/70">
                        <span>0%</span>
                        <span>
                          {getTimelineStats().progressPercentage}% Complete
                        </span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold">Key Stakeholders</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-white/5 rounded-full px-3 py-1 text-sm text-white/90 border border-white/10">
                      Product Team
                    </div>
                    <div className="bg-white/5 rounded-full px-3 py-1 text-sm text-white/90 border border-white/10">
                      Development
                    </div>
                    <div className="bg-white/5 rounded-full px-3 py-1 text-sm text-white/90 border border-white/10">
                      Marketing
                    </div>
                    <div className="bg-white/5 rounded-full px-3 py-1 text-sm text-white/90 border border-white/10">
                      Client
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold">Timeline Stats</h3>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-green-300 text-lg font-bold">
                        {getTimelineStats().completed}
                      </div>
                      <div className="text-xs text-white/60">Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-blue-300 text-lg font-bold">
                        {getTimelineStats().inProgress}
                      </div>
                      <div className="text-xs text-white/60">In Progress</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-gray-300 text-lg font-bold">
                        {getTimelineStats().upcoming}
                      </div>
                      <div className="text-xs text-white/60">Upcoming</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Upcoming Milestone
              </h2>
              {timelineSteps.filter((s) => s.status === "in-progress").length >
              0 ? (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-sm font-medium text-pink-300 mb-1">
                    {
                      timelineSteps.find((s) => s.status === "in-progress")
                        ?.year
                    }
                  </div>
                  <div className="text-white text-lg font-medium mb-2">
                    {
                      timelineSteps.find((s) => s.status === "in-progress")
                        ?.title
                    }
                  </div>
                  <p className="text-white/70 text-sm">
                    {
                      timelineSteps.find((s) => s.status === "in-progress")
                        ?.description
                    }
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-white/70">
                      <span className="text-white font-medium">
                        In Progress
                      </span>
                    </div>
                    <button className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-lg shadow-lg hover:shadow-xl transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-sm font-medium text-pink-300 mb-1">
                    {timelineSteps.find((s) => s.status === "upcoming")?.year ||
                      "Future"}
                  </div>
                  <div className="text-white text-lg font-medium mb-2">
                    {timelineSteps.find((s) => s.status === "upcoming")
                      ?.title || "No upcoming milestones"}
                  </div>
                  <p className="text-white/70 text-sm">
                    {timelineSteps.find((s) => s.status === "upcoming")
                      ?.description ||
                      "All project milestones have been completed."}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-white/70">
                      <span className="text-white font-medium">
                        Coming Soon
                      </span>
                    </div>
                    <button className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-lg shadow-lg hover:shadow-xl transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
