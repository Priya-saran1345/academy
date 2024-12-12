import Certificates from '@/components/certificates'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import React from 'react'

const certificate = () => {
  return (



    <div className="min-h-screen bg-[#F7F7F7]">
    <DashboardHeader />
    <div className="w-full flex  relative">
      {/* Sidebar with absolute positioning */}
      <div className="w-fit z-50 hidden lg:block absolute top-0 left-0 h-full">
        <DashboardSidebar />
      </div>
      {/* Main content area with appropriate padding to avoid overlap */}
      <div className="flex-1 lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
        <div className="w-full min-h-[88vh] bg-white rounded-sm px-4 py-5">
        <Certificates/>   
             </div>
      </div>
    </div>
  </div>








  
  )
}

export default certificate