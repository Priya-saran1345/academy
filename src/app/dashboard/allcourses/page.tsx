import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import DashboardSidebar from '@/components/dashboardSidebar'
import OtherCourses from '@/components/otherCourses'
import React from 'react'

const allcourse = () => {
  return (


// <div className=' min-h-screen bg-[#F7F7F7]'>
// <DashboardHeader />
// <div className='w-full flex '>
//   <div className='w-fit'>
//     <DashboardSidebar />
//   </div>
//   <div className='flex-1 '>
//     <div className='w-full min-h-[88vh] bg-white  rounded-sm px-8 py-5 '>
//     <OtherCourses />
//         </div>
//   </div>
// </div>
// </div>


    <div className='flex  bg-[#F7F7F7]'>
        <div className='w-full'>
         <DashboardSidebar />
        </div>
            <div className='w-full'>
               <DashboardHeader />
               <div className='w-full lg:max-w-[94vw]  min-h-[88vh] bg-white rounded-sm px-8 py-5 '>
               <OtherCourses />
               </div>

            </div>
      </div>
  )
}

export default allcourse