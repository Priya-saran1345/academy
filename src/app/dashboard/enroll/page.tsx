import React from 'react'
import Enroll from '@/components/Enroll'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FooterBanner from '@/components/footerBanner'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardSidebar from '@/components/dashboardSidebar'


const Page = () => {
  return (
//      <div className="min-h-screen bg-[#F7F7F7]">
// <DashboardHeader />
// <div className="w-full flex  relative">
// <div className="w-fit hidden lg:block  absolute top-0 left-0 h-full">
//     <DashboardSidebar />
//   </div>
//   {/* Main content area with appropriate padding to avoid overlap */}
//   <div className="flex-1 lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
//     <div  className="w-full min-h-[88vh] bg-white rounded-sm px-4 py-5">
//     <Enroll />
//     </div>
//   </div>
// </div>
// </div>


<div className="min-h-screen bg-[#F7F7F7]">
<DashboardHeader />
<div className="w-full flex  relative">
  {/* Sidebar with absolute positioning */}
  <div className="w-fit hidden lg:block  absolute top-0 left-0 h-full">
    <DashboardSidebar />
  </div>
  {/* Main content area with appropriate padding to avoid overlap */}
  <div className="w-[100%]  lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
    <div className="w-full min-h-[88vh] bg-white rounded-sm  py-5">
    <Enroll />   
     </div>
  </div>
</div>
</div>
 
  )
}

export default Page