"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: true,
      href: "/",
    },
    {
      icon: Users,
      label: "Students",
      active: false,
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

  const yearGroups = [
    { year: "S1", color: "bg-[#4F8BFF]", hoverColor: "hover:bg-[#3D6FE5]" },
    { year: "S2", color: "bg-[#50C878]", hoverColor: "hover:bg-[#3EAF62]" },
    { year: "S3", color: "bg-[#9F7AEA]", hoverColor: "hover:bg-[#8B68D6]" },
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
        {/* Logo */}
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

        {/* Navigation */}
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

        {/* Bottom Menu */}
        <div className="border-t border-[#EDF0F4] p-3 space-y-1 flex-shrink-0">
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-[#E12929] hover:bg-[#FFEDED] hover:text-[#C71414]">
            <LogOut size={20} className="mr-3" />
            <span className="flex-1 text-left">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-60">
        {/* Top Bar */}
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

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-[#07111F] font-['Lato'] font-extrabold text-3xl sm:text-4xl mb-3">
                Select Year Group
              </h1>
              <p className="text-[#8A94A7] text-lg">
                Choose a year group to view students and record unit
                achievements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {yearGroups.map((group) => (
                <a
                  key={group.year}
                  href={`/students?year=${group.year}`}
                  className={`${group.color} ${group.hoverColor} rounded-2xl p-8 text-center transition-all duration-200 transform hover:scale-105 cursor-pointer`}
                  style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                >
                  <div className="text-white">
                    <div className="text-6xl font-['Lato'] font-extrabold mb-2">
                      {group.year}
                    </div>
                    <div className="text-xl font-medium opacity-90">
                      Year Group
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/students"
                className="inline-block text-[#4F8BFF] hover:text-[#3D6FE5] font-medium"
              >
                View all students →
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
