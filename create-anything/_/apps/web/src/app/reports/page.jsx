"use client";

import React, { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      active: true,
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
              <span className="text-[#07111F] font-bold">Reports</span>
            </div>
          </nav>

          <div className="mb-6">
            <h1 className="text-[#07111F] font-['Lato'] font-extrabold text-2xl sm:text-3xl">
              Reports
            </h1>
            <p className="text-[#8A94A7] mt-2">
              Export and view unit achievement reports for the exam board
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white rounded-xl border border-[#EDF0F4] p-6"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <h3 className="text-[#07111F] font-['Lato'] font-bold text-lg mb-2">
                Export All Units
              </h3>
              <p className="text-[#8A94A7] text-sm mb-4">
                Download a complete list of all unit achievements for submission
                to the exam board
              </p>
              <button className="flex items-center px-4 py-2 bg-[#4F8BFF] text-white rounded-lg hover:bg-[#3D6FE5] transition-colors">
                <Download size={16} className="mr-2" />
                Export as CSV
              </button>
            </div>

            <div
              className="bg-white rounded-xl border border-[#EDF0F4] p-6"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <h3 className="text-[#07111F] font-['Lato'] font-bold text-lg mb-2">
                Export by Year Group
              </h3>
              <p className="text-[#8A94A7] text-sm mb-4">
                Download unit achievements filtered by specific year groups
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F8FAFE] hover:border-[#4F8BFF] transition-colors">
                  S1
                </button>
                <button className="flex-1 px-4 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F8FAFE] hover:border-[#4F8BFF] transition-colors">
                  S2
                </button>
                <button className="flex-1 px-4 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F8FAFE] hover:border-[#4F8BFF] transition-colors">
                  S3
                </button>
              </div>
            </div>

            <div
              className="bg-white rounded-xl border border-[#EDF0F4] p-6"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <h3 className="text-[#07111F] font-['Lato'] font-bold text-lg mb-2">
                Student Summary Report
              </h3>
              <p className="text-[#8A94A7] text-sm mb-4">
                View a breakdown of units achieved by each student
              </p>
              <button className="flex items-center px-4 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F8FAFE] hover:border-[#4F8BFF] transition-colors">
                <Download size={16} className="mr-2" />
                Generate Report
              </button>
            </div>

            <div
              className="bg-white rounded-xl border border-[#EDF0F4] p-6"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <h3 className="text-[#07111F] font-['Lato'] font-bold text-lg mb-2">
                Subject Analysis
              </h3>
              <p className="text-[#8A94A7] text-sm mb-4">
                Analyze unit achievements across different subjects
              </p>
              <button className="flex items-center px-4 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F8FAFE] hover:border-[#4F8BFF] transition-colors">
                <Download size={16} className="mr-2" />
                View Analysis
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
