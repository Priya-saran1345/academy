import DashboardHeader from '@/components/dashboardHeader';
import DashboardSidebar from '@/components/dashboardSidebar';
import Profile from '@/components/profile';
import React from 'react';

const Page = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#F7F7F7]">
      {/* Sidebar */}
      <div className="w-fit">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <DashboardHeader /> */}

        {/* Profile Section */}
        <div className="flex-1 min-h-[88vh] bg-white rounded-sm  py-5">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Page;
