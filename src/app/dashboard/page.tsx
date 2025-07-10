'use client'
import React, { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardContent from './components/DashboardContent';
import Offers from './components/Offers';
import Sidebar from './components/Sidebar';


type Props = {}

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
    setSidebarOpen(false); // close sidebar on mobile after selecting
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "dashboard":
        return <DashboardContent />;
      case "offers":
        return <Offers />;
      // case "notifications":
      //   return <Notifications />;
      // case "policies":
      //   return <Policies />;
      // case "help":
      //   return <Help />;
      // case "profile":
      //   return <Profile />;
      default:
        return <DashboardContent />;
    }
  };
  return (
    <ProtectedRoute>
      <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] flex bg-[#F8F7F4] text-[#000]">
        {/* Sidebar */}
        <Sidebar
          onSelect={handleSelectSection}
          selected={selectedSection}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Chevron close button on right border of sidebar (desktop only) */}
        {sidebarOpen && (
          <button
            className="block md:hidden fixed top-30 left-[250px] z-50 bg-white rounded-full shadow p-1 hover:bg-gray-100 transition-colors border border-gray-200"
            style={{ transform: 'translateX(-50%)' }}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            {/* Chevron left icon */}
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {!sidebarOpen && (
          <button
            className="block md:hidden fixed top-30 left-[5px] z-50 bg-white rounded-full shadow p-1 hover:bg-gray-100 transition-colors border border-gray-200"
            style={{ transform: 'translateX(-50%)' }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Close sidebar"
          >
            {/* Chevron left icon */}
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Main Content */}
        <main className="flex-1">{renderContent()}</main>
      </div>
    </ProtectedRoute>

  )
}