import Support from '@/components/assignments'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import React from 'react'

const support = () => {
  return (


<div className=' min-h-screen bg-[#F7F7F7]'>
<DashboardHeader />
<div className='w-full flex '>

  <div className='w-fit'>
    <DashboardSidebar />
  </div>
  <div className='flex-1 '>
    <div className='w-full min-h-[88vh] bg-white  rounded-sm px-8 py-5 '>
    <Support />
    </div>
  </div>
</div>
</div>
  
  )
}

export default support