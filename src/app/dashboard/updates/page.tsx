import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import Updates from '@/components/updates'
import React from 'react'

const updates = () => {
  return (
    <div className=' min-h-screen bg-[#F7F7F7]'>
    <DashboardHeader />
    <div className='w-full flex '>

      <div className='w-fit'>
        <DashboardSidebar />
      </div>
      <div className='flex-1 '>
        <div className='w-full min-h-[88vh] bg-white  rounded-sm px-8 py-5 '>
        <Updates />
        </div>
      </div>
    </div>
  </div>

    // <div className='flex min-h-screen bg-[#F7F7F7]'>
    //     <div className='w-fit'>
    //      <DashboardSidebar />
    //     </div>
    //         <div className='flex-1'>
    //         <DashboardHeader />
    //         <div className='w-full min-h-[88vh] bg-white rounded-sm px-8 py-5 '>
    //         <Updates />  
    //         </div>
    //        </div>
    //   </div>
  )
}

export default updates