"use client";

import { useState, useEffect, ReactNode } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectProgressPreview from "@/components/ProjectProgressPreview";
import ProjectTimeline, { TimelineStep } from "@/components/ProjectTimeline";
import TimelineFilter, { TimelineFilters } from "@/components/TimelineFilter";
import React from "react";

// Same project data as in other pages
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
    // Additional details for project page
    startDate: "Mar 10",
    budget: "$12,000",
    client: "Acme Corporation",
    overview:
      "This project involves redesigning the company website to reflect new branding guidelines and improve user experience. The redesign will focus on mobile responsiveness, performance optimization, and modern design aesthetics.",
    tasks: [
      {
        id: "1",
        title: "Finalize homepage design",
        completed: false,
        dueDate: "May 25",
        assignedTo: "Jane Smith",
      },
      {
        id: "2",
        title: "Implement user authentication",
        completed: true,
        dueDate: "May 15",
        assignedTo: "Mike Johnson",
      },
      {
        id: "3",
        title: "Create content for About page",
        completed: false,
        dueDate: "May 28",
        assignedTo: "Sarah Williams",
      },
      {
        id: "4",
        title: "Set up analytics",
        completed: false,
        dueDate: "Jun 5",
        assignedTo: "John Doe",
      },
      {
        id: "5",
        title: "Optimize images and assets",
        completed: true,
        dueDate: "May 20",
        assignedTo: "Mike Johnson",
      },
    ],
    // Project contributions timeline
    contributions: [
      {
        id: "1",
        date: "May 23, 2023",
        time: "2:30 PM",
        user: "John Doe",
        action: "Updated project status to In Progress",
        description:
          "Changed status from Planning to In Progress as development has started",
      },
      {
        id: "2",
        date: "May 20, 2023",
        time: "11:45 AM",
        user: "Mike Johnson",
        action: "Completed task: Optimize images and assets",
        description:
          "Compressed all images and optimized CSS/JS files for faster loading",
      },
      {
        id: "3",
        date: "May 18, 2023",
        time: "9:15 AM",
        user: "Jane Smith",
        action: "Updated homepage mockups",
        description: "Made revisions based on client feedback from the meeting",
      },
      {
        id: "4",
        date: "May 15, 2023",
        time: "4:20 PM",
        user: "Mike Johnson",
        action: "Completed task: Implement user authentication",
        description: "Implemented OAuth and email-based authentication flows",
      },
      {
        id: "5",
        date: "May 12, 2023",
        time: "10:00 AM",
        user: "Sarah Williams",
        action: "Added brand guidelines document",
        description:
          "Uploaded the final brand guidelines for reference in the design process",
      },
      {
        id: "6",
        date: "May 10, 2023",
        time: "3:45 PM",
        user: "John Doe",
        action: "Created project timeline",
        description: "Set up project milestones and delivery dates",
      },
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description:
      "Creating a cross-platform mobile application for inventory management",
    progress: 35,
    dueDate: "Aug 10",
    type: "Mobile",
    team: [
      { id: "2", name: "Jane Smith", avatar: "" },
      { id: "5", name: "Alex Turner", avatar: "" },
      { id: "6", name: "Emily Clark", avatar: "" },
    ],
    status: "in-progress" as const,
    // Additional details for project page
    startDate: "Apr 5",
    budget: "$24,000",
    client: "TechSolutions Inc.",
    overview:
      "This project involves developing a cross-platform mobile application for inventory management. The app will enable real-time tracking of inventory levels, automated reordering, and comprehensive reporting tools.",
    tasks: [
      {
        id: "1",
        title: "Design app wireframes",
        completed: true,
        dueDate: "Apr 20",
        assignedTo: "Emily Clark",
      },
      {
        id: "2",
        title: "Set up development environment",
        completed: true,
        dueDate: "Apr 25",
        assignedTo: "Jane Smith",
      },
      {
        id: "3",
        title: "Implement user authentication",
        completed: true,
        dueDate: "May 10",
        assignedTo: "Alex Turner",
      },
      {
        id: "4",
        title: "Create inventory management module",
        completed: false,
        dueDate: "Jun 15",
        assignedTo: "Jane Smith",
      },
      {
        id: "5",
        title: "Develop reporting dashboard",
        completed: false,
        dueDate: "Jul 5",
        assignedTo: "Emily Clark",
      },
      {
        id: "6",
        title: "Implement push notifications",
        completed: false,
        dueDate: "Jul 20",
        assignedTo: "Alex Turner",
      },
    ],
    // Project contributions timeline
    contributions: [
      {
        id: "1",
        date: "May 15, 2023",
        time: "3:45 PM",
        user: "Alex Turner",
        action: "Completed task: Implement user authentication",
        description:
          "Finished OAuth implementation and tested with all providers",
      },
      {
        id: "2",
        date: "May 10, 2023",
        time: "10:30 AM",
        user: "Emily Clark",
        action: "Updated app wireframes",
        description:
          "Made revisions to the user interface based on client feedback",
      },
      {
        id: "3",
        date: "May 5, 2023",
        time: "2:15 PM",
        user: "Jane Smith",
        action: "Created API documentation",
        description: "Added comprehensive documentation for all backend APIs",
      },
      {
        id: "4",
        date: "Apr 28, 2023",
        time: "11:20 AM",
        user: "Jane Smith",
        action: "Completed task: Set up development environment",
        description:
          "Configured CI/CD pipeline and development environments for all team members",
      },
      {
        id: "5",
        date: "Apr 22, 2023",
        time: "9:45 AM",
        user: "Emily Clark",
        action: "Completed task: Design app wireframes",
        description:
          "Finalized all app screens and created interactive prototype",
      },
      {
        id: "6",
        date: "Apr 10, 2023",
        time: "1:30 PM",
        user: "Alex Turner",
        action: "Added technical architecture document",
        description:
          "Created detailed technical specifications and architecture diagram",
      },
    ],
  },
  {
    id: "3",
    title: "Marketing Campaign",
    description: "Q3 digital marketing campaign for product launch",
    progress: 20,
    dueDate: "Sep 30",
    type: "Marketing",
    team: [
      { id: "3", name: "Mike Johnson", avatar: "" },
      { id: "7", name: "Lisa Anderson", avatar: "" },
      { id: "8", name: "Robert Garcia", avatar: "" },
    ],
    status: "planning" as const,
    // Additional details for project page
    startDate: "May 1",
    budget: "$18,500",
    client: "Nexus Products",
    overview:
      "This project involves planning and executing a comprehensive digital marketing campaign for the Q3 product launch. The campaign will include social media, email marketing, content creation, and paid advertising components.",
    tasks: [
      {
        id: "1",
        title: "Define target audience segments",
        completed: true,
        dueDate: "May 15",
        assignedTo: "Lisa Anderson",
      },
      {
        id: "2",
        title: "Create campaign strategy document",
        completed: true,
        dueDate: "May 20",
        assignedTo: "Mike Johnson",
      },
      {
        id: "3",
        title: "Design social media creative assets",
        completed: false,
        dueDate: "Jun 10",
        assignedTo: "Robert Garcia",
      },
      {
        id: "4",
        title: "Develop email marketing templates",
        completed: false,
        dueDate: "Jun 15",
        assignedTo: "Lisa Anderson",
      },
      {
        id: "5",
        title: "Set up analytics tracking",
        completed: false,
        dueDate: "Jun 20",
        assignedTo: "Mike Johnson",
      },
      {
        id: "6",
        title: "Create content calendar",
        completed: false,
        dueDate: "Jun 25",
        assignedTo: "Robert Garcia",
      },
    ],
    // Project contributions timeline
    contributions: [
      {
        id: "1",
        date: "May 22, 2023",
        time: "1:15 PM",
        user: "Mike Johnson",
        action: "Completed task: Create campaign strategy document",
        description:
          "Finalized the comprehensive strategy document with budget allocation",
      },
      {
        id: "2",
        date: "May 20, 2023",
        time: "11:00 AM",
        user: "Robert Garcia",
        action: "Added competitor analysis report",
        description:
          "Uploaded detailed analysis of competitor marketing campaigns",
      },
      {
        id: "3",
        date: "May 18, 2023",
        time: "3:30 PM",
        user: "Lisa Anderson",
        action: "Updated campaign requirements",
        description: "Added new requirements based on product team feedback",
      },
      {
        id: "4",
        date: "May 16, 2023",
        time: "9:45 AM",
        user: "Lisa Anderson",
        action: "Completed task: Define target audience segments",
        description:
          "Identified and documented 4 primary audience segments with detailed personas",
      },
      {
        id: "5",
        date: "May 10, 2023",
        time: "2:00 PM",
        user: "Mike Johnson",
        action: "Added campaign budget breakdown",
        description:
          "Created detailed budget allocation for all campaign channels",
      },
      {
        id: "6",
        date: "May 5, 2023",
        time: "10:30 AM",
        user: "Robert Garcia",
        action: "Created initial project timeline",
        description: "Set up project phases and key milestone dates",
      },
    ],
  },
  // Other projects with similar structure
];

