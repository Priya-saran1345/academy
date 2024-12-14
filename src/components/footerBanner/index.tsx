import React from 'react'
import Link from 'next/link'
const banner = () => {
  return (
    <div className=" px-6 lg:px-[10%] xl:px-[12%] h-[499px] py-16 sm:py-0 banner2 w-full">
    <div className=" flex flex-wrap sm:flex-nowrap sm:gap-[20%]  justify-center sm:justify-start items-center  h-full">
      <div className="sm:max-w-[30%] text-center sm:text-left">
        <h3 className=" text-[38px] lg:text-[53px]  text-white  font-semibold">Academy.W3era</h3>
        <h3 className=" text-sm text-white text-[16px] font-medium ">
        Join our diverse community of learners and access a wide range of courses designed to help you acquire new skills, advance your career, or explore your passions.           </h3>
      </div>
      <div className=" flex flex-col gap-4 items-center">
        <button className="w-fit bg-white center px-4 py-2 rounded-lg text-[20px] font-semibold text-orange">
          <Link href='/courses'>
          Start Your Journey
          </Link>
          </button>
        <h3 className=" text-sm font-semibold text-white ">Join today ! Pay after 7 days </h3>
      </div>
    </div>
  </div>
  )
}

export default banner