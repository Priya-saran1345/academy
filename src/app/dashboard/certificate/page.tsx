import Certificates from '@/components/certificates'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import React from 'react'

const certificate = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#F7F7F7]">
    {/* Sidebar */}
    <div className="w-fit">
      <DashboardSidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <DashboardHeader />

      {/* Profile Section */}
      <div className="flex-1 min-h-[88vh] bg-white rounded-sm px-8 py-5">
      <Certificates/>
      </div>
    </div>
  </div>
  
  )
}

export default certificate