"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// Sample data for analytics
const analyticsData = {
  summary: {
    totalProjects: 24,
    activeProjects: 12,
    completedProjects: 8,
    delayedProjects: 4,
    totalTasks: 345,
    completedTasks: 210,
    teamUtilization: 78,
    averageProjectCompletion: 92,
  },
  projectStatus: {
    onTrack: 9,
    atRisk: 3,
    delayed: 4,
    completed: 8,
  },
  departmentPerformance: [
    {
      name: "Engineering",
      tasksCompleted: 87,
      projectsDelivered: 4,
      onTimeDelivery: 92,
    },
    {
      name: "Design",
      tasksCompleted: 76,
      projectsDelivered: 3,
      onTimeDelivery: 88,
    },
    {
      name: "Marketing",
      tasksCompleted: 65,
      projectsDelivered: 2,
      onTimeDelivery: 74,
    },
    {
      name: "Operations",
      tasksCompleted: 82,
      projectsDelivered: 3,
      onTimeDelivery: 85,
    },
    {
      name: "Infrastructure",
      tasksCompleted: 93,
      projectsDelivered: 2,
      onTimeDelivery: 96,
    },
  ],
  monthlyProgress: [
    { month: "Jan", completion: 65 },
    { month: "Feb", completion: 59 },
    { month: "Mar", completion: 80 },
    { month: "Apr", completion: 81 },
    { month: "May", completion: 56 },
    { month: "Jun", completion: 55 },
    { month: "Jul", completion: 40 },
    { month: "Aug", completion: 72 },
    { month: "Sep", completion: 76 },
    { month: "Oct", completion: 82 },
    { month: "Nov", completion: 88 },
    { month: "Dec", completion: 78 },
  ],
};

// Department colors mapping - using the same colors as in TeamPage
const departmentColors: Record<
  string,
  { bg: string; light: string; text: string }
