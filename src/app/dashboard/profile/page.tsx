import DashboardHeader from '@/components/dashboardHeader';
import DashboardSidebar from '@/components/dashboardSidebar';
import Profile from '@/components/profile';
import React from 'react';

const Page = () => {
  return (
  
  
  
 <div className="min-h-screen bg-[#F7F7F7]">
 <DashboardHeader />
 <div className="w-full flex  relative">
   {/* Sidebar with absolute positioning */}
   <div className="w-fit z-50 absolute top-0 left-0 h-full">
     <DashboardSidebar />
   </div>

   {/* Main content area with appropriate padding to avoid overlap */}
   <div className="flex-1 lg:pl-[80px]"> {/* Adjust `pl` based on the sidebar width */}
     <div className="w-full min-h-[88vh] bg-white rounded-sm px-4 py-5">
     <Profile />
     </div>
   </div>
 </div>
</div>
  
  );
};

export default Page;
