import Link from 'next/link'
import React, { useState } from 'react'
import { FaCode, FaRegCircleCheck } from 'react-icons/fa6'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useapi } from '@/helpers/apiContext';
// Updated truncateText function to limit characters instead of words
const truncateText = (text: any, charLimit: number) => {
    if (text?.length > charLimit) {
        return text?.substring(0, charLimit) + " ...";
    }
    return text;
}
const Card = ({slug, name, description, level, category, id, text ,text1 ,link}: any) => {
    const [showform, setshowform] = useState<any>(false)
    const Router = useRouter();
    const { setenroll } = useapi();
    return (
        <div className='relative'>
        <div 
            className='rounded-lg hover:scale-105 border-[1px] justify-between h-[500px]
             border-slate-200  my-4 min-w-[320px] max-w-[320px] hover:shadow-lg group flex flex-col gap-2 p-4 smooth1 flex-1' 
            key={id}   
        >
            <Image src="/images/Frame 1116607704.svg" height={350} width={350} alt='te' />
            <h3 className='font-semibold text-black text-xl'>{name}</h3>
            <h3 className='text-sm text-gray-500 font-medium'>{truncateText(description, 60)}</h3> {/* Updated to use character limit */}
            <div className='flex gap-2 flex-wrap'>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center gap-2'>
                    <MdOutlineBookmarkAdd className='text-orange text-xl' />
                    <span className='text-sm text-gray-500 font-medium capitalize'>{level}</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center gap-2'>
                    <FaCode className='text-orange' />
                    <span className='text-sm text-gray-500 font-medium capitalize'>{category}</span>
                </span>
                <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center gap-2'>
                    <FaRegCircleCheck className='text-orange' />
                    <span className='text-sm text-gray-500 font-medium capitalize'>Certificate</span>
                </span>
            </div>
            <div className='flex gap-3'>

            <Link href={`/course/${slug}`}>
                <button className='hover:bg-orange bg-[#F24A2533] hover:text-white border text-orange center px-4 py-2 rounded-lg w-32 mt-5 smooth1'>
                    {text}
                </button>
            </Link>
            {
             text1&&
             
                <button className='hover:bg-orange bg-[#F24A2533] hover:text-white border text-orange center px-4 py-2 rounded-lg w-32 mt-5 smooth1'           
                >
             <Link href={`/${link}`}>
                    {text1}
                </Link>
                </button>
            }
            </div>
        </div>
       
        </div>
    );
}

export default Card;