// Update Contribution type to match the actual data structure
type Contribution = {
  id: string;
  user: string; // This is just a string in the dummy data
  action: string;
  date: string;
  time: string;
  description?: string;
  details?: string;
};

// Modified Task type for the rendering
type TaskSimple = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  assignedTo: string;
};

// Define types for timeline steps
type AssigneeSimple = {
  id: string;
  name: string;
};

type DeliverableSimple = {
  title: string;
  completed: boolean;
};

type ActivitySimple = {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
};

// Define types to replace any
interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

interface Deliverable {
  id: string;
  title: string;
  completed: boolean;
}

interface Activity {
  id: string;
  type: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: string;
  assignee?: Assignee;
}

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<(typeof dummyProjects)[0] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedContribution, setSelectedContribution] = useState<
    string | null
  >(null);
  const [contributionSort, setContributionSort] = useState("newest");
  const [contributionFilter, setContributionFilter] = useState("all");

  useEffect(() => {
    // In a real app, you would fetch project data from an API
    // For this demo, we're using the dummy data
    const foundProject = dummyProjects.find((p) => p.id === params.id);

    // Simulate API loading
    const timer = setTimeout(() => {
      setProject(foundProject || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.id]);

  // Define status and type styling
  const statusClasses = {
    "in-progress": "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    completed: "bg-green-500/20 text-green-300 border border-green-500/30",
    delayed: "bg-red-500/20 text-red-300 border border-red-500/30",
    "on-hold": "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    planning: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  };

  const statusLabels = {
    "in-progress": "In Progress",
    completed: "Completed",
    delayed: "Delayed",
    "on-hold": "On Hold",
    planning: "Planning Phase",
  };

  const typeClasses: Record<string, string> = {
    Web: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    Mobile: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    Marketing: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  };

  // Function to toggle contribution details
  const toggleContributionDetails = (contributionId: string) => {
    if (selectedContribution === contributionId) {
      setSelectedContribution(null);
    } else {
      setSelectedContribution(contributionId);
    }
  };

  // Function to get the appropriate icon based on contribution action
  const getContributionIcon = (action: string): ReactNode => {
    if (action.includes("Completed task")) {
      return (
        <svg
          className="w-5 h-5 text-green-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
    } else if (
      action.includes("Added") ||
      action.includes("Created") ||
      action.includes("Upload")
    ) {
      return (
        <svg
          className="w-5 h-5 text-blue-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      );
    } else if (action.includes("Updated")) {
      return (
        <svg
          className="w-5 h-5 text-purple-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg
          className="w-5 h-5 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
    }
  };

  // Function to get the background color for contribution icon container
  const getContributionIconBg = (action: string): string => {
    if (action.includes("Completed task")) {
      return "bg-green-500/20";
    } else if (
      action.includes("Added") ||
      action.includes("Created") ||
      action.includes("Upload")
    ) {
      return "bg-blue-500/20";
    } else if (action.includes("Updated")) {
      return "bg-purple-500/20";
    } else {
      return "bg-gray-500/20";
    }
  };

  // Function to sort and filter contributions
  const getSortedAndFilteredContributions = (): Contribution[] => {
    if (!project?.contributions) return [];

    // First filter
    let filteredContributions = [...project.contributions];
    if (contributionFilter !== "all") {
      filteredContributions = filteredContributions.filter((c) => {
        if (contributionFilter === "completed") {
          return c.action.includes("Completed task");
        } else if (contributionFilter === "updates") {
          return c.action.includes("Updated");
        } else if (contributionFilter === "additions") {
          return (
            c.action.includes("Added") ||
            c.action.includes("Created") ||
            c.action.includes("Upload")
          );
        }
        return true;
      });
    }

    // Then sort
    return filteredContributions.sort((a, b) => {
      // Convert date strings to Date objects
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);

      // Sort based on selection
      if (contributionSort === "newest") {
        return dateB.getTime() - dateA.getTime();
      } else if (contributionSort === "oldest") {
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });
  };

  // After importing the component, add this function to parse milestones from the project data
  const getProjectMilestones = (projectData: (typeof dummyProjects)[0]) => {
    // This is a simplified example - in a real app you'd have actual milestone data
    return [
      {
        title: "Project Kickoff",
        isCompleted: true,
        completedAt: "Mar 15",
      },
      {
        title: "Design Phase",
        isCompleted: projectData.progress >= 30,
        completedAt: projectData.progress >= 30 ? "Apr 22" : undefined,
      },
      {
        title: "Development",
        isCompleted: projectData.progress >= 60,
        completedAt: projectData.progress >= 60 ? "May 18" : undefined,
      },
      {
        title: "Testing & QA",
        isCompleted: projectData.progress >= 80,
        completedAt: projectData.progress >= 80 ? "Jun 5" : undefined,
      },
      {
        title: "Launch",
        isCompleted: projectData.progress === 100,
        completedAt:
          projectData.progress === 100 ? projectData.dueDate : undefined,
      },
    ];
  };

  // Function to get activity data for charts
  // const getActivityData = () => {
  //   // Implementation
  // };

  // Remove unused functions
  // const getTimelineStats = (timelineData: string) => {
  //   // Implementation
  // };

  // Fix any types
  const handleTimelineUpdate = (updatedStep: TimelineStep) => {
    // ... existing code ...
  };

  const handleActivityUpdate = (activity: Activity) => {
    // ... existing code ...
  };

  const handleTaskUpdate = (task: Task) => {
    // ... existing code ...
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="p-4 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white/70">Loading project details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
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
          <h2 className="text-2xl font-bold text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-white/50 mb-6">
            We couldn&apos;t find the project you&apos;re looking for.
          </p>
          <Link
            href="/projects"
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
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              ></path>
            </svg>
            Back to Projects
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Back button and project title */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="mb-2 flex items-center text-white/70 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">{project.title}</h1>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                statusClasses[project.status]
              }`}
            >
              {statusLabels[project.status]}
            </span>
            <span
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                typeClasses[project.type]
              }`}
            >
              {project.type}
            </span>
          </div>
        </div>
      </div>

      {/* Project overview and stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-white/70">
                Progress
              </span>
              <span className="text-sm font-medium text-white/70">
                {project.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${
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
          </div>

          {/* Tabs */}
          <div className="border-b border-white/10 mb-6">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${
                    activeTab === "overview"
                      ? "text-pink-500 border-b-2 border-pink-500"
                      : "text-white/60 hover:text-white/80 hover:border-white/20 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${
                    activeTab === "tasks"
                      ? "text-pink-500 border-b-2 border-pink-500"
                      : "text-white/60 hover:text-white/80 hover:border-white/20 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab("tasks")}
                >
                  Tasks
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${
                    activeTab === "team"
                      ? "text-pink-500 border-b-2 border-pink-500"
                      : "text-white/60 hover:text-white/80 hover:border-white/20 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab("team")}
                >
                  Team
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${
                    activeTab === "contributions"
                      ? "text-pink-500 border-b-2 border-pink-500"
                      : "text-white/60 hover:text-white/80 hover:border-white/20 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab("contributions")}
                >
                  Contributions
                </button>
              </li>
              <li>
                <button
                  className={`inline-block p-4 ${
                    activeTab === "files"
                      ? "text-pink-500 border-b-2 border-pink-500"
                      : "text-white/60 hover:text-white/80 hover:border-white/20 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab("files")}
                >
                  Files
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <p className="text-white/80 mb-6">{project.overview}</p>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Project Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-white/60 text-sm">Client</p>
                    <p className="text-white">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Budget</p>
                    <p className="text-white">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Start Date</p>
                    <p className="text-white">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Due Date</p>
                    <p className="text-white">{project.dueDate}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === "tasks" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Project Tasks
                  </h3>
                  <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center text-sm transition-all">
                    <svg
                      className="w-4 h-4 mr-1.5"
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
                    Add Task
                  </button>
                </div>

                {/* Task filters */}
                <div className="flex mb-4 bg-white/5 rounded-xl p-1 inline-flex">
                  <button className="px-3 py-1 text-sm rounded-lg transition-all bg-white/20 text-white font-medium">
                    All Tasks
                  </button>
                  <button className="px-3 py-1 text-sm rounded-lg transition-all text-white/70 hover:text-white hover:bg-white/10">
                    Completed
                  </button>
                  <button className="px-3 py-1 text-sm rounded-lg transition-all text-white/70 hover:text-white hover:bg-white/10">
                    In Progress
                  </button>
                </div>

                {/* Tasks section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Current Tasks
                  </h3>
                  {project.tasks && project.tasks.length > 0 ? (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="space-y-2">
                        {project.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center ${
                                  task.completed
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-blue-500/20 text-blue-300"
                                }`}
                              >
                                {task.completed ? (
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-white">{task.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-white/60 text-sm">
                                {task.dueDate}
                              </span>
                              <span className="text-white/80 text-sm bg-white/10 px-2 py-1 rounded-md">
                                {task.assignedTo}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                      <p className="text-white/60">No tasks assigned yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === "team" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Project Team
                  </h3>
                  <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center text-sm transition-all">
                    <svg
                      className="w-4 h-4 mr-1.5"
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
                    Add Member
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.team.map(
                    (member: { id: string; name: string; avatar: string }) => (
                      <div
                        key={member.id}
                        className="flex items-center p-4 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 flex items-center justify-center text-white font-semibold mr-4">
                          {member.avatar ? (
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            member.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {member.name}
                          </p>
                          <p className="text-white/60 text-sm">Team Member</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Contributions Tab */}
            {activeTab === "contributions" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Project Contributions
                  </h3>
                  <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center text-sm transition-all">
                    <svg
                      className="w-4 h-4 mr-1.5"
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
                    Add Contribution
                  </button>
                </div>

                {/* Controls for filtering and sorting */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex bg-white/5 rounded-lg overflow-hidden">
                    <button
                      className={`px-3 py-1.5 text-xs ${
                        contributionFilter === "all"
                          ? "bg-blue-500/30 text-blue-200"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setContributionFilter("all")}
                    >
                      All
                    </button>
                    <button
                      className={`px-3 py-1.5 text-xs ${
                        contributionFilter === "completed"
                          ? "bg-green-500/30 text-green-200"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setContributionFilter("completed")}
                    >
                      Completed Tasks
                    </button>
                    <button
                      className={`px-3 py-1.5 text-xs ${
                        contributionFilter === "updates"
                          ? "bg-purple-500/30 text-purple-200"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setContributionFilter("updates")}
                    >
                      Updates
                    </button>
                    <button
                      className={`px-3 py-1.5 text-xs ${
                        contributionFilter === "additions"
                          ? "bg-blue-500/30 text-blue-200"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setContributionFilter("additions")}
                    >
                      Additions
                    </button>
                  </div>

                  <div className="flex bg-white/5 rounded-lg overflow-hidden ml-auto">
                    <button
                      className={`px-3 py-1.5 text-xs flex items-center ${
                        contributionSort === "newest"
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setContributionSort("newest")}
                    >
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                        ></path>
                      </svg>
                      Newest
                    </button>
                    <button
                      className={`px-3 py-1.5 text-xs flex items-center ${
                        contributionSort === "oldest"
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setContributionSort("oldest")}
                    >
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                        ></path>
                      </svg>
                      Oldest
                    </button>
                  </div>
                </div>

                {/* Empty state if no contributions match filter */}
                {getSortedAndFilteredContributions().length === 0 && (
                  <div className="bg-white/5 rounded-lg p-6 text-center">
                    <svg
                      className="w-12 h-12 text-white/30 mx-auto mb-4"
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
                    <p className="text-white/50 text-sm">
                      No contributions match your filter.
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg text-xs transition-all"
                      onClick={() => setContributionFilter("all")}
                    >
                      View All Contributions
                    </button>
                  </div>
                )}

                {/* Contributions list */}
                {getSortedAndFilteredContributions().length > 0 && (
                  <div className="space-y-4">
                    {getSortedAndFilteredContributions().map(
                      (contribution: Contribution) => (
                        <div
                          key={contribution.id}
                          className="flex flex-col bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all cursor-pointer"
                          onClick={() =>
                            toggleContributionDetails(contribution.id)
                          }
                        >
                          <div className="flex">
                            <div className="flex-shrink-0 mr-3">
                              <div
                                className={`w-8 h-8 rounded-full ${getContributionIconBg(
                                  contribution.action
                                )} flex items-center justify-center`}
                              >
                                {getContributionIcon(contribution.action)}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <p className="text-white/90 text-sm">
                                <span className="font-medium">
                                  {contribution.user}
                                </span>{" "}
                                {contribution.action}
                              </p>
                              <p className="text-white/50 text-xs mt-1">
                                {contribution.date}, {contribution.time}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <svg
                                className={`w-5 h-5 text-white/50 transform transition-transform ${
                                  selectedContribution === contribution.id
                                    ? "rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                ></path>
                              </svg>
                            </div>
                          </div>

                          {/* Expanded details section */}
                          {selectedContribution === contribution.id && (
                            <div className="mt-3 pl-11 border-l border-blue-500/30 ml-4 animate-fadeIn">
                              <p className="text-white/70 text-sm mb-2">
                                {contribution.description}
                              </p>
                              <div className="flex space-x-2 mt-2">
                                <button className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white/80 rounded text-xs transition-all">
                                  View Details
                                </button>
                                <button className="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded text-xs transition-all">
                                  Related Files
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Files Tab - Placeholder */}
            {activeTab === "files" && (
              <div className="text-center py-10">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No Files Yet
                </h3>
                <p className="text-white/60 mb-4">
                  Upload files to share with the team
                </p>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl inline-flex items-center transition-all mx-auto">
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  Upload Files
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity feed placeholder */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-white/90 text-sm">
                  <span className="font-medium">John Doe</span> updated the
                  project status
                </p>
                <p className="text-white/50 text-xs mt-1">Today, 2:30 PM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-white/90 text-sm">
                  <span className="font-medium">Jane Smith</span> updated the
                  project status
                </p>
                <p className="text-white/50 text-xs mt-1">Today, 11:45 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress Timeline */}
      <ProjectProgressPreview
        projectId={project.id}
        progress={project.progress}
        milestones={getProjectMilestones(project)}
      />
    </DashboardLayout>
  );
}
