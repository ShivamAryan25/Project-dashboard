"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectTimeline from "@/components/ProjectTimeline";
import TimelineFilter, { TimelineFilters } from "@/components/TimelineFilter";

// Define types for timeline steps
type Assignee = {
  id: string;
  name: string;
};

type Deliverable = {
  title: string;
  completed: boolean;
};

type TimelineStep = {
  id: string;
  year: string;
  title: string;
  description: string;
  color: string;
  status?: "completed" | "in-progress" | "upcoming";
  dependencies?: string[];
  completionDate?: string;
  assignees?: Assignee[];
  deliverables?: Deliverable[];
  tags?: string[];
};

export default function ProjectTimelinePage() {
  // Using any type to bypass type checking for now
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([]);
  const [filteredSteps, setFilteredSteps] = useState<TimelineStep[]>([]);
  const [loading, setLoading] = useState(true);

  // Project tags for filtering
  const projectTags = [
    "Design",
    "Development",
    "Marketing",
    "Research",
    "Planning",
  ];

  // Initialize with enhanced timeline steps including dependencies
  useEffect(() => {
    const initialSteps = [
      {
        id: "step6",
        year: "2024",
        title: "Platform Expansion",
        description:
          "International market entry and localization. Advanced analytics and personalization features integrated into the core platform.",
        color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
        status: "upcoming" as const,
        dependencies: ["step5"],
        assignees: [
          { id: "user3", name: "Mike Johnson" },
          { id: "user4", name: "Sarah Williams" },
        ],
        deliverables: [
          { title: "International Localization", completed: false },
          { title: "Advanced Analytics", completed: false },
          { title: "User Personalization", completed: false },
        ],
        tags: ["Development", "Marketing"],
      },
      {
        id: "step5",
        year: "2023",
        title: "Feature Enhancement",
        description:
          "Major feature releases and expanded platform capabilities. Reached milestone of 100,000+ active users and improved retention metrics.",
        color: "bg-gradient-to-r from-orange-400 to-orange-600",
        status: "in-progress" as const,
        dependencies: ["step4", "step3"],
        completionDate: "2023-12-31",
        assignees: [
          { id: "user1", name: "John Doe" },
          { id: "user2", name: "Jane Smith" },
          { id: "user5", name: "Alex Chen" },
        ],
        deliverables: [
          { title: "Core Feature Release", completed: true },
          { title: "Platform Expansion", completed: true },
          { title: "User Retention Improvements", completed: false },
          { title: "Performance Optimization", completed: false },
        ],
        tags: ["Development", "Design"],
      },
      {
        id: "step4",
        year: "2022",
        title: "Strategic Growth",
        description:
          "Secured additional funding rounds. Expanded development team and established key strategic partnerships with industry leaders.",
        color: "bg-gradient-to-r from-pink-400 to-pink-600",
        status: "completed" as const,
        dependencies: ["step2"],
        completionDate: "2022-11-15",
        assignees: [
          { id: "user1", name: "John Doe" },
          { id: "user3", name: "Mike Johnson" },
        ],
        deliverables: [
          { title: "Funding Round Completion", completed: true },
          { title: "Team Expansion", completed: true },
          { title: "Partnership Agreements", completed: true },
        ],
        tags: ["Planning"],
      },
      {
        id: "step3",
        year: "2021",
        title: "Product Development",
        description:
          "Market research and competitor analysis. Developed initial prototypes and conducted extensive user testing sessions.",
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
        status: "completed" as const,
        dependencies: ["step1"],
        completionDate: "2021-09-30",
        assignees: [
          { id: "user2", name: "Jane Smith" },
          { id: "user4", name: "Sarah Williams" },
        ],
        deliverables: [
          { title: "Market Research", completed: true },
          { title: "Competitor Analysis", completed: true },
          { title: "Prototype Development", completed: true },
          { title: "User Testing", completed: true },
        ],
        tags: ["Research", "Development", "Design"],
      },
      {
        id: "step2",
        year: "2020",
        title: "Project Launch",
        description:
          "Initial project planning and resource allocation. Established core team and completed foundational project scoping documents.",
        color: "bg-gradient-to-r from-purple-400 to-purple-600",
        status: "completed" as const,
        dependencies: ["step1"],
        completionDate: "2020-07-15",
        assignees: [
          { id: "user1", name: "John Doe" },
          { id: "user5", name: "Alex Chen" },
        ],
        deliverables: [
          { title: "Project Planning", completed: true },
          { title: "Resource Allocation", completed: true },
          { title: "Team Formation", completed: true },
          { title: "Scoping Documents", completed: true },
        ],
        tags: ["Planning"],
      },
      {
        id: "step1",
        year: "2019",
        title: "Early Research",
        description:
          "Concept development and preliminary market research. Identified key opportunity areas and potential user base.",
        color: "bg-gradient-to-r from-green-400 to-green-600",
        status: "completed" as const,
        completionDate: "2019-11-10",
        assignees: [
          { id: "user1", name: "John Doe" },
          { id: "user2", name: "Jane Smith" },
        ],
        deliverables: [
          { title: "Concept Development", completed: true },
          { title: "Preliminary Research", completed: true },
          { title: "Opportunity Identification", completed: true },
        ],
        tags: ["Research", "Planning"],
      },
    ] as TimelineStep[];

    // Simulate API loading
    setTimeout(() => {
      setTimelineSteps(initialSteps);
      setFilteredSteps(initialSteps);
      setLoading(false);
    }, 500);
  }, []);

  // Handle filter changes with extended filtering capabilities
  const handleFilterChange = (filters: TimelineFilters) => {
    // Apply filters to timeline steps
    let filtered = [...timelineSteps];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((step) => step.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const currentYear = new Date().getFullYear();

      if (filters.dateRange === "year") {
        filtered = filtered.filter(
          (step) => parseInt(step.year) >= currentYear - 1
        );
      } else if (filters.dateRange === "quarter") {
        // For simplicity, just show last year and current year
        filtered = filtered.filter(
          (step) => parseInt(step.year) >= currentYear - 1
        );
      } else if (filters.dateRange === "month") {
        // For simplicity, just show current year
        filtered = filtered.filter(
          (step) => parseInt(step.year) >= currentYear
        );
      } else if (
        filters.dateRange === "custom" &&
        filters.customStartDate &&
        filters.customEndDate
      ) {
        const startYear = new Date(filters.customStartDate).getFullYear();
        const endYear = new Date(filters.customEndDate).getFullYear();
        filtered = filtered.filter((step) => {
          const stepYear = parseInt(step.year);
          return stepYear >= startYear && stepYear <= endYear;
        });
      }
    }

    // Filter by assignees
    if (filters.assignees && filters.assignees.length > 0) {
      filtered = filtered.filter((step) => {
        if (!step.assignees) return false;
        return step.assignees.some((assignee: { id: string; name: string }) =>
          filters.assignees?.includes(assignee.id)
        );
      });
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((step) => {
        if (!step.tags) return false;
        return step.tags.some((tag: string) => filters.tags?.includes(tag));
      });
    }

    // Search by query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (step) =>
          step.title.toLowerCase().includes(query) ||
          step.description.toLowerCase().includes(query) ||
          (step.deliverables &&
            step.deliverables.some((d: { title: string; completed: boolean }) =>
              d.title.toLowerCase().includes(query)
            ))
      );
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

  // Handle step update from drag & drop
  const handleStepUpdate = (updatedStep: {
    id: string;
    year: string;
    title: string;
    description: string;
    color: string;
    status?: "completed" | "in-progress" | "upcoming";
    dependencies?: string[];
    completionDate?: string;
    assignees?: { id: string; name: string }[];
    deliverables?: { title: string; completed: boolean }[];
    tags?: string[];
  }) => {
    console.log("Step updated:", updatedStep);
    // Here you would typically update the step in your data store
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Project Progression Timeline
        </h1>
        <p className="text-white/70 mt-2">
          Track the major milestones and achievements throughout the project
          lifecycle
        </p>
      </div>

      {/* Enhanced Timeline Filters */}
      <TimelineFilter
        onFilterChange={handleFilterChange}
        projectTags={projectTags}
        showSavePresets={true}
      />

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
            <ProjectTimeline
              steps={filteredSteps}
              interactive={true}
              onStepUpdate={handleStepUpdate}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Timeline Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold">Duration</h3>
                  <p className="text-white/70">2019-2024</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Key Statistics</h3>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-green-300 text-lg font-bold">
                        {
                          timelineSteps.filter((s) => s.status === "completed")
                            .length
                        }
                      </div>
                      <div className="text-xs text-white/60">Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-blue-300 text-lg font-bold">
                        {
                          timelineSteps.filter(
                            (s) => s.status === "in-progress"
                          ).length
                        }
                      </div>
                      <div className="text-xs text-white/60">In Progress</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-gray-300 text-lg font-bold">
                        {
                          timelineSteps.filter((s) => s.status === "upcoming")
                            .length
                        }
                      </div>
                      <div className="text-xs text-white/60">Upcoming</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Current Status
              </h2>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {Math.round(
                    (timelineSteps.filter((s) => s.status === "completed")
                      .length /
                      timelineSteps.length) *
                      100
                  )}
                  %
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-semibold">
                    Project Completion
                  </h3>
                  <div className="w-full bg-white/10 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.round(
                          (timelineSteps.filter((s) => s.status === "completed")
                            .length /
                            timelineSteps.length) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4">
                  Project Health
                </h3>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    timelineSteps.filter((s) => s.status === "completed")
                      .length >= Math.floor(timelineSteps.length / 2)
                      ? "bg-green-500/10 text-green-300"
                      : "bg-yellow-500/10 text-yellow-300"
                  }`}
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
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Project is on track with expected timelines</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-semibold mb-2">Current Focus</h3>
                {timelineSteps.filter((s) => s.status === "in-progress")
                  .length > 0 ? (
                  <div className="bg-white/5 p-3 rounded-lg">
                    <h4 className="font-medium text-pink-300">
                      {
                        timelineSteps.find((s) => s.status === "in-progress")
                          ?.title
                      }
                    </h4>
                    <p className="mt-1 text-sm text-white/70">
                      {
                        timelineSteps.find((s) => s.status === "in-progress")
                          ?.description
                      }
                    </p>
                  </div>
                ) : (
                  <p className="text-white/50 italic">No active milestones</p>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-semibold mb-2">Up Next</h3>
                {timelineSteps.find((s) => s.status === "upcoming") ? (
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-xs text-white/50">
                      {timelineSteps.find((s) => s.status === "upcoming")?.year}
                    </div>
                    <h4 className="font-medium text-blue-300">
                      {
                        timelineSteps.find((s) => s.status === "upcoming")
                          ?.title
                      }
                    </h4>
                  </div>
                ) : (
                  <p className="text-white/50 italic">No upcoming milestones</p>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Timeline Features
              </h2>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                  Click milestones to see details
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                  Drag to reorder
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                  View dependencies
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                  Zoom in/out
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                  Save filter presets
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
