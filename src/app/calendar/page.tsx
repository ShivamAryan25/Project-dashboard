"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TaskDetailModal from "@/components/TaskDetailModal";
import CalendarTask from "@/components/CalendarTask";

// Function to generate realistic sample task data
const generateCalendarTasks = () => {
  // Get current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  // Project definitions
  const projects = [
    { id: "1", name: "Website Redesign", color: "indigo" },
    { id: "2", name: "Mobile App Development", color: "amber" },
    { id: "3", name: "Marketing Campaign", color: "rose" },
    { id: "4", name: "E-commerce Platform", color: "emerald" },
    { id: "5", name: "Product Launch", color: "violet" },
  ];

  // Team members
  const team = [
    { id: "user1", name: "John Doe", avatar: "" },
    { id: "user2", name: "Jane Smith", avatar: "" },
    { id: "user3", name: "Mike Johnson", avatar: "" },
    { id: "user4", name: "Sarah Williams", avatar: "" },
    { id: "user5", name: "David Brown", avatar: "" },
  ];

  // Task templates
  const taskTypes = [
    { title: "Design Review", duration: 1.5, priority: "medium" },
    { title: "Team Meeting", duration: 1, priority: "medium" },
    { title: "Client Presentation", duration: 2, priority: "high" },
    { title: "Sprint Planning", duration: 2, priority: "high" },
    { title: "Code Review", duration: 1, priority: "medium" },
    { title: "Testing Session", duration: 3, priority: "medium" },
    { title: "Deployment", duration: 2, priority: "high" },
    { title: "Brainstorming", duration: 1.5, priority: "low" },
    { title: "User Research", duration: 4, priority: "medium" },
    { title: "Content Creation", duration: 3, priority: "medium" },
    { title: "Stakeholder Update", duration: 1, priority: "high" },
    { title: "Documentation", duration: 2, priority: "low" },
  ];

  // Project-specific tasks
  interface ProjectTask {
    title: string;
    duration: number;
    priority: string;
  }

  const projectTasks: Record<string, ProjectTask[]> = {
    "1": [
      { title: "Homepage Wireframes", duration: 4, priority: "high" },
      { title: "Navigation Design", duration: 2, priority: "medium" },
      { title: "UI Component Library", duration: 6, priority: "high" },
      { title: "Responsive Layout Testing", duration: 3, priority: "medium" },
      { title: "Client Feedback Review", duration: 1.5, priority: "high" },
    ],
    "2": [
      { title: "API Integration", duration: 4, priority: "high" },
      { title: "Authentication Flow", duration: 3, priority: "high" },
      { title: "Push Notification Setup", duration: 2, priority: "medium" },
      { title: "App Store Submission", duration: 1, priority: "high" },
      { title: "Beta Testing", duration: 5, priority: "medium" },
    ],
    "3": [
      { title: "Social Media Content", duration: 3, priority: "medium" },
      { title: "Email Campaign", duration: 2, priority: "high" },
      { title: "Analytics Review", duration: 1.5, priority: "low" },
      { title: "Campaign Strategy", duration: 2, priority: "high" },
      { title: "Content Creation", duration: 4, priority: "medium" },
    ],
    "4": [
      { title: "Payment Integration", duration: 4, priority: "high" },
      { title: "Product Catalog", duration: 3, priority: "medium" },
      { title: "Shipping Calculator", duration: 2, priority: "medium" },
      { title: "User Testing", duration: 3, priority: "high" },
      { title: "Security Audit", duration: 2, priority: "high" },
    ],
    "5": [
      { title: "Press Release", duration: 2, priority: "high" },
      { title: "Launch Event Planning", duration: 4, priority: "high" },
      { title: "Marketing Materials", duration: 3, priority: "medium" },
      { title: "Partner Outreach", duration: 1.5, priority: "medium" },
      { title: "Launch Checklist Review", duration: 1, priority: "high" },
    ],
  };

  // Generate tasks for the current month plus/minus 15 days
  const startDate = new Date(currentYear, currentMonth, today - 15);
  const endDate = new Date(currentYear, currentMonth, today + 45);

  const tasks = [];
  let taskId = 1;

  // Loop through dates to distribute tasks
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Skip some days randomly to avoid overcrowding
    if (Math.random() < 0.3) continue;

    // Determine how many tasks for this day (1-3)
    const tasksPerDay = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < tasksPerDay; i++) {
      // Select random project
      const project = projects[Math.floor(Math.random() * projects.length)];

      // Select random task type - mix of general and project-specific tasks
      const useProjectTask = Math.random() < 0.7; // 70% chance of project-specific task
      let taskTemplate;

      if (useProjectTask && projectTasks[project.id]) {
        const projectSpecificTasks = projectTasks[project.id];
        taskTemplate =
          projectSpecificTasks[
            Math.floor(Math.random() * projectSpecificTasks.length)
          ];
      } else {
        taskTemplate = taskTypes[Math.floor(Math.random() * taskTypes.length)];
      }

      // Random start hour between 9 AM and 4 PM
      const startHour = Math.floor(Math.random() * 8) + 9;
      const startMinute = Math.random() < 0.5 ? 0 : 30; // Either on the hour or half-hour

      // Create start and end dates
      const taskDate = new Date(d);
      const start = new Date(taskDate);
      start.setHours(startHour, startMinute, 0);

      const end = new Date(start);
      end.setHours(start.getHours() + Math.floor(taskTemplate.duration));
      end.setMinutes(start.getMinutes() + (taskTemplate.duration % 1) * 60);

      // Random assignee
      const assignee = team[Math.floor(Math.random() * team.length)];

      // Random status (weighted towards in-progress for recent dates)
      let status;
      const dayDiff = Math.floor((now - start) / (1000 * 60 * 60 * 24));

      if (dayDiff > 7) {
        // Past tasks are likely completed
        status = Math.random() < 0.8 ? "completed" : "in-progress";
      } else if (dayDiff >= 0) {
        // Recent tasks are likely in progress
        status =
          Math.random() < 0.7
            ? "in-progress"
            : Math.random() < 0.5
            ? "completed"
            : "delayed";
      } else {
        // Future tasks are upcoming
        status = "upcoming";
      }

      // Create the task
      tasks.push({
        id: `t${taskId++}`,
        title: taskTemplate.title,
        start: start.toISOString(),
        end: end.toISOString(),
        projectId: project.id,
        projectName: project.name,
        status,
        priority: taskTemplate.priority,
        assignee,
      });
    }
  }

  return tasks;
};

