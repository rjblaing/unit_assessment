"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  Download,
  Filter,
  Menu,
  X,
  Eye,
  Plus,
} from "lucide-react";

export default function StudentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Get year from URL parameter
    const params = new URLSearchParams(window.location.search);
    const yearParam = params.get("year");
    if (yearParam && ["S1", "S2", "S3"].includes(yearParam)) {
      setSelectedYear(yearParam);
    }

    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesYear =
      selectedYear === "All" || student.year_group === selectedYear;
    const matchesSearch =
      student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: false,
      href: "/",
    },
    {
      icon: Users,
      label: "Students",
      active: true,
      href: "/students",
    },
    {
      icon: BookOpen,
      label: "Unit Achievements",
      active: false,
      href: "/units",
    },
    {
      icon: FileText,
      label: "Reports",
      active: false,
      href: "/reports",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-['Nanum_Gothic']">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-[#EDF0F4] z-50 transition-all duration-300 ease-in-out w-60 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center h-16 px-4 border-b border-[#EDF0F4] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#4F8BFF] rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-lg">UA</div>
            </div>
            <span className="text-[#07111F] font-['Lato'] font-extrabold text-xl">
              Unit Tracker
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto md:hidden p-1 rounded hover:bg-[#F5F7FB] transition-colors"
          >
            <X size={24} className="text-[#536081]" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                item.active
                  ? "bg-[#4F8BFF] text-white"
                  : "text-[#536081] hover:bg-[#F1F5FF] hover:text-[#4F8BFF]"
              }`}
            >
              <item.icon size={20} className="mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="border-t border-[#EDF0F4] p-3 space-y-1 flex-shrink-0">
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-[#E12929] hover:bg-[#FFEDED] hover:text-[#C71414]">
            <LogOut size={20} className="mr-3" />
            <span className="flex-1 text-left">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-60">
        <header
          className="h-16 bg-white border-b border-[#EDF0F4] flex items-center justify-between px-4 md:px-6 sticky top-0 z-30"
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1 rounded hover:bg-[#F5F7FB] transition-colors"
            >
              <Menu size={24} className="text-[#536081]" />
            </button>

            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7]"
              />
              <input
                type="text"
                placeholder="Search students, units..."
                className="w-48 sm:w-64 md:w-72 pl-10 pr-4 py-2 bg-white border border-[#E1E6ED] rounded-lg text-sm font-['Barlow'] text-[#8A94A7] placeholder-[#8A94A7] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="p-2 bg-white border border-[#E1E6ED] rounded-lg hover:bg-[#F5F7FB] transition-colors">
              <Bell size={20} className="text-[#536081]" />
            </button>
            <div className="w-8 h-8 bg-[#4F8BFF] rounded-full flex items-center justify-center text-white text-sm font-semibold">
              T
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          <nav className="mb-6 text-sm font-['Nanum_Gothic'] text-[#8A94A7]">
            <div className="flex items-center">
              <a href="/" className="hover:text-[#4F8BFF]">
                Dashboard
              </a>
              <ChevronRight size={16} className="mx-2 text-[#8A94A7]" />
              <span className="text-[#07111F] font-bold">
                Students {selectedYear !== "All" ? `- ${selectedYear}` : ""}
              </span>
            </div>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
            <h1 className="text-[#07111F] font-['Lato'] font-extrabold text-2xl sm:text-3xl">
              {selectedYear !== "All"
                ? `${selectedYear} Students`
                : "All Students"}
            </h1>

            <a
              href="/units/new"
              className="flex items-center justify-center px-4 py-2 bg-[#4F8BFF] text-white rounded-lg hover:bg-[#3D6FE5] transition-colors"
            >
              <Plus size={16} className="mr-2" />
              <span className="text-sm font-medium">Record Achievement</span>
            </a>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A94A7]"
              />
              <input
                type="text"
                placeholder="Search by name or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#07111F] placeholder-[#8A94A7] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#536081] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
              >
                <option value="All">All Years</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
              <button className="flex items-center px-4 py-3 bg-white border border-[#E1E6ED] rounded-lg hover:border-[#B6D3FF] hover:bg-[#F8FAFE] transition-colors">
                <Download size={16} className="mr-2 text-[#536081]" />
                <span className="text-sm text-[#536081]">Export</span>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-4">
            <p className="text-[#8A94A7] text-sm">
              Showing {filteredStudents.length} student
              {filteredStudents.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          <div
            className="bg-white rounded-xl border border-[#EDF0F4] overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#FAFBFC] border-b border-[#EDF0F4]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#8A94A7] uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#8A94A7] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#8A94A7] uppercase tracking-wider">
                      Year Group
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#8A94A7] uppercase tracking-wider">
                      Units Achieved
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#8A94A7] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#EDF0F4]">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-[#8A94A7]"
                      >
                        Loading students...
                      </td>
                    </tr>
                  ) : filteredStudents.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-[#8A94A7]"
                      >
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#F7F9FC] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[#07111F]">
                          {student.student_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#07111F]">
                          {student.first_name} {student.last_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#07111F]">
                          {student.year_group}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#07111F]">
                          {student.units_count || 0}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`/students/${student.id}`}
                            className="inline-flex items-center px-3 py-1 text-sm text-[#4F8BFF] hover:text-[#3D6FE5] font-medium"
                          >
                            <Eye size={16} className="mr-1" />
                            View
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
