import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import OtherCourses from '@/components/otherCourses'
import { BASE_URL } from '@/utils/api'
import React from 'react'
async function getData() {
  const res = await fetch(`${BASE_URL}courses/`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
const allcourse = async() => {
  const data = await getData()
  return (

<div className="min-h-screen bg-[#F7F7F7]">
<DashboardHeader />
<div className="w-full flex  relative">
  <div className="w-fit hidden lg:block  absolute top-0 left-0 h-full">
    <DashboardSidebar />
  </div>
  <div className="w-[100%] lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
    <div className="w-full min-h-[88vh] bg-white rounded-sm px-2 sm:px-4 py-5">
    <OtherCourses data={data} />
    </div>
  </div>
</div>
</div>

  )
}

export default allcourse