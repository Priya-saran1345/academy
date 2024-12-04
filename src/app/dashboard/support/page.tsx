import Support from '@/components/assignments'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import React from 'react'

const support = () => {
  return (
    <div className='flex px-4 pt-7 bg-[#F7F7F7]'>
        <div className='w-[15%]'>
         <DashboardSidebar />
        </div>
            <div className='w-[85%]'>
            <DashboardHeader />
            <div className='w-full min-h-[88vh] bg-white rounded-sm px-8 py-5 '>

            <Support />
            </div>
            </div>
      </div>
  )
}

export default support