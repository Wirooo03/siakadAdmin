"use client";

import React, { useState } from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";

// This is a nested layout under /admin.
// Do NOT render <html> or <body> here — those belong to the root layout.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Overlay backdrop - only on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header (mobile) contains the toggle so it doesn't overlap page content */}

      <div className="flex h-screen">
        {/* Sidebar - Desktop: collapsible icon-only mode, Mobile: slide overlay */}
        <aside
          className={`fixed lg:relative top-0 left-0 h-screen z-50 transform transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar 
            isSidebarOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            onClose={() => setSidebarOpen(false)} 
          />
        </aside>

        {/* Main content area */}
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarOpen ? "lg:ml-0" : "lg:ml-0"
        }`}>
          {/* Mobile header with toggle button placed inside page flow */}
          <Header isSidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          {children}
        </main>
      </div>
    </div>
  );
}