// Generate tasks with our utility function
const mockTasks = generateCalendarTasks();

type CalendarViewType = "month" | "week" | "day";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks] = useState(mockTasks);
  const [view, setView] = useState<CalendarViewType>("month");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Function to navigate to previous period
  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  // Function to navigate to next period
  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  // Function to reset to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get days in month for the calendar grid
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Total days in the month
    const daysInMonth = lastDay.getDate();

    // Array to hold all calendar days including previous/next month days
    const calendarDays = [];

    // Add days from previous month to fill the first row
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      calendarDays.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Add days of current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      calendarDays.push({
        date,
        day: i,
        isCurrentMonth: true,
        isToday:
          i === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
      });
    }

    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      calendarDays.push({
        date,
        day: i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return calendarDays;
  };

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.start);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get formatted date title based on current view
  const getFormattedDateTitle = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };

    if (view === "month") {
      return currentDate.toLocaleDateString("en-US", options);
    } else if (view === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const startMonth = weekStart.toLocaleDateString("en-US", {
        month: "short",
      });
      const endMonth = weekEnd.toLocaleDateString("en-US", { month: "short" });

      return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
    } else if (view === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    return currentDate.toLocaleDateString("en-US", options);
  };

  // Function to handle task click
  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId);
    setShowDetailModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Calendar</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all">
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
          New Event
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={previousPeriod}
              className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
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
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={nextPeriod}
              className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
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
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-white">
              {getFormattedDateTitle()}
            </h2>
          </div>

          <div className="flex bg-white/5 backdrop-blur-md rounded-lg overflow-hidden">
            <button
              onClick={() => setView("month")}
              className={`px-4 py-2 text-sm ${
                view === "month"
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10"
              } transition-colors`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 text-sm ${
                view === "week"
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10"
              } transition-colors`}
            >
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className={`px-4 py-2 text-sm ${
                view === "day"
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10"
              } transition-colors`}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Month View */}
      {view === "month" && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          {/* Calendar Header - Days of Week */}
          <div className="grid grid-cols-7 border-b border-white/10">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-3 text-center text-white/70 font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {getDaysInMonth().map((day, index) => {
              const tasksForDay = getTasksForDate(day.date);

              return (
                <div
                  key={index}
                  className={`min-h-24 p-2 border-r border-b border-white/10 ${
                    !day.isCurrentMonth ? "bg-white/5" : ""
                  } ${day.isToday ? "bg-pink-500/10" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        day.isToday
                          ? "bg-pink-500 text-white"
                          : day.isCurrentMonth
                          ? "text-white"
                          : "text-white/40"
                      }`}
                    >
                      {day.day}
                    </span>
                    {tasksForDay.length > 0 && (
                      <span className="text-xs px-1.5 py-0.5 bg-white/10 rounded text-white/70">
                        {tasksForDay.length}
                      </span>
                    )}
                  </div>

                  {/* Task list for this day */}
                  <div className="mt-1 space-y-1">
                    {tasksForDay.slice(0, 3).map((task) => (
                      <CalendarTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        start={task.start}
                        end={task.end}
                        projectId={task.projectId}
                        projectName={task.projectName}
                        status={task.status}
                        priority={task.priority}
                        assignee={task.assignee}
                        view="month"
                        onClick={() => handleTaskClick(task.id)}
                      />
                    ))}
                    {tasksForDay.length > 3 && (
                      <div className="text-xs text-white/70 pl-2">
                        +{tasksForDay.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === "week" && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          {/* Week Header - Shows dates of the week */}
          <div className="grid grid-cols-8 border-b border-white/10">
            {/* Time column header */}
            <div className="py-3 text-center text-white/70 font-medium border-r border-white/10">
              Time
            </div>

            {/* Days of week */}
            {(() => {
              const weekDays = [];
              const weekStart = new Date(currentDate);
              // Adjust to the start of the week (Sunday)
              weekStart.setDate(currentDate.getDate() - currentDate.getDay());

              for (let i = 0; i < 7; i++) {
                const day = new Date(weekStart);
                day.setDate(weekStart.getDate() + i);

                const isToday =
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear();

                weekDays.push(
                  <div
                    key={i}
                    className={`py-3 text-center font-medium ${
                      isToday ? "text-pink-300" : "text-white/70"
                    }`}
                  >
                    <div>
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}
                    </div>
                    <div
                      className={`mt-1 text-lg ${
                        isToday
                          ? "bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                          : ""
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                );
              }

              return weekDays;
            })()}
          </div>

          {/* Week Grid - Hours and events */}
          <div className="grid grid-cols-8">
            {/* Time slots */}
            <div className="border-r border-white/10">
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="h-16 px-2 text-xs text-right text-white/50 relative border-b border-white/5 pr-2"
                >
                  <span className="absolute -top-2.5 right-2">
                    {i === 0
                      ? "12 AM"
                      : i < 12
                      ? `${i} AM`
                      : i === 12
                      ? "12 PM"
                      : `${i - 12} PM`}
                  </span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const day = new Date(currentDate);
              day.setDate(
                currentDate.getDate() - currentDate.getDay() + dayIndex
              );

              // Format the date string to match task dates (YYYY-MM-DD)
              const formattedDate = day.toISOString().split("T")[0];

              // Get tasks for this day
              const dayTasks = tasks.filter((task) => {
                const taskDate = new Date(task.start)
                  .toISOString()
                  .split("T")[0];
                return taskDate === formattedDate;
              });

              return (
                <div
                  key={dayIndex}
                  className="border-r border-white/10 relative"
                >
                  {/* Render hour cells */}
                  {Array.from({ length: 24 }, (_, hour) => (
                    <div
                      key={hour}
                      className="h-16 border-b border-white/5 relative"
                    ></div>
                  ))}

                  {/* Current time indicator for today */}
                  {day.toDateString() === new Date().toDateString() && (
                    <div
                      className="absolute left-0 right-0 border-t-2 border-pink-500 z-10"
                      style={{
                        top: `${
                          ((new Date().getHours() * 60 +
                            new Date().getMinutes()) /
                            60) *
                          4
                        }rem`,
                      }}
                    >
                      <div className="absolute -top-1.5 -left-1 w-3 h-3 rounded-full bg-pink-500"></div>
                    </div>
                  )}

                  {/* Render tasks */}
                  {dayTasks.map((task) => {
                    const startTime = new Date(task.start);
                    const endTime = new Date(task.end);

                    // Calculate position and height
                    const startHour =
                      startTime.getHours() + startTime.getMinutes() / 60;
                    const endHour =
                      endTime.getHours() + endTime.getMinutes() / 60;
                    const duration = endHour - startHour;

                    return (
                      <CalendarTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        start={task.start}
                        end={task.end}
                        projectId={task.projectId}
                        projectName={task.projectName}
                        status={task.status}
                        priority={task.priority}
                        assignee={task.assignee}
                        view="week"
                        style={{
                          position: "absolute",
                          left: "2px",
                          right: "2px",
                          top: `${startHour * 4}rem`,
                          height: `${duration * 4}rem`,
                          minHeight: "1.5rem",
                        }}
                        onClick={() => handleTaskClick(task.id)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === "day" && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1">
            {/* Day Header */}
            <div className="p-4 border-b border-white/10 flex justify-center">
              <div className="text-center">
                <div className="text-white/70 font-medium">
                  {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
                </div>
                <div
                  className={`text-3xl font-bold mt-1 flex items-center justify-center ${
                    currentDate.toDateString() === new Date().toDateString()
                      ? "text-pink-300"
                      : "text-white"
                  }`}
                >
                  {currentDate.toLocaleDateString("en-US", { day: "numeric" })}
                  <span className="ml-2 text-lg font-normal text-white/70">
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* All-day events would go here */}
            <div className="p-2 border-b border-white/10 bg-white/5">
              <div className="text-xs text-white/60 mb-1 pl-16">ALL DAY</div>
              <div className="flex">
                <div className="w-16 text-right pr-4 pt-2 text-xs text-white/60"></div>
                <div className="flex-1 min-h-8 rounded-lg bg-white/5 p-1.5">
                  {/* Empty state */}
                  <div className="text-xs text-white/40 italic">
                    No all-day events
                  </div>
                </div>
              </div>
            </div>

            {/* Hours and tasks */}
            <div className="relative">
              {/* Current time indicator */}
              {currentDate.toDateString() === new Date().toDateString() && (
                <div
                  className="absolute left-0 right-0 border-t-2 border-pink-500 z-10 pl-16"
                  style={{
                    top: `${
                      ((new Date().getHours() * 60 + new Date().getMinutes()) /
                        60) *
                      6
                    }rem`,
                  }}
                >
                  <div className="absolute -top-1.5 left-14 w-3 h-3 rounded-full bg-pink-500"></div>
                  <div className="absolute -top-3 left-20 text-xs text-pink-300 font-medium">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              )}

              {/* Hour blocks */}
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i;
                const hourLabel =
                  hour === 0
                    ? "12 AM"
                    : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                    ? "12 PM"
                    : `${hour - 12} PM`;

                // Get tasks that occur during this hour
                const hourTasks = tasks.filter((task) => {
                  if (
                    new Date(task.start).toDateString() !==
                    currentDate.toDateString()
                  ) {
                    return false;
                  }

                  const taskStart = new Date(task.start);
                  const taskEnd = new Date(task.end);

                  const hourStart = new Date(currentDate);
                  hourStart.setHours(hour, 0, 0);

                  const hourEnd = new Date(currentDate);
                  hourEnd.setHours(hour, 59, 59);

                  // Task starts during this hour or overlaps from a previous hour
                  return (
                    (taskStart >= hourStart && taskStart <= hourEnd) || // Task starts in this hour
                    (taskEnd >= hourStart && taskEnd <= hourEnd) || // Task ends in this hour
                    (taskStart <= hourStart && taskEnd >= hourEnd) // Task spans across this hour
                  );
                });

                return (
                  <div key={hour} className="flex border-b border-white/5">
                    {/* Hour label */}
                    <div className="w-16 text-right pr-4 pt-2 text-xs text-white/60 h-24">
                      {hourLabel}
                    </div>

                    {/* Hour content area */}
                    <div className="flex-1 p-1 relative min-h-24">
                      {/* 30-minute divider */}
                      <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white/10"></div>

                      {/* Tasks in this hour */}
                      {hourTasks.map((task) => {
                        const startTime = new Date(task.start);
                        const endTime = new Date(task.end);

                        // If task spans multiple hours, calculate what portion to display
                        const hourStartTime = new Date(currentDate);
                        hourStartTime.setHours(hour, 0, 0);

                        const hourEndTime = new Date(currentDate);
                        hourEndTime.setHours(hour, 59, 59);

                        // Calculate position within the hour (0-1)
                        let positionStart = 0;
                        if (
                          startTime >= hourStartTime &&
                          startTime <= hourEndTime
                        ) {
                          // Task starts within this hour
                          const startMinute = startTime.getMinutes();
                          positionStart = startMinute / 60;
                        }

                        // Calculate height (0-1)
                        let height;
                        if (endTime <= hourEndTime) {
                          // Task ends within this hour
                          const duration =
                            (endTime.getHours() - startTime.getHours()) * 60 +
                            (endTime.getMinutes() - startTime.getMinutes());
                          height = duration / 60;

                          // Ensure minimum height for short tasks
                          height = Math.max(0.1, height);
                        } else {
                          // Task extends beyond this hour
                          const visibleDuration = 60 - startTime.getMinutes();
                          height = visibleDuration / 60;

                          // If task started in a previous hour
                          if (startTime < hourStartTime) {
                            positionStart = 0;
                            height = 1; // Take the full hour
                          }
                        }

                        return (
                          <CalendarTask
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            start={task.start}
                            end={task.end}
                            projectId={task.projectId}
                            projectName={task.projectName}
                            status={task.status}
                            priority={task.priority}
                            assignee={task.assignee}
                            view="day"
                            style={{
                              position: "absolute",
                              left: "2px",
                              right: "2px",
                              top: `${positionStart * 100}%`,
                              height: `${height * 100}%`,
                              minHeight: "1.5rem",
                            }}
                            onClick={() => handleTaskClick(task.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && showDetailModal && (
        <TaskDetailModal
          task={tasks.find((t) => t.id === selectedTask) || null}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </DashboardLayout>
  );
}
