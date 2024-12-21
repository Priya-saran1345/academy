import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCode, FaRegCircleCheck } from 'react-icons/fa6'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useapi } from '@/helpers/apiContext';
import { BASE_URL_IMAGE } from '@/utils/api'

const truncateText = (text: any, charLimit: 
    number) => {
    if (text?.length > charLimit) {
        return text?.substring(0, charLimit) + " ...";
    }
    return text;
}
const Card = ({slug, name, description, level, category, id, text ,text1 ,link,link1 ,image}: any) => {
    const [showform, setshowform] = useState<any>(false)
    const { setcourseid}=useapi()
    const Router = useRouter();
const setnavigate=()=>{
    localStorage.setItem("courseid",slug);
    setcourseid(slug)
    Router.push(`/${link}`)
}
    return (
        <div 
            className='rounded-lg   hover:scale-105 border-[1px] justify-between h-[500px]
             border-slate-200  my-4 min-w-[315px] max-w-[315px] sm:max-w-[320px] hover:shadow-lg group flex flex-col gap-1 p-4 smooth1 flex-1' 
            key={id}   
        >
            <Image src={`${image}`} height={350} width={350} alt='te' />
            <h3 className='font-semibold text-black text-xl'>{truncateText(name, 30)}</h3>
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
            <div className='flex mb-3 gap-3'>
            <Link href={`/${link1}`}>
                <button className='hover:bg-orange bg-[#F24A2533] hover:text-white border text-orange center px-4 py-2 rounded-lg  mt-5 smooth1'>
                    {text}
                </button>
            </Link>
            {
             text1&&
                <button className='hover:bg-orange bg-[#F24A2533] hover:text-white border text-orange center px-4 py-2 rounded-lg  mt-5 smooth1'  
                onClick={setnavigate}         
                >
                    {text1}
           
                </button>
            }
            </div>
        </div>
       
        
    );
}

export default Card;
