"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

export type TimelineStep = {
  id?: string; // Added ID for tracking dependencies
  year: string;
  title: string;
  description: string;
  color: string;
  icon?: string; // Optional custom icon name
  status?: "completed" | "in-progress" | "upcoming"; // Step status
  dependencies?: string[]; // IDs of steps this step depends on
  completionDate?: string; // Optional exact completion date
  assignees?: { id: string; name: string }[]; // People assigned to this step
  deliverables?: { title: string; completed: boolean }[]; // Deliverables for this step
  tags?: string[]; // Optional tags for categorization
};

type ProjectTimelineProps = {
  steps: TimelineStep[];
  interactive?: boolean; // Whether timeline supports drag and drop
  onStepUpdate?: (updatedStep: TimelineStep) => void; // Callback when a step is updated
};

export default function ProjectTimeline({
  steps,
  interactive = true,
  onStepUpdate,
}: ProjectTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [draggedStep, setDraggedStep] = useState<number | null>(null);
  const [showDependencies, setShowDependencies] = useState<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [connectionsVisible, setConnectionsVisible] = useState<boolean>(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<React.ReactNode[]>([]);

  // Use a ref instead of state for step refs to avoid re-renders
  const stepRefsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array when steps length changes
  useEffect(() => {
    if (stepRefsRef.current.length !== steps.length) {
      stepRefsRef.current = Array(steps.length).fill(null);
    }
  }, [steps.length]);

  // Show connections after component mounts for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Simple ref callback that doesn't trigger state updates
  const setStepRef = useCallback(
    (index: number) => (ref: HTMLDivElement | null) => {
      if (stepRefsRef.current[index] !== ref) {
        stepRefsRef.current[index] = ref;

        // Force update connections if all refs are set and we're showing dependencies
        if (showDependencies && connectionsVisible && timelineRef.current) {
          requestAnimationFrame(() => {
            updateConnectionPaths();
          });
        }
      }
    },
    [showDependencies, connectionsVisible]
  );

  // Function to update connection paths - declare first
  const updateConnectionPaths = useCallback(() => {
    if (!showDependencies || !connectionsVisible || !timelineRef.current) {
      setConnectionPaths([]);
      return;
    }

    // Skip if any required refs are missing
    if (stepRefsRef.current.some((ref) => ref === null)) {
      return;
    }

    const paths: React.ReactNode[] = [];

    try {
      steps.forEach((step, stepIndex) => {
        if (!step.dependencies?.length || !step.id) return;

        step.dependencies.forEach((depId) => {
          const dependentIndex = steps.findIndex((s) => s.id === depId);

          if (
            dependentIndex === -1 ||
            !stepRefsRef.current[stepIndex] ||
            !stepRefsRef.current[dependentIndex]
          )
            return;

          const fromEl = stepRefsRef.current[dependentIndex];
          const toEl = stepRefsRef.current[stepIndex];

          if (!fromEl || !toEl) return;

          try {
            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            const timelineRect = timelineRef.current.getBoundingClientRect();

            const fromX = 9; // Circle center
            const fromY = fromRect.top - timelineRect.top + fromRect.height / 2;
            const toX = 9; // Circle center
            const toY = toRect.top - timelineRect.top + 18; // Align with the top of the circle

            const isHighlighted =
              hoveredStep === stepIndex || hoveredStep === dependentIndex;

            paths.push(
              <path
                key={`${dependentIndex}-${stepIndex}`}
                d={`M${fromX},${fromY} C${fromX - 40},${fromY} ${
                  fromX - 40
                },${toY} ${toX},${toY}`}
                fill="none"
                stroke={isHighlighted ? "#f9a8d4" : "#ffffff"}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={isHighlighted ? "none" : "4,4"}
                strokeOpacity={isHighlighted ? 0.8 : 0.3}
                markerEnd="url(#arrowhead)"
                className="transition-all duration-300"
              />
            );
          } catch (e) {
            console.error("Error calculating connection positions:", e);
          }
        });
      });
    } catch (e) {
      console.error("Error rendering dependency connections:", e);
    }

    setConnectionPaths(paths);
  }, [showDependencies, connectionsVisible, hoveredStep, steps]);

  // Toggle a specific step - handle this first
  const toggleStepExpansion = useCallback(
    (index: number) => {
      setExpandedStep(expandedStep === index ? null : index);
      if (showDependencies && connectionsVisible && timelineRef.current) {
        updateConnectionPaths();
      }
    },
    [
      expandedStep,
      showDependencies,
      connectionsVisible,
      timelineRef,
      updateConnectionPaths,
    ]
  );

  // Use layout effect to update connections when dependencies change
  useLayoutEffect(() => {
    updateConnectionPaths();
  }, [updateConnectionPaths]);

  // Handle step drag start
  const handleDragStart = (index: number) => {
    if (!interactive) return;
    setDraggedStep(index);
  };

  // Handle step drag end
  const handleDragEnd = () => {
    setDraggedStep(null);
  };

  // Handle step drop
  const handleDrop = (targetIndex: number) => {
    if (draggedStep === null || !interactive) return;

    // Don't do anything if dropped on itself
    if (draggedStep === targetIndex) return;

    // Here you would implement the reordering logic
    // For demonstration purposes, we'll just log it
    console.log(`Moved step ${draggedStep} to position ${targetIndex}`);

    // If a callback was provided, use it
    if (onStepUpdate) {
      const updatedStep = { ...steps[draggedStep], newPosition: targetIndex };
      onStepUpdate(updatedStep);
    }

    setDraggedStep(null);
  };

  // Function to render appropriate icon based on step
  const renderIcon = (step: TimelineStep, index: number) => {
    // Default icons if none specified
    const defaultIcons = [
      "M12 6v6m0 0v6m0-6h6m-6 0H6", // Plus sign
      "M9 5l7 7-7 7", // Right arrow
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", // Light bulb
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", // Chart
      "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", // Globe
      "M13 10V3L4 14h7v7l9-11h-7z", // Lightning
    ];

    return step.icon || defaultIcons[index % defaultIcons.length];
  };

  // Function to get status of step
  const getStepStatus = (step: TimelineStep, index: number) => {
    if (step.status) return step.status;

    // Default logic if status isn't explicitly set
    if (index === 0) return "completed";
    if (index === steps.length - 1) return "upcoming";
    return index < Math.ceil(steps.length / 2) ? "completed" : "in-progress";
  };

  // Get ribbon styling based on status
  const getRibbonStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-green-500/40 to-green-400/40";
      case "in-progress":
        return "bg-gradient-to-r from-blue-500/40 to-blue-400/40";
      default:
        return "bg-gradient-to-r from-gray-500/30 to-gray-400/30";
    }
  };

  // Get connector styling based on status
  const getConnectorStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500/50";
      case "in-progress":
        return "border-blue-500/50";
      default:
        return "border-gray-500/30";
    }
  };

  // Add resize event listener
  useEffect(() => {
    // Update connections when dependencies change
    const handleResize = () => {
      updateConnectionPaths();
    };

    window.addEventListener("resize", handleResize);

    // Initial update
    if (showDependencies && connectionsVisible && steps.length > 0) {
      // Use setTimeout to ensure refs are ready
      setTimeout(() => {
        updateConnectionPaths();
      }, 100);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showDependencies, updateConnectionPaths, connectionsVisible, steps]);

  // Simplified render function that uses pre-calculated paths
  const renderDependencyConnections = () => {
    if (
      !showDependencies ||
      !connectionsVisible ||
      connectionPaths.length === 0
    ) {
      return null;
    }

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          minHeight: timelineRef.current?.scrollHeight || "100%",
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff" />
          </marker>
        </defs>
        {connectionPaths}
      </svg>
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Project Timeline</h2>

        <div className="flex items-center space-x-4">
          {/* Zoom controls */}
          <div className="flex items-center bg-white/5 rounded-lg">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.1))}
              className="p-1.5 text-white/70 hover:text-white"
              aria-label="Zoom out"
              disabled={zoomLevel <= 0.5}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-white/70 px-2 text-sm min-w-[40px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.1))}
              className="p-1.5 text-white/70 hover:text-white"
              aria-label="Zoom in"
              disabled={zoomLevel >= 2}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Dependencies toggle */}
          <button
            onClick={() => setShowDependencies((prev) => !prev)}
            className={`p-1.5 rounded-lg ${
              showDependencies
                ? "bg-pink-500/20 text-pink-300"
                : "bg-white/5 text-white/70 hover:text-white"
            } transition-colors`}
            aria-label={
              showDependencies ? "Hide dependencies" : "Show dependencies"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        ref={timelineRef}
        style={{ paddingBottom: showDependencies ? "2rem" : "0" }}
      >
        {/* Main vertical line */}
        <div className="absolute left-4 top-3 bottom-3 w-1 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50 rounded-full"></div>

        {/* Render dependency connections */}
        {renderDependencyConnections()}

        {/* Timeline steps */}
        <div
          className="space-y-16 md:space-y-20 relative"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
            transition: "transform 0.3s ease",
          }}
        >
          {steps.map((step, index) => {
            const status = getStepStatus(step, index);
            const isExpanded = expandedStep === index;
            const isDragged = draggedStep === index;
            const isHovered = hoveredStep === index;
            const connectorStyle = getConnectorStyle(status);
            const hasDependencies =
              step.dependencies && step.dependencies.length > 0;

            return (
              <div
                key={step.id || index}
                ref={setStepRef(index)}
                className={`flex items-start gap-4 md:gap-6 relative transition-all duration-300 ${
                  isExpanded ? "scale-105 -translate-y-1" : ""
                } ${isDragged ? "opacity-50" : "opacity-100"}`}
                onClick={() => toggleStepExpansion(index)}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                draggable={interactive}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                style={{
                  zIndex: isExpanded || isDragged ? 10 : 1,
                  cursor: interactive ? "grab" : "pointer",
                }}
              >
                {/* Start and Finish labels */}
                {index === 0 && (
                  <div className="absolute -top-12 left-0 bg-white/20 backdrop-blur-sm text-white text-xs font-bold py-1.5 px-4 rounded-full border border-white/20 shadow-lg animate-pulse">
                    START
                  </div>
                )}

                {index === steps.length - 1 && (
                  <div className="absolute -bottom-12 left-0 bg-white/20 backdrop-blur-sm text-white text-xs font-bold py-1.5 px-4 rounded-full border border-white/20 shadow-lg animate-pulse">
                    FINISH
                  </div>
                )}

                {/* Dotted line connecting to previous step */}
                {index > 0 && (
                  <div
                    className={`absolute left-4 -top-16 md:-top-20 bottom-auto h-16 md:h-20 border-l-2 border-dashed ${connectorStyle}`}
                  ></div>
                )}

                {/* Circle marker */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full border-2 border-white flex items-center justify-center shadow-lg ${
                    step.color
                  } transform transition-transform duration-300 ${
                    isExpanded || isHovered ? "scale-110" : "hover:scale-110"
                  }`}
                >
                  {/* Dependency indicator */}
                  {hasDependencies && showDependencies && (
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-500 rounded-full border-2 border-white z-10 animate-pulse"></div>
                  )}

                  {/* Completion checkmark for completed steps */}
                  {status === "completed" ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    /* Icon inside circle */
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={renderIcon(step, index)}
                      />
                    </svg>
                  )}
                </div>

                {/* Content container */}
                <div
                  className={`flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 transition-all duration-300 group hover:shadow-lg ${
                    isExpanded
                      ? "bg-white/10 shadow-xl border-white/20"
                      : isHovered
                      ? "bg-white/8"
                      : ""
                  } relative overflow-hidden`}
                >
                  {/* Status ribbon */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 transform rotate-45 ${getRibbonStyle(
                      status
                    )}`}
                  ></div>

                  {/* Year badge */}
                  <div
                    className={`inline-block ${step.color} text-white text-sm font-bold py-1 px-3 rounded-lg mb-3 shadow-sm`}
                  >
                    {step.year}
                  </div>

                  {/* Title and description */}
                  <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-pink-100 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                    {step.description}
                  </p>

                  {/* Status indicator */}
                  <div
                    className={`inline-flex items-center mt-4 px-2 py-1 rounded-full text-xs ${
                      status === "completed"
                        ? "bg-green-500/20 text-green-300"
                        : status === "in-progress"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-1.5 ${
                        status === "completed"
                          ? "bg-green-400 animate-pulse"
                          : status === "in-progress"
                          ? "bg-blue-400 animate-pulse"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    {status === "completed"
                      ? "Completed"
                      : status === "in-progress"
                      ? "In Progress"
                      : "Upcoming"}
                  </div>

                  {/* Additional details when expanded */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                      {/* Display completion date if available */}
                      {step.completionDate && (
                        <div className="mb-4">
                          <h4 className="text-white/70 text-xs uppercase mb-1">
                            Completion Date
                          </h4>
                          <p className="text-white text-sm">
                            {new Date(step.completionDate).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      )}

                      {/* Assignees section */}
                      {step.assignees && step.assignees.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white/70 text-xs uppercase mb-2">
                            Team Members
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {step.assignees.map((person, i) => (
                              <div
                                key={person.id || i}
                                className="flex items-center bg-white/10 rounded-full px-2 py-1"
                              >
                                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-xs text-white mr-1">
                                  {person.name.charAt(0)}
                                </div>
                                <span className="text-white text-xs">
                                  {person.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Deliverables checklist */}
                      {step.deliverables && step.deliverables.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white/70 text-xs uppercase mb-2">
                            Deliverables
                          </h4>
                          <div className="space-y-2">
                            {step.deliverables.map((deliverable, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div
                                  className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                                    deliverable.completed
                                      ? "bg-green-500/30 text-green-200"
                                      : "bg-white/10 text-white/30"
                                  }`}
                                >
                                  {deliverable.completed && (
                                    <svg
                                      className="w-3 h-3"
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
                                  )}
                                </div>
                                <span
                                  className={
                                    deliverable.completed
                                      ? "text-white"
                                      : "text-white/60"
                                  }
                                >
                                  {deliverable.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dependencies list */}
                      {step.dependencies && step.dependencies.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white/70 text-xs uppercase mb-2 flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                              />
                            </svg>
                            Dependencies
                          </h4>
                          <div className="text-white/80 text-sm">
                            Depends on:{" "}
                            {step.dependencies
                              .map((depId) => {
                                const depStep = steps.find(
                                  (s) => s.id === depId
                                );
                                return depStep ? depStep.title : "Unknown";
                              })
                              .join(", ")}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end mt-2">
                        <button className="text-pink-300 hover:text-pink-400 text-xs flex items-center transition-colors">
                          View Details
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dotted line to connect with the circle */}
                  <div className="absolute left-[calc(-1.5rem-1px)] top-4 w-4 h-0.5 border-t-2 border-dotted border-white/30"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive controls help text */}
      <div className="mt-8 bg-white/5 rounded-lg p-3 flex justify-between items-center">
        <div className="text-center text-white/60 text-sm">
          Click on any milestone to see more details
        </div>

        {interactive && (
          <div className="flex items-center text-white/60 text-xs">
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
                d="M7 11.5V14m0-2.5v-6a2 2 0 114 0v6m-4 0h4m-4 0v0a2 2 0 104 0v0"
              />
            </svg>
            Drag to reorder milestones
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

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