> = {
  Engineering: {
    bg: "bg-indigo-500",
    light: "bg-indigo-100",
    text: "text-indigo-500",
  },
  Design: {
    bg: "bg-pink-500",
    light: "bg-pink-100",
    text: "text-pink-500",
  },
  Marketing: {
    bg: "bg-orange-500",
    light: "bg-orange-100",
    text: "text-orange-500",
  },
  Operations: {
    bg: "bg-emerald-500",
    light: "bg-emerald-100",
    text: "text-emerald-500",
  },
  Infrastructure: {
    bg: "bg-cyan-500",
    light: "bg-cyan-100",
    text: "text-cyan-500",
  },
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data when timeframe changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [timeframe]);

  // Top performing projects
  const topProjects = [
    {
      id: "1",
      name: "Website Redesign",
      progress: 92,
      department: "Design",
      tasksCompleted: 45,
      totalTasks: 48,
    },
    {
      id: "2",
      name: "Mobile App Development",
      progress: 78,
      department: "Engineering",
      tasksCompleted: 82,
      totalTasks: 105,
    },
    {
      id: "3",
      name: "Marketing Campaign",
      progress: 85,
      department: "Marketing",
      tasksCompleted: 34,
      totalTasks: 40,
    },
    {
      id: "4",
      name: "Server Infrastructure",
      progress: 96,
      department: "Infrastructure",
      tasksCompleted: 23,
      totalTasks: 24,
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-white/70 mt-2">
          Track and analyze project performance metrics
        </p>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 flex">
          <button
            onClick={() => setTimeframe("weekly")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              timeframe === "weekly"
                ? "bg-pink-500 text-white"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("monthly")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              timeframe === "monthly"
                ? "bg-pink-500 text-white"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe("quarterly")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              timeframe === "quarterly"
                ? "bg-pink-500 text-white"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setTimeframe("yearly")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              timeframe === "yearly"
                ? "bg-pink-500 text-white"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            Yearly
          </button>
        </div>
        <div className="text-white/70 text-sm">
          Last updated: {new Date().toLocaleDateString()}{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/60 text-sm">Total Projects</div>
              <div className="text-white text-2xl font-bold mt-2">
                {isLoading ? "..." : analyticsData.summary.totalProjects}
              </div>
            </div>
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-green-400 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span>12% increase</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/60 text-sm">Active Projects</div>
              <div className="text-white text-2xl font-bold mt-2">
                {isLoading ? "..." : analyticsData.summary.activeProjects}
              </div>
            </div>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-green-400 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span>8% increase</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/60 text-sm">Completed Tasks</div>
              <div className="text-white text-2xl font-bold mt-2">
                {isLoading ? "..." : analyticsData.summary.completedTasks}
              </div>
            </div>
            <div className="bg-pink-500/20 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-green-400 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span>15% increase</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/60 text-sm">Team Utilization</div>
              <div className="text-white text-2xl font-bold mt-2">
                {isLoading ? "..." : analyticsData.summary.teamUtilization}%
              </div>
            </div>
            <div className="bg-cyan-500/20 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-cyan-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-orange-400 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span>2% decrease</span>
          </div>
        </div>
      </div>

      {/* Project Status Chart and Completion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Project Status</h2>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-emerald-400 text-2xl font-bold">
                    {analyticsData.projectStatus.onTrack}
                  </div>
                  <div className="text-white/60 text-sm mt-1">On Track</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-400 text-2xl font-bold">
                    {analyticsData.projectStatus.atRisk}
                  </div>
                  <div className="text-white/60 text-sm mt-1">At Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-red-400 text-2xl font-bold">
                    {analyticsData.projectStatus.delayed}
                  </div>
                  <div className="text-white/60 text-sm mt-1">Delayed</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 text-2xl font-bold">
                    {analyticsData.projectStatus.completed}
                  </div>
                  <div className="text-white/60 text-sm mt-1">Completed</div>
                </div>
              </div>

              {/* Visual Chart Representation */}
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-8 border-gray-700 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold">
                        {Math.round(
                          ((analyticsData.projectStatus.onTrack +
                            analyticsData.projectStatus.completed) /
                            analyticsData.summary.totalProjects) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-sm text-white/70">Healthy</div>
                    </div>
                  </div>
                </div>

                {/* Pie Chart Slices - Using SVG for better control */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  {/* On Track Slice - 37.5% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray={`${
                      (analyticsData.projectStatus.onTrack /
                        analyticsData.summary.totalProjects) *
                      251.2
                    } 251.2`}
                    transform="rotate(-90, 50, 50)"
                  />

                  {/* At Risk Slice - 12.5% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray={`${
                      (analyticsData.projectStatus.atRisk /
                        analyticsData.summary.totalProjects) *
                      251.2
                    } 251.2`}
                    strokeDashoffset={`${
                      -(
                        analyticsData.projectStatus.onTrack /
                        analyticsData.summary.totalProjects
                      ) * 251.2
                    }`}
                    transform="rotate(-90, 50, 50)"
                  />

                  {/* Delayed Slice - 16.7% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="20"
                    strokeDasharray={`${
                      (analyticsData.projectStatus.delayed /
                        analyticsData.summary.totalProjects) *
                      251.2
                    } 251.2`}
                    strokeDashoffset={`${
                      -(
                        (analyticsData.projectStatus.onTrack +
                          analyticsData.projectStatus.atRisk) /
                        analyticsData.summary.totalProjects
                      ) * 251.2
                    }`}
                    transform="rotate(-90, 50, 50)"
                  />

                  {/* Completed Slice - 33.3% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray={`${
                      (analyticsData.projectStatus.completed /
                        analyticsData.summary.totalProjects) *
                      251.2
                    } 251.2`}
                    strokeDashoffset={`${
                      -(
                        (analyticsData.projectStatus.onTrack +
                          analyticsData.projectStatus.atRisk +
                          analyticsData.projectStatus.delayed) /
                        analyticsData.summary.totalProjects
                      ) * 251.2
                    }`}
                    transform="rotate(-90, 50, 50)"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
                  <span className="text-white/70 text-sm">On Track</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <span className="text-white/70 text-sm">At Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <span className="text-white/70 text-sm">Delayed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-white/70 text-sm">Completed</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Monthly Progress
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="h-64 relative">
              {/* Bar chart representation */}
              <div className="absolute bottom-0 left-0 right-0 flex h-48 items-end justify-between px-2">
                {analyticsData.monthlyProgress.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-6 bg-gradient-to-t from-pink-600 to-purple-600 rounded-t-sm"
                      style={{ height: `${(item.completion / 100) * 100}%` }}
                    ></div>
                    <div className="text-white/60 text-xs mt-2">
                      {item.month}
                    </div>
                  </div>
                ))}
              </div>

              {/* Horizontal guidelines */}
              <div className="absolute left-0 right-0 bottom-0 h-48 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-white/10 relative h-0">
                  <span className="absolute -top-2 -left-6 text-white/40 text-xs">
                    100%
                  </span>
                </div>
                <div className="border-t border-white/10 relative h-0">
                  <span className="absolute -top-2 -left-6 text-white/40 text-xs">
                    75%
                  </span>
                </div>
                <div className="border-t border-white/10 relative h-0">
                  <span className="absolute -top-2 -left-6 text-white/40 text-xs">
                    50%
                  </span>
                </div>
                <div className="border-t border-white/10 relative h-0">
                  <span className="absolute -top-2 -left-6 text-white/40 text-xs">
                    25%
                  </span>
                </div>
                <div className="border-t border-white/10 relative h-0">
                  <span className="absolute -top-2 -left-6 text-white/40 text-xs">
                    0%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-white/70 text-sm mr-2">
                Avg. Completion:
              </span>
              <span className="text-white font-medium">
                {isLoading
                  ? "..."
                  : `${Math.round(
                      analyticsData.monthlyProgress.reduce(
                        (sum, item) => sum + item.completion,
                        0
                      ) / analyticsData.monthlyProgress.length
                    )}%`}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-white/70 text-sm mr-2">Trend:</span>
              <span className="text-green-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Improving
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">
          Department Performance
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/70">Department</th>
                  <th className="text-center py-3 text-white/70">
                    Tasks Completed
                  </th>
                  <th className="text-center py-3 text-white/70">
                    Projects Delivered
                  </th>
                  <th className="text-center py-3 text-white/70">
                    On-Time Delivery
                  </th>
                  <th className="text-center py-3 text-white/70">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.departmentPerformance.map((dept, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-3 flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          departmentColors[dept.name].bg
                        }`}
                      ></div>
                      <span className="text-white">{dept.name}</span>
                    </td>
                    <td className="text-center text-white">
                      {dept.tasksCompleted}%
                    </td>
                    <td className="text-center text-white">
                      {dept.projectsDelivered}
                    </td>
                    <td className="text-center text-white">
                      {dept.onTimeDelivery}%
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-[120px] bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              departmentColors[dept.name].bg
                            }`}
                            style={{ width: `${dept.onTimeDelivery}%` }}
                          />
                        </div>
                        <span className="ml-2 text-white">
                          {dept.onTimeDelivery}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Top Projects */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">
            Top Performing Projects
          </h2>
          <button className="text-white/70 hover:text-white text-sm flex items-center">
            View All
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium">{project.name}</h3>
                    <div className="flex items-center mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          departmentColors[project.department].bg
                        } mr-2`}
                      ></div>
                      <span className="text-white/70 text-sm">
                        {project.department}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/10 text-white text-sm font-medium px-2 py-1 rounded-md">
                    {project.progress}%
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Progress</span>
                    <span className="text-white">
                      {project.tasksCompleted}/{project.totalTasks} tasks
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gray-500 border-2 border-gray-800 flex items-center justify-center text-white text-xs"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-gray-800 flex items-center justify-center text-white text-xs">
                      +2
                    </div>
                  </div>

                  <button className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Recent Activity</h2>
          <div className="text-white/70 text-sm">Today</div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-white/10">
            {[
              {
                time: "10:30 AM",
                title: "New project milestone reached",
                project: "Mobile App Development",
                user: "John D.",
                type: "milestone",
              },
              {
                time: "09:15 AM",
                title: "23 tasks completed",
                project: "Website Redesign",
                user: "Design Team",
                type: "tasks",
              },
              {
                time: "Yesterday",
                title: "Project phase completed",
                project: "Marketing Campaign",
                user: "Marketing Team",
                type: "phase",
              },
              {
                time: "Yesterday",
                title: "New team member added",
                project: "Server Infrastructure",
                user: "Alex T.",
                type: "team",
              },
              {
                time: "2 days ago",
                title: "Project deadline extended",
                project: "Data Migration",
                user: "Project Manager",
                type: "deadline",
              },
            ].map((activity, index) => (
              <div key={index} className="relative">
                <div
                  className={`absolute -left-8 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center 
                  ${
                    activity.type === "milestone"
                      ? "bg-green-500/20 text-green-500"
                      : activity.type === "tasks"
                      ? "bg-blue-500/20 text-blue-500"
                      : activity.type === "phase"
                      ? "bg-purple-500/20 text-purple-500"
                      : activity.type === "team"
                      ? "bg-cyan-500/20 text-cyan-500"
                      : "bg-amber-500/20 text-amber-500"
                  }`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {activity.type === "milestone" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    ) : activity.type === "tasks" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    ) : activity.type === "phase" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    ) : activity.type === "team" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                  </svg>
                </div>

                <div>
                  <div className="text-white/50 text-sm mb-1">
                    {activity.time}
                  </div>
                  <div className="text-white font-medium">{activity.title}</div>
                  <div className="text-white/70 text-sm mt-1">
                    {activity.project} • {activity.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </DashboardLayout>
  );
}
