"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isExpanded, setIsExpanded] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Get the current path to determine active menu item
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActiveMenu("dashboard");
    } else if (pathname.startsWith("/projects")) {
      setActiveMenu("projects");
    } else if (pathname.startsWith("/tasks")) {
      setActiveMenu("tasks");
    } else if (pathname.startsWith("/team")) {
      setActiveMenu("team");
    } else if (pathname.startsWith("/analytics")) {
      setActiveMenu("analytics");
    } else if (pathname.startsWith("/settings")) {
      setActiveMenu("settings");
    }
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      href: "/projects",
      icon: (
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
      ),
    },
    {
      id: "calendar",
      label: "Calendar",
      href: "/calendar",
      icon: (
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
      ),
    },
    {
      id: "team",
      label: "Team",
      href: "/team",
      icon: (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      href: "/analytics",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      href: "/settings",
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      ),
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Floating Top Nav Bar */}
      <div className="fixed top-6 right-6 left-6 z-50 flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-2 flex items-center justify-between w-full max-w-3xl">
          <div className="pl-4">
            <h1 className="text-xl font-bold text-white">Project Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3 relative">
            <button
              className="p-2 text-white/70 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="h-6 w-px bg-white/20"></div>

            <div className="relative">
              <button
                className="flex items-center space-x-2 py-1 px-3 rounded-xl hover:bg-white/10 transition-colors"
                onClick={toggleUserMenu}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-white/70">Admin</p>
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
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl overflow-hidden z-10">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-white font-medium">John Doe</p>
                    <p className="text-white/70 text-xs">
                      john.doe@example.com
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-sm text-red-300 hover:bg-white/10"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sidebar */}
      <aside
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl transition-all duration-300 ${
          isExpanded ? "w-56" : "w-20"
        } py-8 flex flex-col items-center`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-10 bg-white/10 backdrop-blur-lg p-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
        >
          <svg
            className={`w-4 h-4 text-white transform transition-transform ${
              isExpanded ? "rotate-180" : "rotate-0"
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
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <div className="flex items-center mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
            P
          </div>
          {isExpanded && (
            <span className="ml-3 text-white font-semibold text-lg">
              Dashboard
            </span>
          )}
        </div>

        <nav className="flex-1 w-full">
          <ul className="space-y-4 flex flex-col items-center">
            {menuItems.map((item) => (
              <li key={item.id} className="w-full flex justify-center">
                <Link
                  href={item.href}
                  className={`flex items-center ${
                    isExpanded ? "px-4 w-full" : "w-12 h-12 justify-center"
                  } py-3 rounded-xl transition-all ${
                    activeMenu === item.id
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  {isExpanded && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen bg-transparent transition-all duration-300 ${
          isExpanded ? "ml-72" : "ml-32"
        } pt-24`}
      >
        {/* Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
