import Image from 'next/image'
import React from 'react'
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";


const PopularCourse = () => {
  return (
    <div className='flex gap-3 md:flex-row flex-col center '>
        <div className='rounded-lg hover:scale-105 hover:shadow-lg group flex flex-col gap-2 p-4 smooth1 flex-1'>
            <Image src={ "/images/Frame 1116607704.svg"} height={350} width={350} alt='te'/>
            <h3 className=' font-semibold text-black text-xl ' >Master Python Programming</h3>
            <h3 className='text-sm  text-gray-500 font-medium'>Enroll in our top-rated Python course and gain real-world coding skills. </h3>
            <div className='flex gap-2 flex-wrap'>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <MdOutlineBookmarkAdd className='text-orange text-xl' />
                <span className='text-sm text-gray-500 font-medium'>Beginner - Course</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaCode className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Development</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaRegCircleCheck className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Certificate</span>
                </span>
            </div>
            <button className='group-hover:bg-orange group-hover:text-white border border-orange text-orange center px-4 py-2 rounded-lg w-40 mt-5 smooth1 '>
                Enroll Now
            </button>
        </div>

        <div className='rounded-lg hover:scale-105 hover:shadow-lg group flex flex-col gap-2 p-4 smooth1 flex-1'>
            <Image src={ "/images/Frame 1116607704.svg"} height={350} width={350} alt='te'/>
            <h3 className=' font-semibold text-black text-xl ' >Master Python Programming</h3>
            <h3 className='text-sm  text-gray-500 font-medium'>Enroll in our top-rated Python course and gain real-world coding skills. </h3>
            <div className='flex gap-2 flex-wrap'>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <MdOutlineBookmarkAdd className='text-orange text-xl' />
                <span className='text-sm text-gray-500 font-medium'>Beginner - Course</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaCode className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Development</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaRegCircleCheck className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Certificate</span>
                </span>
            </div>
            <button className='group-hover:bg-orange group-hover:text-white border border-orange text-orange center px-4 py-2 rounded-lg w-40 mt-5 smooth1 '>
                Enroll Now
            </button>
        </div>

        <div className='rounded-lg hover:scale-105 hover:shadow-lg group flex flex-col gap-2 p-4 smooth1 flex-1'>
            <Image src={ "/images/Frame 1116607704.svg"} height={350} width={350} alt='te'/>
            <h3 className=' font-semibold text-black text-xl ' >Master Python Programming</h3>
            <h3 className='text-sm  text-gray-500 font-medium'>Enroll in our top-rated Python course and gain real-world coding skills. </h3>
            <div className='flex gap-2 flex-wrap'>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <MdOutlineBookmarkAdd className='text-orange text-xl' />
                <span className='text-sm text-gray-500 font-medium'>Beginner - Course</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaCode className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Development</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaRegCircleCheck className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Certificate</span>
                </span>
            </div>
            <button className='group-hover:bg-orange group-hover:text-white border border-orange text-orange center px-4 py-2 rounded-lg w-40 mt-5 smooth1 '>
                Enroll Now
            </button>
        </div>

        <div className='rounded-lg hover:scale-105 hover:shadow-lg group flex flex-col gap-2 p-4 smooth1 flex-1'>
            <Image src={ "/images/Frame 1116607704.svg"} height={350} width={350} alt='te'/>
            <h3 className=' font-semibold text-black text-xl ' >Master Python Programming</h3>
            <h3 className='text-sm  text-gray-500 font-medium'>Enroll in our top-rated Python course and gain real-world coding skills. </h3>
            <div className='flex gap-2 flex-wrap'>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <MdOutlineBookmarkAdd className='text-orange text-xl' />
                <span className='text-sm text-gray-500 font-medium'>Beginner - Course</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaCode className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Development</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
                <FaRegCircleCheck className='text-orange' />
                <span className='text-sm text-gray-500 font-medium'>Certificate</span>
                </span>
            </div>
            <button className='group-hover:bg-orange group-hover:text-white border border-orange text-orange center px-4 py-2 rounded-lg w-40 mt-5 smooth1 '>
                Enroll Now
            </button>
        </div>
    </div>
  )
}

export default PopularCourse