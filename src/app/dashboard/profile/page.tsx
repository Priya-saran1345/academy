import DashboardHeader from '@/components/dashboardHeader';
import DashboardSidebar from '@/components/dashboardSidebar';
import Profile from '@/components/profile';
import React from 'react';

const Page = () => {
  return (
  
<div className=' min-h-screen bg-[#F7F7F7]'>
<DashboardHeader />
<div className='w-full flex '>

  <div className='w-fit'>
    <DashboardSidebar />
  </div>
  <div className='flex-1 '>
    <div className='w-full min-h-[88vh] bg-white  rounded-sm px-4 lg:px-8 py-5 '>
    <Profile />
    </div>
  </div>
</div>
</div>


  );
};

export default Page;
