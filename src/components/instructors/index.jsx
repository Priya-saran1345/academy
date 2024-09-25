import Image from 'next/image'
import React from 'react'

const Instructors = () => {
  return (
  <>
  <div className='flex gap-4 md:flex-row flex-col'> 
  <div className='h-[437px] w-[389px] relative mt-44 group '>
      <Image src={"/images/Frame 1116607721.svg"} className='absolute -top-1/4 left-1/4'  alt='' width={180} height={180}/>
<div className='w-full h-[352px] bg-white group-hover:shadow-lg smooth1 rounded-lg flex flex-col pt-20 px-8 gap-2'>
<h3><span className='font-bold'>Name:</span> John Doe</h3>
<h3><span className='font-bold'>Expertise:</span> Senior Python Developer</h3>
<h3>With over 10 years of experience in Python programming and a background in software development, John has taught thousands of students worldwide.</h3>
<h3 className='font-bold'>Courses Taught: </h3>
<div>
<h3>1. Master Python Programming, </h3>
<h3>2. Advanced Python Techniques</h3>
</div>
</div>
    </div>

    <div className='h-[437px] w-[389px] relative mt-44 group '>
      <Image src={"/images/Frame 1116607721.svg"} className='absolute -top-1/4 left-1/4'  alt='' width={180} height={180}/>
<div className='w-full h-[352px] bg-white group-hover:shadow-lg smooth1 rounded-lg flex flex-col pt-20 px-8 gap-2'>
<h3><span className='font-bold'>Name:</span> John Doe</h3>
<h3><span className='font-bold'>Expertise:</span> Senior Python Developer</h3>
<h3>With over 10 years of experience in Python programming and a background in software development, John has taught thousands of students worldwide.</h3>
<h3 className='font-bold'>Courses Taught: </h3>
<div>
<h3>1. Master Python Programming, </h3>
<h3>2. Advanced Python Techniques</h3>
</div>
</div>
    </div>


    <div className='h-[437px] w-[389px] relative mt-44 group '>
      <Image src={"/images/Frame 1116607721.svg"} className='absolute -top-1/4 left-1/4'  alt='' width={180} height={180}/>
<div className='w-full h-[352px] bg-white group-hover:shadow-lg smooth1 rounded-lg flex flex-col pt-20 px-8 gap-2'>
<h3><span className='font-bold'>Name:</span> John Doe</h3>
<h3><span className='font-bold'>Expertise:</span> Senior Python Developer</h3>
<h3>With over 10 years of experience in Python programming and a background in software development, John has taught thousands of students worldwide.</h3>
<h3 className='font-bold'>Courses Taught: </h3>
<div>
<h3>1. Master Python Programming, </h3>
<h3>2. Advanced Python Techniques</h3>
</div>
</div>
    </div>

  </div>

    </>
  )
}

export default Instructors