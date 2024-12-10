import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import MyCourses from '@/components/mycourses'
import React from 'react'

const mycourse = () => {
  return (
 


<div className="min-h-screen bg-[#F7F7F7]">
<DashboardHeader />
<div className="w-full flex  relative">
  {/* Sidebar with absolute positioning */}
  <div className="w-fit  absolute top-0 left-0 h-full">
    <DashboardSidebar />
  </div>

  {/* Main content area with appropriate padding to avoid overlap */}
  <div className="flex-1 lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
    <div className="w-full min-h-[88vh] bg-white rounded-sm px-4 py-5">
    <MyCourses />
    </div>
  </div>
</div>
</div>
 
  )
}

export default mycourse