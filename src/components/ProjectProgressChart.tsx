"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Project {
  name: string;
  progress: number;
  type: string;
}

interface ProjectProgressChartProps {
  projects: Project[];
  className?: string;
}

export default function ProjectProgressChart({
  projects,
  className,
}: ProjectProgressChartProps) {
  // Default to "All" view
  const [selectedType, setSelectedType] = useState<string>("All");

  // Extract unique project types
  const projectTypes = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.type || "Other"))),
  ];

  // Filter projects based on selected type
  const filteredProjects =
    selectedType === "All"
      ? projects
      : projects.filter((project) => project.type === selectedType);

  const data = {
    labels: filteredProjects.map((project) => project.name),
    datasets: [
      {
        label: "Progress",
        data: filteredProjects.map((project) => project.progress),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
          color: "rgba(255, 255, 255, 0.7)",
        },
        grid: {
          display: false,
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: "rgb(99, 102, 241)",
        borderColor: "white",
        borderWidth: 2,
      },
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 transition-all hover:bg-white/20 hover:shadow-xl ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Project Progress</h2>

        {/* Filter Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
          {projectTypes.map((type) => (
            <button
              key={type}
              className={`px-3 py-1 text-sm rounded-lg transition-all ${
                selectedType === type
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="h-60">
        {filteredProjects.length > 0 ? (
          <Line options={options} data={data} />
        ) : (
          <div className="flex items-center justify-center h-full text-white/50">
            No projects of this type found
          </div>
        )}
      </div>
    </div>
  );
}
