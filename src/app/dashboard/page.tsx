'use client'
import React, { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardContent from './components/DashboardContent';
import Offers from './components/Offers';
import Sidebar from './components/Sidebar';


type Props = {}

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

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
      <Sidebar onSelect={setSelectedSection} selected={selectedSection} />

      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
    </ProtectedRoute>
    
  )
}