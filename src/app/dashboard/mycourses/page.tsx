import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import MyCourses from '@/components/mycourses'
import React from 'react'

const mycourse = () => {
  return (
    <div className='flex w-[100%]  bg-[#F7F7F7]'>
    <div className='w-fit'>
     <DashboardSidebar />
    </div>
        <div className='flex-1'>
        <DashboardHeader />
        <div className=' min-h-[88vh]  rounded-sm px-8 py-5 '>
        <MyCourses />
        </div>
        </div>
  </div>
  )
}

export default mycourse