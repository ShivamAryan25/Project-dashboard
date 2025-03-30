"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function NewProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Web",
    dueDate: "",
    client: "",
    budget: "",
    team: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission to backend
    console.log("Form submitted:", formData);
    // Redirect to projects page
    window.location.href = "/projects";
  };

  // Dummy team members for selection
  const teamMembers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Mike Johnson" },
    { id: "4", name: "Sarah Williams" },
    { id: "5", name: "David Brown" },
    { id: "6", name: "Lisa Taylor" },
    { id: "7", name: "Robert Miller" },
  ];

  const toggleTeamMember = (id: string) => {
    setFormData((prev) => {
      if (prev.team.includes(id)) {
        return {
          ...prev,
          team: prev.team.filter((memberId) => memberId !== id),
        };
      } else {
        return { ...prev, team: [...prev.team, id] };
      }
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
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
        <h1 className="text-2xl font-bold text-white">Create New Project</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Project Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-white font-medium mb-2"
                >
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                  placeholder="Enter project title"
                />
              </div>

              {/* Project Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-white font-medium mb-2"
                >
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                  placeholder="Describe the project"
                ></textarea>
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-white font-medium mb-2"
                >
                  Project Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                >
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
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-white font-medium mb-2"
                >
                  Due Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                />
              </div>

              {/* Client */}
              <div>
                <label
                  htmlFor="client"
                  className="block text-white font-medium mb-2"
                >
                  Client
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                  placeholder="Client name"
                />
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-white font-medium mb-2"
                >
                  Budget
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-2 px-3 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none"
                  placeholder="$0.00"
                />
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Team Members
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => toggleTeamMember(member.id)}
                  className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.team.includes(member.id)
                      ? "bg-white/20 border-pink-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 flex items-center justify-center text-white font-semibold mr-3">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <p className="text-white font-medium text-sm">
                    {member.name}
                  </p>
                  {formData.team.includes(member.id) && (
                    <svg
                      className="w-5 h-5 ml-auto text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <Link
              href="/projects"
              className="px-4 py-2 border border-white/10 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
