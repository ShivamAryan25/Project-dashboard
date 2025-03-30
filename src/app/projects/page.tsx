"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

// Use the same mock data from the dashboard
const dummyProjects = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with new branding",
    progress: 75,
    dueDate: "Jun 15",
    type: "Web",
    team: [
      { id: "1", name: "John Doe", avatar: "" },
      { id: "2", name: "Jane Smith", avatar: "" },
      { id: "3", name: "Mike Johnson", avatar: "" },
      { id: "4", name: "Sarah Williams", avatar: "" },
    ],
    status: "in-progress" as const,
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Creating a new mobile app for iOS and Android platforms",
    progress: 45,
    dueDate: "Aug 10",
    type: "Mobile",
    team: [
      { id: "1", name: "John Doe", avatar: "" },
      { id: "5", name: "David Brown", avatar: "" },
    ],
    status: "in-progress" as const,
  },
  {
    id: "3",
    title: "Marketing Campaign",
    description: "Q3 Digital marketing campaign for product launch",
    progress: 90,
    dueDate: "May 30",
    type: "Marketing",
    team: [
      { id: "2", name: "Jane Smith", avatar: "" },
      { id: "6", name: "Lisa Taylor", avatar: "" },
      { id: "7", name: "Robert Miller", avatar: "" },
    ],
    status: "completed" as const,
  },
  {
    id: "4",
    title: "E-commerce Platform",
    description: "Online store development with payment integration",
    progress: 60,
    dueDate: "Jul 22",
    type: "Web",
    team: [
      { id: "1", name: "John Doe", avatar: "" },
      { id: "3", name: "Mike Johnson", avatar: "" },
    ],
    status: "in-progress" as const,
  },
  {
    id: "5",
    title: "Social Media App",
    description: "New social networking platform for professionals",
    progress: 25,
    dueDate: "Sep 30",
    type: "Mobile",
    team: [
      { id: "5", name: "David Brown", avatar: "" },
      { id: "7", name: "Robert Miller", avatar: "" },
    ],
    status: "in-progress" as const,
  },
  {
    id: "6",
    title: "SEO Optimization",
    description: "Search engine optimization for main website",
    progress: 85,
    dueDate: "Jun 5",
    type: "Marketing",
    team: [{ id: "6", name: "Lisa Taylor", avatar: "" }],
    status: "completed" as const,
  },
  {
    id: "7",
    title: "HR Management System",
    description: "Internal system for employee management and onboarding",
    progress: 35,
    dueDate: "Oct 15",
    type: "Web",
    team: [
      { id: "2", name: "Jane Smith", avatar: "" },
      { id: "4", name: "Sarah Williams", avatar: "" },
    ],
    status: "in-progress" as const,
  },
  {
    id: "8",
    title: "Customer Portal",
    description: "Self-service portal for customer account management",
    progress: 70,
    dueDate: "Jul 30",
    type: "Web",
    team: [
      { id: "1", name: "John Doe", avatar: "" },
      { id: "3", name: "Mike Johnson", avatar: "" },
      { id: "5", name: "David Brown", avatar: "" },
    ],
    status: "in-progress" as const,
  },
];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");

  // Filter and sort projects
  const filteredProjects = dummyProjects
    .filter((project) => {
      // Search filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = filterType === "all" || project.type === filterType;

      // Status filter
      const matchesStatus =
        filterStatus === "all" || project.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "progress") {
        return b.progress - a.progress;
      } else if (sortBy === "dueDate") {
        return a.dueDate.localeCompare(b.dueDate);
      } else {
        return 0;
      }
    });

  return (
    <DashboardLayout>
      {/* Header with Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link
          href="/projects/new"
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          New Project
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-white/40"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search projects..."
              className="block w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Project Type Filter */}
            <div className="min-w-40">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all" className="bg-gray-800">
                  All Types
                </option>
                <option value="Web" className="bg-gray-800">
                  Web
                </option>
                <option value="Mobile" className="bg-gray-800">
                  Mobile
                </option>
                <option value="Marketing" className="bg-gray-800">
                  Marketing
                </option>
              </select>
            </div>

            {/* Project Status Filter */}
            <div className="min-w-40">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all" className="bg-gray-800">
                  All Statuses
                </option>
                <option value="in-progress" className="bg-gray-800">
                  In Progress
                </option>
                <option value="completed" className="bg-gray-800">
                  Completed
                </option>
                <option value="delayed" className="bg-gray-800">
                  Delayed
                </option>
                <option value="on-hold" className="bg-gray-800">
                  On Hold
                </option>
              </select>
            </div>

            {/* Sort By */}
            <div className="min-w-40">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dueDate" className="bg-gray-800">
                  Sort by Due Date
                </option>
                <option value="title" className="bg-gray-800">
                  Sort by Title
                </option>
                <option value="progress" className="bg-gray-800">
                  Sort by Progress
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              progress={project.progress}
              dueDate={project.dueDate}
              team={project.team}
              status={project.status}
              type={project.type}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-10 bg-white/5 rounded-2xl border border-white/10">
            <svg
              className="w-16 h-16 text-white/20 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            <p className="text-white/50 text-lg mb-2">No projects found</p>
            <p className="text-white/40 text-sm text-center max-w-md">
              Try adjusting your search filters or create a new project to get
              started.
            </p>
            <Link
              href="/projects/new"
              className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center transition-all"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Create Project
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
            <button className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
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
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button className="px-4 py-2 bg-white/20 text-white font-medium">
              1
            </button>
            <button className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              3
            </button>
            <button className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
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
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
