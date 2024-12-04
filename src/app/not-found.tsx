import React from 'react'
import Image from 'next/image'
import { FaFaceSadCry } from "react-icons/fa6";
import { FaRegSadCry } from "react-icons/fa";
import { ImSad2 } from "react-icons/im";

const notfound = () => {
  return (
    <>
    <div className='min-h-screen w-full flex justify-center items-center'>
    <div className='flex gap-10 py-7 flex-col-reverse px-5 md:flex-row justify-between '>

        <div>
        <Image src="/images/book.png"  alt="logo" width={350} height={350}  />
        </div>
        <div>
            <p className='font-bold text-[42px] leading-tight text-center'>Something is wrong...</p>
            <p className=' text-center text-[18px]'>What you'r looking for ,page does't exist </p>
            <div className='flex justify-center my-5 w-full  gap-3 text-[35px] text-orange'><FaFaceSadCry />
            <FaRegSadCry  />
            <ImSad2 />
          
            </div>
        </div>
    </div>

    </div>
    </>
  )
}

export default notfound