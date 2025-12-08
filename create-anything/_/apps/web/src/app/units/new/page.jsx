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
  Upload,
  X,
  Menu,
  Save,
  FileIcon,
  Camera,
} from "lucide-react";
import { useUpload } from "@/utils/useUpload";

export default function NewUnitPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();

  const [formData, setFormData] = useState({
    student_id: "",
    subject: "",
    unit_name: "",
    unit_code: "",
    status: "Pass",
    file_url: "",
    file_name: "",
  });

  useEffect(() => {
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
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    const result = await upload({
      reactNativeAsset: { file, name: file.name, mimeType: file.type },
    });

    if (result.error) {
      setError(result.error);
    } else {
      setFormData({
        ...formData,
        file_url: result.url,
        file_name: file.name,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/unit-achievements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create unit achievement");
      }

      setSuccess(true);
      setFormData({
        student_id: "",
        subject: "",
        unit_name: "",
        unit_code: "",
        status: "Pass",
        file_url: "",
        file_name: "",
      });

      setTimeout(() => {
        window.location.href = "/units";
      }, 1500);
    } catch (err) {
      console.error("Error creating unit achievement:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      active: true,
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
              <a href="/units" className="hover:text-[#4F8BFF]">
                Unit Achievements
              </a>
              <ChevronRight size={16} className="mx-2 text-[#8A94A7]" />
              <span className="text-[#07111F] font-bold">New Achievement</span>
            </div>
          </nav>

          <div className="mb-6">
            <h1 className="text-[#07111F] font-['Lato'] font-extrabold text-2xl sm:text-3xl">
              Record Unit Achievement
            </h1>
            <p className="text-[#8A94A7] mt-2">
              Enter the details of the unit achievement below
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-[#EAF9F0] border border-[#50C878] rounded-lg">
              <p className="text-[#0E9250] text-sm">
                Unit achievement recorded successfully! Redirecting...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-[#FFEDED] border border-[#E12929] rounded-lg">
              <p className="text-[#C71414] text-sm">{error}</p>
            </div>
          )}

          <div
            className="bg-white rounded-xl border border-[#EDF0F4] p-6 md:p-8"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#07111F] mb-2">
                    Student <span className="text-[#E12929]">*</span>
                  </label>
                  <select
                    required
                    value={formData.student_id}
                    onChange={(e) =>
                      setFormData({ ...formData, student_id: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#07111F] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} -{" "}
                        {student.year_group} ({student.student_id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] mb-2">
                    Subject <span className="text-[#E12929]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Mathematics"
                    className="w-full px-4 py-2 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#07111F] placeholder-[#8A94A7] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] mb-2">
                    Unit Name <span className="text-[#E12929]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.unit_name}
                    onChange={(e) =>
                      setFormData({ ...formData, unit_name: e.target.value })
                    }
                    placeholder="e.g. Algebra Basics"
                    className="w-full px-4 py-2 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#07111F] placeholder-[#8A94A7] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] mb-2">
                    Unit Code <span className="text-[#E12929]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.unit_code}
                    onChange={(e) =>
                      setFormData({ ...formData, unit_code: e.target.value })
                    }
                    placeholder="e.g. MATH-101"
                    className="w-full px-4 py-2 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#07111F] placeholder-[#8A94A7] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] mb-2">
                    Status <span className="text-[#E12929]">*</span>
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white border border-[#E1E6ED] rounded-lg text-sm text-[#07111F] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] focus:border-[#4F8BFF]"
                  >
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#07111F] mb-2">
                  Upload Evidence (Optional)
                </label>
                <p className="text-xs text-[#8A94A7] mb-3">
                  Take a photo or upload images, PowerPoint, or PDF files
                </p>
                <div className="border-2 border-dashed border-[#E1E6ED] rounded-lg p-6">
                  {formData.file_url ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FileIcon size={20} className="text-[#4F8BFF]" />
                      <span className="text-sm text-[#07111F]">
                        {formData.file_name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            file_url: "",
                            file_name: "",
                          })
                        }
                        className="text-[#E12929] hover:text-[#C71414]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                        <label className="cursor-pointer flex items-center px-4 py-2 bg-[#4F8BFF] text-white rounded-lg hover:bg-[#3D6FE5] transition-colors">
                          <Camera size={18} className="mr-2" />
                          <span className="text-sm font-medium">
                            Take Photo
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                            disabled={uploading}
                          />
                        </label>
                        <span className="text-[#8A94A7] text-sm">or</span>
                        <label className="cursor-pointer flex items-center px-4 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F5F7FB] transition-colors">
                          <Upload size={18} className="mr-2" />
                          <span className="text-sm font-medium">
                            Upload File
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf,.ppt,.pptx"
                            onChange={handleFileChange}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-[#8A94A7] text-center">
                        Images, PDF, PowerPoint (Max 10MB)
                      </p>
                      {uploading && (
                        <p className="text-xs text-[#4F8BFF] mt-2 text-center">
                          Uploading...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <a
                  href="/units"
                  className="px-6 py-2 bg-white border border-[#E1E6ED] text-[#536081] rounded-lg hover:bg-[#F5F7FB] transition-colors"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex items-center px-6 py-2 bg-[#4F8BFF] text-white rounded-lg hover:bg-[#3D6FE5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={16} className="mr-2" />
                  {loading ? "Saving..." : "Save Achievement"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
