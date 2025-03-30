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
  Filler,
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
  Legend,
  Filler
);

interface ProjectProgress {
  name: string;
  progress: number;
  type?: string; // Project type like "Web", "Mobile", "Marketing", etc.
}

interface ProjectProgressChartProps {
  projects: ProjectProgress[];
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

  const options = {
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
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
          color: "rgba(255, 255, 255, 0.7)",
        },
        grid: {
          display: true,
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
      line: {
        tension: 0.4, // Makes the line curved/wavy
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
  };

  const data = {
    labels: filteredProjects.map((project) => project.name),
    datasets: [
      {
        label: "Progress",
        data: filteredProjects.map((project) => project.progress),
        borderColor: "rgba(147, 51, 234, 0.8)", // Purple
        borderWidth: 3,
        pointBackgroundColor: "rgba(236, 72, 153, 1)", // Pink
        pointBorderColor: "rgba(255, 255, 255, 0.8)",
        pointBorderWidth: 2,
        fill: true,
        backgroundColor: (context: unknown) => {
          const ctx = (context as { chart: { ctx: CanvasRenderingContext2D } })
            .chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(236, 72, 153, 0.5)"); // Pink
          gradient.addColorStop(1, "rgba(67, 56, 202, 0.05)"); // Indigo
          return gradient;
        },
      },
    ],
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
