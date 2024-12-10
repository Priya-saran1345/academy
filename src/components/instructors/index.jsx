
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BASE_URL_IMAGE } from '@/utils/api'
const Instructors = ({instructor=[]}) => {
 console.log(instructor)
 return (
  <>

  <div className='flex gap-4  justify-center mx-auto pb-8 w-full lg:w-[95%] 2xl:w-[77%]
  mt-20 lg:mt-20 flex-wrap lg:flex-nowrap  2xl:flex-nowrap  '> 
    {
instructor.map((elem) => {
 return(
      <div key={elem.id} className='min-h-[437px] group w-[350px]  group'>
        <div className='w-[170px] relative bg-black h-[170]px mx-auto flex justify-center items-center rounded-full'>
        <Image         
      src={`${BASE_URL_IMAGE}${elem.profile_image}`}  
      className='group-hover:shadow-lg  shadow-red-400 rounded-full '  
      alt='' 
      width={180} 
      height={180}
      />
      </div>
        <div className='w-full min-h-[390px] -mt-[55px] bg-white  pb-5 group-hover:shadow-lg smooth1 rounded-lg flex justify-between flex-col pt-20 px-8 gap-2'>
          <h3><span className='font-bold'>Name:</span> {elem.name}</h3>
          <h3><span className='font-bold'>Expertise:</span> {elem.bio}</h3>
          {/* <h3 className='text-[16px]'>With over {elem.experience} years of experience in {elem.expertise} and a background in software
             development, {elem.name} has taught thousands of students worldwide.</h3> */}
          <h3 className='font-bold'>Courses Taught: </h3>
          <div className='pb-3 text-left'>
            {elem.courses_taught.map((course, index) => (
              <h3 key={index}>{index + 1}. {course}</h3>
            ))}
          </div>
        </div>
      </div>
 )
})
}

  </div>

    </>
  )
}

export default Instructors