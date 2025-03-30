"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// Sample Data - Using the same team data structure from other components
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    avatar: "",
    role: "Frontend Developer",
    department: "Engineering",
    email: "john.doe@example.com",
    location: "New York",
    joinDate: "2021-05-10",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    bio: "Experienced frontend developer with a passion for creating beautiful and performant user interfaces.",
    projectCount: 4,
    activeProjects: 3,
    completedProjects: 1,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "",
    role: "UX Designer",
    department: "Design",
    email: "jane.smith@example.com",
    location: "San Francisco",
    joinDate: "2022-01-15",
    skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
    bio: "Creative designer focused on crafting intuitive and accessible user experiences.",
    projectCount: 3,
    activeProjects: 2,
    completedProjects: 1,
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "",
    role: "Backend Developer",
    department: "Engineering",
    email: "mike.johnson@example.com",
    location: "Chicago",
    joinDate: "2020-09-22",
    skills: ["Node.js", "Express", "MongoDB", "API Design"],
    bio: "Backend specialist with a strong focus on scalable architecture and performance optimization.",
    projectCount: 4,
    activeProjects: 2,
    completedProjects: 2,
  },
  {
    id: "4",
    name: "Sarah Williams",
    avatar: "",
    role: "Content Strategist",
    department: "Marketing",
    email: "sarah.williams@example.com",
    location: "Boston",
    joinDate: "2021-11-05",
    skills: ["Content Strategy", "Copywriting", "SEO", "Social Media"],
    bio: "Content expert who crafts compelling narratives and strategic communication plans.",
    projectCount: 2,
    activeProjects: 1,
    completedProjects: 1,
  },
  {
    id: "5",
    name: "David Brown",
    avatar: "",
    role: "Mobile Developer",
    department: "Engineering",
    email: "david.brown@example.com",
    location: "Seattle",
    joinDate: "2022-03-18",
    skills: ["React Native", "Swift", "Kotlin", "Mobile UX"],
    bio: "Mobile app developer with expertise in cross-platform and native development.",
    projectCount: 3,
    activeProjects: 2,
    completedProjects: 1,
  },
  {
    id: "6",
    name: "Lisa Taylor",
    avatar: "",
    role: "Marketing Specialist",
    department: "Marketing",
    email: "lisa.taylor@example.com",
    location: "Austin",
    joinDate: "2021-08-12",
    skills: ["Digital Marketing", "Analytics", "Campaign Management", "SEO"],
    bio: "Results-driven marketing professional specializing in digital campaigns and analytics.",
    projectCount: 2,
    activeProjects: 1,
    completedProjects: 1,
  },
  {
    id: "7",
    name: "Robert Miller",
    avatar: "",
    role: "Project Manager",
    department: "Operations",
    email: "robert.miller@example.com",
    location: "Denver",
    joinDate: "2020-06-30",
    skills: [
      "Project Management",
      "Agile",
      "Team Leadership",
      "Risk Management",
    ],
    bio: "Certified project manager with a track record of delivering complex projects on time and budget.",
    projectCount: 5,
    activeProjects: 3,
    completedProjects: 2,
  },
  {
    id: "8",
    name: "Emily Clark",
    avatar: "",
    role: "Product Designer",
    department: "Design",
    email: "emily.clark@example.com",
    location: "Portland",
    joinDate: "2022-02-08",
    skills: ["Product Design", "Wireframing", "User Testing", "Design Systems"],
    bio: "Product designer who combines aesthetics with functionality to create exceptional user experiences.",
    projectCount: 3,
    activeProjects: 2,
    completedProjects: 1,
  },
  {
    id: "9",
    name: "Alex Turner",
    avatar: "",
    role: "DevOps Engineer",
    department: "Infrastructure",
    email: "alex.turner@example.com",
    location: "Los Angeles",
    joinDate: "2021-04-15",
    skills: ["CI/CD", "Docker", "Kubernetes", "AWS", "Terraform"],
    bio: "DevOps specialist focused on automating infrastructure and streamlining deployment processes.",
    projectCount: 4,
    activeProjects: 3,
    completedProjects: 1,
  },
];

// Department colors mapping
const departmentColors: Record<
  string,
  { bg: string; light: string; dark: string; text: string }
