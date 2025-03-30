"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import ProjectCard from "@/components/ProjectCard";
import TaskList from "@/components/TaskList";
import ProjectProgressChart from "@/components/ProjectProgressChart";
import { useState } from "react";
import Link from "next/link";

// Mock data
const projectStats = {
  total: 12,
  completed: 5,
  inProgress: 7,
  upcoming: 3,
};

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
];

const dummyTasks = [
  {
    id: "1",
    title: "Finalize homepage design",
    dueDate: "Today",
    completed: false,
    priority: "high" as const,
    projectId: "1",
    projectName: "Website Redesign",
  },
  {
    id: "2",
    title: "Implement user authentication",
    dueDate: "Tomorrow",
    completed: false,
    priority: "medium" as const,
    projectId: "2",
    projectName: "Mobile App Development",
  },
  {
    id: "3",
    title: "Write content for blog",
    dueDate: "May 28",
    completed: true,
    priority: "low" as const,
    projectId: "1",
    projectName: "Website Redesign",
  },
  {
    id: "4",
    title: "Create social media posts",
    dueDate: "May 25",
    completed: false,
    priority: "medium" as const,
    projectId: "3",
    projectName: "Marketing Campaign",
  },
  {
    id: "5",
    title: "Review analytics data",
    dueDate: "May 29",
    completed: false,
    priority: "low" as const,
    projectId: "3",
    projectName: "Marketing Campaign",
  },
];

const projectProgress = dummyProjects.map((project) => ({
  name: project.title,
  progress: project.progress,
  type: project.type,
}));

// Function to organize projects by team members
const getTeamMembers = () => {
  const teamMembers: Record<
    string,
    { name: string; projects: typeof dummyProjects }
  > = {};

  dummyProjects.forEach((project) => {
    project.team.forEach((member) => {
      if (!teamMembers[member.id]) {
        teamMembers[member.id] = {
          name: member.name,
          projects: [],
        };
      }

      // Add project to this member if not already added
      if (!teamMembers[member.id].projects.find((p) => p.id === project.id)) {
        teamMembers[member.id].projects.push(project);
      }
    });
  });

  return teamMembers;
};

export default function Home() {
  const [projectView, setProjectView] = useState<string>("active");
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(
    null
  );

  // Get team data
  const teamMembers = getTeamMembers();

  // Get filtered projects based on the selected view
  const filteredProjects = (() => {
    switch (projectView) {
      case "active":
        return dummyProjects.filter((p) => p.status === "in-progress");
      case "completed":
        return dummyProjects.filter((p) => p.status === "completed");
      case "upcoming":
        return dummyProjects.filter((p) => p.status === "not-started");
      case "team":
        if (selectedTeamMember && teamMembers[selectedTeamMember]) {
          return teamMembers[selectedTeamMember].projects;
        }
        return dummyProjects;
      default:
        return dummyProjects.filter((p) => p.status === "in-progress");
    }
  })();

  return (
    <DashboardLayout>
      {/* Search Bar */}
      <div className="mb-6 relative">
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
          placeholder="Search projects, tasks, team members..."
          className="block w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none transition-all backdrop-blur-md"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Projects"
          value={projectStats.total}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          }
          change={{ value: "2", type: "increase" }}
        />
        <StatCard
          title="Completed"
          value={projectStats.completed}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              ></path>
            </svg>
          }
          change={{ value: "1", type: "increase" }}
        />
        <StatCard
          title="In Progress"
          value={projectStats.inProgress}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          }
          change={{ value: "1", type: "increase" }}
        />
        <StatCard
          title="Upcoming"
          value={projectStats.upcoming}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          }
        />
      </div>

      {/* Charts & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProjectProgressChart projects={projectProgress} />

        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 transition-all hover:bg-white/20 hover:shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Projects
            </h2>
            <Link
              href="/projects"
              className="text-white/70 hover:text-white text-sm transition-colors flex items-center"
            >
              <span>View All</span>
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
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {dummyProjects.slice(0, 3).map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="block"
              >
                <div className="flex justify-between items-center p-3 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-lg mr-3 flex items-center justify-center ${
                        project.type === "Web"
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : project.type === "Mobile"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {project.type === "Web" && (
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                      )}
                      {project.type === "Mobile" && (
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {project.type === "Marketing" && (
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{project.title}</p>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-700/50 rounded-full h-1.5 w-24">
                          <div
                            className={`h-1.5 rounded-full ${
                              project.progress >= 75
                                ? "bg-gradient-to-r from-green-500 to-green-400"
                                : project.progress >= 50
                                ? "bg-gradient-to-r from-blue-500 to-blue-400"
                                : project.progress >= 25
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                                : "bg-gradient-to-r from-red-500 to-red-400"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white/60 ml-2">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : project.status === "in-progress"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : project.status === "delayed"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {project.status === "in-progress"
                        ? "In Progress"
                        : project.status === "completed"
                        ? "Completed"
                        : project.status === "delayed"
                        ? "Delayed"
                        : "On Hold"}
                    </div>
                    <svg
                      className="w-4 h-4 text-white/70"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Project Cards & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/10 mb-6 flex">
            <button
              className={`flex-1 px-4 py-2 text-sm rounded-lg transition-all ${
                projectView === "active"
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => {
                setProjectView("active");
                setSelectedTeamMember(null);
              }}
            >
              Active Projects
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm rounded-lg transition-all ${
                projectView === "completed"
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => {
                setProjectView("completed");
                setSelectedTeamMember(null);
              }}
            >
              Completed Projects
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm rounded-lg transition-all ${
                projectView === "upcoming"
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => {
                setProjectView("upcoming");
                setSelectedTeamMember(null);
              }}
            >
              Upcoming Projects
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm rounded-lg transition-all ${
                projectView === "team"
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => {
                setProjectView("team");
                setSelectedTeamMember(null);
              }}
            >
              By Team
            </button>
          </div>

          {/* Team member selector - only shown for team view */}
          {projectView === "team" && !selectedTeamMember && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(teamMembers).map(([id, member]) => (
                <button
                  key={id}
                  className="flex items-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:shadow-lg hover:border-white/20"
                  onClick={() => setSelectedTeamMember(id)}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 flex items-center justify-center text-white font-semibold mr-4 shadow-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-white font-medium text-lg">
                      {member.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-white/60 text-sm">
                        {member.projects.length} projects
                      </p>
                      <div className="flex space-x-1">
                        {["Web", "Mobile", "Marketing"].map((type) => {
                          const count = member.projects.filter(
                            (p) => p.type === type
                          ).length;
                          if (count > 0) {
                            return (
                              <span
                                key={type}
                                className="size-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    type === "Web"
                                      ? "rgb(99, 102, 241)"
                                      : type === "Mobile"
                                      ? "rgb(245, 158, 11)"
                                      : "rgb(244, 63, 94)",
                                  opacity: 0.8,
                                }}
                                title={`${count} ${type} projects`}
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Back button when viewing a specific team member */}
          {projectView === "team" && selectedTeamMember && (
            <button
              className="mb-4 flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all hover:shadow"
              onClick={() => setSelectedTeamMember(null)}
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
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Back to team members
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="col-span-2 flex items-center justify-center p-10 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/50">No projects found for this view</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <TaskList tasks={dummyTasks} title="Recent Tasks" />
        </div>
      </div>
    </DashboardLayout>
  );
}
