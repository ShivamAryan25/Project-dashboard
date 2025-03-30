"use client";

import React, { useState, useEffect } from "react";

type TimelineFilterProps = {
  onFilterChange: (filters: TimelineFilters) => void;
  initialFilters?: TimelineFilters;
  projectTags?: string[]; // For project-specific filters
  showSavePresets?: boolean;
};

export type TimelineFilters = {
  dateRange: "all" | "year" | "quarter" | "month" | "custom";
  status: "all" | "completed" | "in-progress" | "upcoming";
  customStartDate?: string;
  customEndDate?: string;
  sortOrder: "newest-first" | "oldest-first";
  groupBy?: "month" | "quarter" | "year" | "none";
  assignees?: string[]; // Filter by team members
  tags?: string[]; // Filter by tags/categories
  searchQuery?: string; // Search by text
};

export default function TimelineFilter({
  onFilterChange,
  initialFilters = {
    dateRange: "all",
    status: "all",
    sortOrder: "newest-first",
    groupBy: "none",
    assignees: [],
    tags: [],
    searchQuery: "",
  },
  projectTags = [],
  showSavePresets = false,
}: TimelineFilterProps) {
  const [filters, setFilters] = useState<TimelineFilters>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [presets, setPresets] = useState<
    { name: string; filters: TimelineFilters }[]
  >([]);
  const [newPresetName, setNewPresetName] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Simulated team members for demo
  const teamMembers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Mike Johnson" },
    { id: "4", name: "Sarah Williams" },
    { id: "5", name: "Alex Chen" },
  ];

  // Load presets from localStorage on mount
  useEffect(() => {
    const savedPresets = localStorage.getItem("timeline-filter-presets");
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.error("Failed to parse saved presets", e);
      }
    }
  }, []);

  // Handle filter changes
  const handleFilterChange = (
    key: keyof TimelineFilters,
    value: string | string[] | boolean | undefined
  ) => {
    const newFilters = { ...filters, [key]: value };

    // Special logic for custom date range
    if (key === "dateRange" && value === "custom") {
      // Initialize custom dates if empty
      if (!newFilters.customStartDate) {
        const today = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);

        newFilters.customStartDate = threeMonthsAgo.toISOString().split("T")[0];
        newFilters.customEndDate = today.toISOString().split("T")[0];
      }
    }

    setFilters(newFilters);
    setIsDirty(true);
    onFilterChange(newFilters);
  };

  // Handle array-based filters (tags, assignees)
  const handleArrayFilterChange = (
    key: "tags" | "assignees",
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[key] || [];
    let newValues;

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((item) => item !== value);
    }

    const newFilters = {
      ...filters,
      [key]: newValues,
    };

    setFilters(newFilters);
    setIsDirty(true);
    onFilterChange(newFilters);
  };

  // Save current filter as preset
  const savePreset = () => {
    if (!newPresetName.trim()) return;

    const newPresets = [
      ...presets,
      {
        name: newPresetName,
        filters: { ...filters },
      },
    ];

    setPresets(newPresets);
    setNewPresetName("");
    localStorage.setItem("timeline-filter-presets", JSON.stringify(newPresets));
  };

  // Apply a saved preset
  const applyPreset = (preset: { name: string; filters: TimelineFilters }) => {
    setFilters(preset.filters);
    onFilterChange(preset.filters);
    setShowPresets(false);
    setIsDirty(false);
  };

  // Delete a preset
  const deletePreset = (index: number) => {
    const newPresets = [...presets];
    newPresets.splice(index, 1);
    setPresets(newPresets);
    localStorage.setItem("timeline-filter-presets", JSON.stringify(newPresets));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 mb-6">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">Timeline Filters</h2>
          {isDirty && (
            <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-0.5 rounded-full">
              Modified
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {showSavePresets && (
            <button
              onClick={() => setShowPresets(!showPresets)}
              className="flex items-center text-white/70 hover:text-white transition-colors text-sm bg-white/5 px-2 py-1 rounded-lg"
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
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {presets.length} Presets
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
          >
            {isExpanded ? "Collapse Filters" : "Expand Filters"}
            <svg
              className={`ml-1 w-5 h-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search milestones..."
            value={filters.searchQuery || ""}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {filters.searchQuery && (
            <button
              onClick={() => handleFilterChange("searchQuery", "")}
              className="absolute right-3 top-2.5 text-white/50 hover:text-white/80"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Basic filters (always visible) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          >
            <option value="all">All Time</option>
            <option value="year">Past Year</option>
            <option value="quarter">Past 3 Months</option>
            <option value="month">Past Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Sort Order</label>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          >
            <option value="newest-first">Newest First</option>
            <option value="oldest-first">Oldest First</option>
          </select>
        </div>

        {/* Group By */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Group By</label>
          <select
            value={filters.groupBy}
            onChange={(e) => handleFilterChange("groupBy", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          >
            <option value="none">No Grouping</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
          {/* Custom date range inputs */}
          {filters.dateRange === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.customStartDate || ""}
                  onChange={(e) =>
                    handleFilterChange("customStartDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.customEndDate || ""}
                  onChange={(e) =>
                    handleFilterChange("customEndDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
            </div>
          )}

          {/* Advanced filters section */}
          <div className="mb-6">
            <h3 className="text-white text-sm font-medium mb-3">
              Advanced Filters
            </h3>

            {/* Team members filter */}
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">
                Team Members
              </label>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map((member) => (
                  <label
                    key={member.id}
                    className={`flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                      filters.assignees?.includes(member.id)
                        ? "bg-pink-500/20 text-pink-200 border border-pink-500/30"
                        : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters.assignees?.includes(member.id) || false}
                      onChange={(e) =>
                        handleArrayFilterChange(
                          "assignees",
                          member.id,
                          e.target.checked
                        )
                      }
                    />
                    <span className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-xs text-white mr-2">
                      {member.name.charAt(0)}
                    </span>
                    {member.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Tags filter */}
            {projectTags.length > 0 && (
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {projectTags.map((tag, index) => (
                    <label
                      key={index}
                      className={`flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                        filters.tags?.includes(tag)
                          ? "bg-blue-500/20 text-blue-200 border border-blue-500/30"
                          : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={filters.tags?.includes(tag) || false}
                        onChange={(e) =>
                          handleArrayFilterChange("tags", tag, e.target.checked)
                        }
                      />
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Presets section */}
          {showSavePresets && showPresets && (
            <div className="mb-6 bg-white/5 p-3 rounded-lg">
              <h3 className="text-white text-sm font-medium mb-3 flex items-center">
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
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Saved Filter Presets
              </h3>

              {/* Save new preset */}
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="New preset name..."
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-pink-500/50 text-sm"
                />
                <button
                  onClick={savePreset}
                  disabled={!newPresetName.trim()}
                  className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:hover:bg-pink-500 text-white px-3 py-2 rounded-r-lg text-sm"
                >
                  Save Current
                </button>
              </div>

              {/* List of presets */}
              {presets.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {presets.map((preset, index) => (
                    <li
                      key={index}
                      className="bg-white/5 rounded-lg p-2 text-sm flex justify-between items-center group hover:bg-white/10 transition-colors"
                    >
                      <button
                        onClick={() => applyPreset(preset)}
                        className="text-white hover:text-pink-200 flex-1 text-left"
                      >
                        {preset.name}
                      </button>
                      <button
                        onClick={() => deletePreset(index)}
                        className="text-white/40 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/50 text-sm italic">
                  No saved presets yet
                </p>
              )}
            </div>
          )}

          {/* Filter buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                const defaultFilters = {
                  dateRange: "all",
                  status: "all",
                  sortOrder: "newest-first",
                  groupBy: "none",
                  assignees: [],
                  tags: [],
                  searchQuery: "",
                };
                setFilters(defaultFilters);
                onFilterChange(defaultFilters);
                setIsDirty(false);
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={() => onFilterChange(filters)}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm hover:shadow-lg transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Applied filters summary - only show if filters are applied */}
      {!isExpanded &&
        (filters.status !== "all" ||
          filters.dateRange !== "all" ||
          filters.assignees?.length ||
          filters.tags?.length ||
          filters.searchQuery) && (
          <div className="mt-3 pt-3 border-t border-white/10 animate-fadeIn">
            <div className="flex flex-wrap gap-2">
              {filters.status !== "all" && (
                <div className="bg-white/5 rounded-full px-2 py-1 text-xs text-white/80 flex items-center">
                  Status: {filters.status}
                  <button
                    onClick={() => handleFilterChange("status", "all")}
                    className="ml-1 text-white/60 hover:text-white"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {filters.dateRange !== "all" && (
                <div className="bg-white/5 rounded-full px-2 py-1 text-xs text-white/80 flex items-center">
                  Time:{" "}
                  {filters.dateRange === "custom"
                    ? "Custom Range"
                    : `Past ${
                        filters.dateRange === "year"
                          ? "Year"
                          : filters.dateRange === "quarter"
                          ? "3 Months"
                          : "Month"
                      }`}
                  <button
                    onClick={() => handleFilterChange("dateRange", "all")}
                    className="ml-1 text-white/60 hover:text-white"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {filters.searchQuery && (
                <div className="bg-white/5 rounded-full px-2 py-1 text-xs text-white/80 flex items-center">
                  Search: {filters.searchQuery}
                  <button
                    onClick={() => handleFilterChange("searchQuery", "")}
                    className="ml-1 text-white/60 hover:text-white"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {filters.assignees?.map((assigneeId) => {
                const member = teamMembers.find((m) => m.id === assigneeId);
                if (!member) return null;

                return (
                  <div
                    key={assigneeId}
                    className="bg-pink-500/20 border border-pink-500/30 rounded-full px-2 py-1 text-xs text-pink-200 flex items-center"
                  >
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 mr-1.5 flex items-center justify-center text-[10px] text-white">
                      {member.name.charAt(0)}
                    </span>
                    {member.name}
                    <button
                      onClick={() =>
                        handleArrayFilterChange("assignees", assigneeId, false)
                      }
                      className="ml-1 text-pink-300/60 hover:text-pink-300"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}

              {filters.tags?.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue-500/20 border border-blue-500/30 rounded-full px-2 py-1 text-xs text-blue-200 flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-1.5"></span>
                  {tag}
                  <button
                    onClick={() => handleArrayFilterChange("tags", tag, false)}
                    className="ml-1 text-blue-300/60 hover:text-blue-300"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {(filters.status !== "all" ||
                filters.dateRange !== "all" ||
                filters.assignees?.length ||
                filters.tags?.length ||
                filters.searchQuery) && (
                <button
                  onClick={() => {
                    const defaultFilters = {
                      dateRange: "all",
                      status: "all",
                      sortOrder: filters.sortOrder,
                      groupBy: filters.groupBy,
                      assignees: [],
                      tags: [],
                      searchQuery: "",
                    };
                    setFilters(defaultFilters);
                    onFilterChange(defaultFilters);
                    setIsDirty(false);
                  }}
                  className="text-white/60 hover:text-white text-xs underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}

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
    </div>
  );
}
