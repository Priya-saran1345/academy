"use client";
import React, { useEffect, useState } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { MdSupportAgent } from "react-icons/md";
import { BsBoxArrowRight } from "react-icons/bs";
import { useDashboard } from '@/helpers/dashboardContext';
import { useapi } from '@/helpers/apiContext';
import Link from 'next/link'
import Image  from 'next/image';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import DashboardSidebar from '../dashboardSidebar';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardHeader = ({ props }: any) => {
  const { profile } = useapi();
  const { setProfileState } = useDashboard();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [ApiData, setApiData] = useState<any>(); // Use a more standard naming convention
  const basic_detail=useapi()
  useEffect(() => {
    setApiData(profile)
   
  }, [profile]);
  console.log("dashboard data", profile)

  const logout = () => {
    // Delete cookies using js-cookie
    Cookies.remove('login_access_token');
    Cookies.remove('login_refresh_token');

    // Redirect to the login page
    router.push('/login');
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  console.log()
  return (
    <div className='px-5 py-3 pt-4 relative  w-full bg-[#F7F7F7]'>
       <div className='absolute w-fit top-[60px] sm:top-20 left-0 z-50'>
    
      {/* Animate the sidebar with framer-motion */}
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className=' shadow-md h-screen lg:hidden  left-0 z-40'
          >
            <DashboardSidebar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      <div className='flex justify-between w-full items-center'>
        <div className='flex gap-3 items-center lg:gap-10 xl:gap-20'>
      <div className='flex  items-center justify-end  lg:hidden'>
        {isSidebarVisible ? (
          <HiOutlineX className='text-[28px] cursor-pointer' onClick={toggleSidebar} />
        ) : (
          <HiOutlineMenu className='text-[28px] cursor-pointer' onClick={toggleSidebar} />
        )}
      </div>
      <div className='px-3'>
        <Link href="/">
          <Image src={basic_detail.basic_detail?.logo_image} alt="logo" width={180} height={120} />
        </Link>
      </div>
     
        <div className='hidden md:flex font-medium text-[17px] text-textGrey'>
          <p>Welcome back, <span className='text-orange capitalize underline mx-1'>{ApiData?.first_name}&nbsp;{ApiData?.last_name}</span>! Let's continue learning.</p>
        </div>
        </div>
        <div className='flex gap-2 md:gap-6 items-center'>
          <IoIosNotifications className='text-orange text-[35px]' />
          <div className='flex gap-2 items-center'>
            <div className='size-[35px] md:size-[50px] rounded-full bg-orange border-4 border-red-200 text-[20px] md:text-[27px] center text-white capitalize'>
              {ApiData?.username[0]}
            </div>
            <div onClick={() => router.push('/dashboard/profile')} className='cursor-pointer'>
              <p className='text-[16px] font-semibold'>{ApiData?.username}</p>
              <p className='text-[14px] hidden md:block font-medium text-[#616161]'>{ApiData?.email}</p>
            </div>
            <div className='cursor-pointer'>
              <RiArrowDropDownLine
                className='text-orange text-[35px]'
                onMouseEnter={() => setShowLogout(true)}
              />
              {showLogout &&
                <div className='bg-white z-50 shadow-lg border-[2px] rounded-md right-4 flex flex-col justify-start gap-1 items-start font-medium text-[17px]
                 absolute text-slate-600  px-7 py-3 top-24 logout-div'  onMouseLeave={() => setShowLogout(false)}>
                  <div className='flex hover:text-orange cursor-pointer justify-center items-center gap-3' onClick={() => router.push('/dashboard/profile')}>
                    <CgProfile />
                    Profile
                  </div>
                  <div className='flex hover:text-orange cursor-pointer justify-center items-center gap-3' onClick={() => router.push('/dashboard/mycourses')
                  }>
                    <RxDashboard />
                    My Purchases
                  </div>
                  <div className='flex hover:text-orange cursor-pointer justify-center items-center gap-3' onClick={() => router.push('/dashboard/support')
                  }>
                    <MdSupportAgent className='text-[24px]' />
                    Support
                  </div>
                  <div onClick={logout} className='flex cursor-pointer hover:text-orange justify-center items-center gap-3'>
                    <BsBoxArrowRight />
                    Log out
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default DashboardHeader;
