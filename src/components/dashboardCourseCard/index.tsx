import React from 'react'
const DashboardCourseCard = ({props}:any) => {
  return (
    <div className='bg-white min-h-[91px] gap-3 min-w-[311px] flex justify-center items-center rounded-3xl'>
      <p className='text-orange text-[48px] font-medium'>{props.number}</p>
      <p className='text-[20px] font-medium'>{props.title}</p>
    </div>
  )
}

export default DashboardCourseCard