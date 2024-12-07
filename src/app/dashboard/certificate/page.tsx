import Certificates from '@/components/certificates'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import React from 'react'

const certificate = () => {
  return (

<div className=' min-h-screen bg-[#F7F7F7]'>
<DashboardHeader />
<div className='w-full flex '>
  <div className='w-fit'>
    <DashboardSidebar />
  </div>
  <div className='flex-1 '>
    <div className='w-full min-h-[88vh] bg-white  rounded-sm px-8 py-5 '>
    <Certificates/>
    </div>
  </div>
</div>
</div>
  
  )
}

export default certificate