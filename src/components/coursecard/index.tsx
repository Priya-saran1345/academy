import Link from 'next/link'
import React from 'react'
import { FaCode, FaRegCircleCheck } from 'react-icons/fa6'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import Image from 'next/image'
import { useRouter } from "next/navigation"

const card = ({slug ,name,description,level,category,id,text}:any) => {
    const Router=useRouter()

  return (
    <div className='rounded-lg hover:scale-105 border-[1px] border-slate-200 shadow-lg  min-w-[320px] max-w-[320px] hover:shadow-lg group flex flex-col gap-2 p-4 smooth1 flex-1' key={id} onClick={()=>{
        Router.push(`/course/${slug}`)
    }}>
    <Image src={ "/images/Frame 1116607704.svg"} height={350} width={350} alt='te'/>
    <h3 className=' font-semibold text-black text-xl ' >{name}</h3>
    <h3 className='text-sm  text-gray-500 font-medium'>{description}</h3>
    <div className='flex gap-2 flex-wrap'>
        <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
        <MdOutlineBookmarkAdd className='text-orange text-xl' />
        <span className='text-sm text-gray-500 font-medium'>{level}</span>
        </span>
        <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
        <FaCode className='text-orange' />
        <span className='text-sm text-gray-500 font-medium'>{category}</span>
        </span>
        <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center  gap-2'>
        <FaRegCircleCheck className='text-orange' />
        <span className='text-sm text-gray-500 font-medium'>Certificate</span>
        </span>
    </div>
    <Link href={`/course/${slug}`}>
    <button className='hover:bg-orange bg-[#F24A2533] hover:text-white border  text-orange center px-4 py-2 rounded-lg w-40 mt-5 smooth1'>
       {text}
    </button>
    </Link>
</div>
  )
}

export default card