> = {
  Engineering: {
    bg: "bg-indigo-500",
    light: "bg-indigo-100",
    dark: "bg-indigo-900",
    text: "text-indigo-500",
  },
  Design: {
    bg: "bg-pink-500",
    light: "bg-pink-100",
    dark: "bg-pink-900",
    text: "text-pink-500",
  },
  Marketing: {
    bg: "bg-orange-500",
    light: "bg-orange-100",
    dark: "bg-orange-900",
    text: "text-orange-500",
  },
  Operations: {
    bg: "bg-emerald-500",
    light: "bg-emerald-100",
    dark: "bg-emerald-900",
    text: "text-emerald-500",
  },
  Infrastructure: {
    bg: "bg-cyan-500",
    light: "bg-cyan-100",
    dark: "bg-cyan-900",
    text: "text-cyan-500",
  },
};

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Get unique departments
  const departments = Array.from(
    new Set(teamMembers.map((member) => member.department))
  );

  // Filter team members based on search and department
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDepartment =
      selectedDepartment === null || member.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <p className="text-white/70 mt-2">
          Overview of all team members and their project contributions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search team members by name, role, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
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
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDepartment(null)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedDepartment === null
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Departments
            </button>

            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedDepartment === dept
                    ? `${departmentColors[dept].bg} text-white`
                    : `bg-white/5 text-white/70 hover:bg-white/10 hover:text-white`
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="text-white/60 text-sm">Total Team Members</div>
          <div className="text-white text-2xl font-bold mt-2">
            {teamMembers.length}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="text-white/60 text-sm">Departments</div>
          <div className="text-white text-2xl font-bold mt-2">
            {departments.length}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="text-white/60 text-sm">Active Projects</div>
          <div className="text-white text-2xl font-bold mt-2">
            {teamMembers.reduce(
              (sum, member) => sum + member.activeProjects,
              0
            )}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="text-white/60 text-sm">Completed Projects</div>
          <div className="text-white text-2xl font-bold mt-2">
            {teamMembers.reduce(
              (sum, member) => sum + member.completedProjects,
              0
            )}
          </div>
        </div>
      </div>

      {/* Selected Member Profile */}
      {selectedMember && (
        <div className="mb-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-fadeIn">
          {teamMembers
            .filter((member) => member.id === selectedMember)
            .map((member) => (
              <div key={member.id} className="flex flex-col md:flex-row gap-6">
                <button
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
                  onClick={() => setSelectedMember(null)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="md:w-1/4 flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h2 className="text-xl font-bold text-white mt-4">
                    {member.name}
                  </h2>
                  <p className="text-white/70">{member.role}</p>
                  <div
                    className={`mt-2 px-3 py-1 rounded-full text-xs ${
                      departmentColors[member.department].bg
                    }`}
                  >
                    {member.department}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="md:w-3/4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-white/50 text-sm uppercase tracking-wider">
                          Email
                        </h3>
                        <p className="text-white">{member.email}</p>
                      </div>
                      <div>
                        <h3 className="text-white/50 text-sm uppercase tracking-wider">
                          Location
                        </h3>
                        <p className="text-white">{member.location}</p>
                      </div>
                      <div>
                        <h3 className="text-white/50 text-sm uppercase tracking-wider">
                          Joined
                        </h3>
                        <p className="text-white">
                          {new Date(member.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-white/50 text-sm uppercase tracking-wider">
                          Projects
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                              style={{
                                width: `${
                                  (member.completedProjects /
                                    member.projectCount) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-white">
                            {member.completedProjects}/{member.projectCount}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white/50 text-sm uppercase tracking-wider">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white/10 rounded-lg text-white/70 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-white/50 text-sm uppercase tracking-wider">
                      Bio
                    </h3>
                    <p className="text-white mt-1">{member.bio}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-white/50 text-sm uppercase tracking-wider">
                      Activity
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full bg-green-500`}
                        ></div>
                        <p className="text-white/80 text-sm">
                          Completed task &quot;Design System Update&quot; 2 days
                          ago
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full bg-blue-500`}
                        ></div>
                        <p className="text-white/80 text-sm">
                          Started working on &quot;User Authentication
                          Flow&quot; 1 week ago
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full bg-purple-500`}
                        ></div>
                        <p className="text-white/80 text-sm">
                          Joined project &quot;Mobile App Development&quot; 3
                          weeks ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.length === 0 ? (
          <div className="col-span-full bg-white/5 rounded-xl p-8 text-center">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Team Members Found
            </h3>
            <p className="text-white/60 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment(null);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => setSelectedMember(member.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-white/70 text-sm">{member.role}</p>
                  <div
                    className={`mt-1 px-2 py-0.5 rounded-full text-xs inline-block ${
                      departmentColors[member.department].bg
                    }`}
                  >
                    {member.department}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Projects</span>
                  <span className="text-white text-sm">
                    {member.projectCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Completed</span>
                  <span className="text-white text-sm">
                    {member.completedProjects}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                    style={{
                      width: `${
                        (member.completedProjects / member.projectCount) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-white/60 text-xs">Skills</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {member.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 bg-white/10 rounded text-white/70 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-white/70 text-xs">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors">
                View Profile
              </button>
            </div>
          ))
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
      `}</style>
    </DashboardLayout>
  );
}
