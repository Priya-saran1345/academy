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
const DashboardHeader = ({ props }: any) => {
  const { profile } = useapi();
  const { setProfileState } = useDashboard();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [ApiData, setApiData] = useState<any>(); // Use a more standard naming convention


  useEffect(() => {
    setApiData(profile)
    // Call fetchData when the component mounts
  }, [profile]);
  console.log("dashboard data", profile)

  const logout = () => {
    // Delete cookies using js-cookie
    Cookies.remove('login_access_token');
    Cookies.remove('login_refresh_token');

    // Redirect to the login page
    router.push('/login');
  };

  console.log()
  return (
    <div className='px-5 py-3 pt-4  w-full bg-[#F7F7F7]'>
      <div className='flex justify-between w-full items-center'>
        <div className='flex gap-3 items-center lg:gap-10 xl:gap-20'>
      <div className='px-3'>
        <Link href="/">
          <Image src="/images/Browk Shop.svg" alt="logo" width={130} height={100} />
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
