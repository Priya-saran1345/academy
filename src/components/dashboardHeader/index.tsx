"use client";
import React, { useEffect, useState, useRef } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineContactSupport, MdSupportAgent } from "react-icons/md";
import { BsBoxArrowRight } from "react-icons/bs";
import { useDashboard } from '@/helpers/dashboardContext';
import { useapi } from '@/helpers/apiContext';
import Link from 'next/link'
import Image from 'next/image';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import DashboardSidebar from '../dashboardSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { LuBookOpen } from 'react-icons/lu';

const DashboardHeader = ({ props }: any) => {
  const { profile } = useapi();
  const { setProfileState } = useDashboard();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0) // Example value, replace with actual logic

  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [ApiData, setApiData] = useState<any>(); // Use a more standard naming convention
  const basic_detail = useapi()
  const [copied, setCopied] = useState(false);
  const divRef = useRef<any>(null); // Create a ref for the div

  const handleCopy = () => {
    const textToCopy = divRef.current?.innerText; // Get the dynamic content from the div
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      // Hide tooltip after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    // Extract the values of the profile object into an array
    const profileFields = [
      profile?.username,
      profile?.email,
      profile?.first_name,
      profile?.last_name,
      profile?.phone,
      profile?.alternate_phone,
      profile?.address,
      profile?.qualification,
      profile?.gender,
      profile?.extracurriculars,
      profile?.goals,
      profile?.course_interested,
      profile?.date_of_birth,
      profile?.is_tutor,
      profile?.profile_image
    ];

    // Count the non-null fields
    const nonNullFields = profileFields.filter(field => field !== null && field !== undefined && field !== "");

    // Calculate the completion percentage
    const completionPercentage = (nonNullFields.length / profileFields.length) * 100;

    // Update the profile completion state
    setProfileCompletion(completionPercentage);

    // Assuming you're setting the API data for further use
    setApiData(profile);

  }, [profile]);


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
    <div className='px-5 py-3 pt-4  sticky z-50 top-0 w-full bg-[#F7F7F7]'>
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
                onMouseOver={() => setShowLogout(true)}
              />
              {showLogout &&
                      <AnimatePresence>

              <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.2, ease: 'easeInOut' }}
            
                   className='bg-white z-50  max-w-[340px] shadow-lg border-1 rounded-lg right-4 flex flex-col justify-start gap-1 items-start font-medium text-[17px] absolute
                text-slate-600  py-3 top-24 logout-div' onMouseLeave={() => setShowLogout(false)}>
                  {/* User Info and Profile Completion Section */}
                  <div className='w-full flex px-7 py-4 border-b-1 border-slate-200 justify-start gap-5 items-center '>
                    <div className=''>
                      <div className="relative rounded-full p-[5px] bg-white">
                        <div className="w-16 h-16 bg-[#9C9C9C]   rounded-full flex items-center justify-center overflow-hidden z-50 ">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 -z-20 scale-110 rounded-full"
                          style={{
                            background: `conic-gradient(#FF6B6B ${profileCompletion}%, #F5F5F5 ${profileCompletion}%)`,
                          }}
                        />
                      </div>
                    </div>
                    <div className=''>
                      <p className='font-bold text-black'>User Name</p>
                      <p className='text-sm text-textgrey'>abc@gmail.com</p>
                      <div className='text-orange flex gap-2  items-center cursor-pointer text-[14px]' onClick={() => router.push('/dashboard/profile')}>
                        Complete Your Profile <span className='text-orange'><FaArrowUpRightFromSquare className='text-[10px]'></FaArrowUpRightFromSquare></span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Options */}
                  <div className=' w-full font-semibold border-b-1 border-slate-200 pb-5 text-black mt-4 px-8'>
                    <div className='flex hover:text-orange cursor-pointer  items-center gap-3' onClick={() => router.push('/dashboard/mycourses')}>
                      <LuBookOpen className='text-[20px]' />
                      My Purchases
                    </div>
                    <div className='flex hover:text-orange cursor-pointer  items-center gap-3' onClick={() => router.push('/dashboard/support')}>
                      <MdOutlineContactSupport
                        className='text-[20px]' />
                      Support
                    </div>
                    <div onClick={logout} className='flex mx-[5px] cursor-pointer hover:text-orange  items-center gap-3'>
                      <BsBoxArrowRight className='text-[20px]' />
                      Log out
                    </div>
                  </div>
                  <div className='w-full bg-orange-100  p-3 rounded-md text-center'>
                    <Image src={'/images/discount.png'} height={124} width={297} alt=''></Image>
                    <p className=' text-black font-bold text-[18px] text-center mb-2 mt-4 w-[80%] mx-auto'>First Complete Your Profile to Avail this Offer</p>
                    <p className=' text-gray-800'>Use code:</p>
                    <div className='relative'>
                      <div
                        ref={divRef} // Attach the ref to the div
                        className='border-dashed border-orange bg-orange/5 mt-3 text-orange border-2 border-orange-400 text-orange-600 font-bold py-1 rounded-md cursor-pointer'
                        onClick={handleCopy}
                      >
                        Welcome10 {/* This text can now be dynamic */}
                      </div>
                      {copied && (
                        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white text-xs rounded px-2 py-1 mt-1'>
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
</AnimatePresence>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardHeader;
