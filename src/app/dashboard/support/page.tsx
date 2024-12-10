import Support from '@/components/assignments'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import React from 'react'

const support = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
    <DashboardHeader />
    <div className="w-full flex  relative">
      {/* Sidebar with absolute positioning */}
      <div className="w-fit z-50 absolute top-0 left-0 h-fit">
        <DashboardSidebar />
      </div>
  
      {/* Main content area with appropriate padding to avoid overlap */}
      <div className="flex-1 lg:pl-[80px]"> {/* Adjust `pl` based on the sidebar width */}
        <div className="w-full min-h-[88vh] bg-white rounded-sm px-4 py-5">
        <Support />
        </div>
      </div>
    </div>
  </div>

  
  )
}

export default support