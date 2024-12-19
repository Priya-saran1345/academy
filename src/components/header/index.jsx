"use client"
import { BASE_URL } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useapi } from '@/helpers/apiContext';

const Header = () => {
  const basic_detail = useapi()
  const { profile } = useapi()
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [data, setdata] = useState()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`${isSticky ? 'sticky top-0 bg-white  z-50 shadow-lg' : 'absolute top-0 bg-transparent'
          } left-0 right-0 `}
      >
        <div className='flex justify-between  transition-all duration-300 items-center p-4 text-black z-50 px-6 mx-auto w-full lg:w-[95%] 2xl:w-[77%] mt-2'>
          <div className="text-lg font-bold">
            <Link href="/">
            {
basic_detail.basic_detail
?.logo_image?
              <Image src={basic_detail.basic_detail
                ?.logo_image} loading='eager' priority decoding='async' alt="logo" width={230} height={100} className='' />:
                "logo"
            }
            </Link>
          </div>
          <div className={`flex flex-col md:flex-row items-center md:space-x-8 transition-all duration-300 ${isOpen ? 'hidden' : 'hidden md:block'}`}>
            <div className="flex flex-col md:flex-row md:space-x-8 items-center">
              <li className="relative group cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
                <Link href="/">Home</Link>
              </li>
              <Link href="/courses">
                <li className="relative group cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
                  Courses
                </li>
              </Link>
              <li className="cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
                <Link href={'/contact'}>
                  Contact Us
                </Link>
              </li>
              {
                !Cookies.get('login_access_token') &&
                <li className="cursor-pointer underlineHover font-medium text-lg text-orange">
                  <Link href="/signup">
                    Sign Up
                  </Link>
                </li>
              }
              {
                !Cookies.get('login_access_token') &&
                <p className="cursor-pointer smooth1 hover:text-white font-medium text-lg border
      border-orange px-4 py-2 rounded-lg text-orange hover:bg-orange">
                  <Link href="/login">Log In</Link>
                </p>
              }
              {
                Cookies.get('login_access_token') &&
                <div className="cursor-pointer  font-medium text-lg text-orange">
                  {/* <Link href="/dashboard"> */}
                  <div className='flex gap-2 items-center' onClick={() => {
                    router.push('/dashboard');
                  }}>
                    {/* <div className='size-[35px] md:size-[50px] rounded-full bg-orange border-4 border-red-200 text-[20px] md:text-[27px] center text-white capitalize'>
                      {profile?.username[0]}
                    </div>
                    <div className='cursor-pointer'>
                      <p className='text-[16px] font-semibold'>{profile?.username}</p>
                      <p className='text-[14px] hidden md:block -mt-2 font-medium text-[#616161]'>{profile?.email}</p>
                    </div> */}
                     <div className="rounded-md ">
                                              <button className="px-3 py-[5px] rounded-md bg-orange  text-white  hover:bg-orange/30 hover:text-orange transition duration-200">
                                             
                                              Dashboard  

                       </button>
                                                
                                              {/* <a href="#" className="px-4 py-2 bg-orange-600  rounded-lg hover:bg-orange-500 transition duration-200">Download PDF-2</a> */}
                     </div>
                  </div>
                  {/* </Link> */}
                </div>
              }
            </div>
          </div>
          <button className="md:hidden p-2 text-2xl text-orange" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
      </header>
      {/* Sidebar for mobile view */}
      {isOpen && (
        <div className="absolute  z-40 top-24 left-0 right-0 bg-white shadow-lg p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link href={'/'}>
              <li className="cursor-pointer text-lg text-black hover:text-orange">Home</li>
            </Link>
            <Link href={'/courses'}>

              <li className="cursor-pointer text-lg text-black hover:text-orange">
                Courses
                {/* <ul className="flex flex-col space-y-2 mt-2">
                <li className="px-4 py-2 hover:bg-gray-200">Web Development</li>
                <li className="px-4 py-2 hover:bg-gray-200">App Development</li>
                <li className="px-4 py-2 hover:bg-gray-200">SEO Services</li>
              </ul> */}
              </li>
            </Link>
            <Link href={'/contact'}>
              <li className={`cursor-pointer text-lg text-black hover:text-orange`}>Contact Us</li>
            </Link>
            {

              !Cookies.get('login_access_token') &&
              <Link href={'/signup'}>
                <li className="cursor-pointer text-lg text-orange">Sign Up</li>
              </Link>
            }
            {
              !Cookies.get('login_access_token') &&
              <Link href={'/login'}>
                <p className="cursor-pointer smooth1 hover:text-white border border-orange px-4 py-2 rounded-lg text-orange hover:bg-orange">Log In</p>
              </Link>
            }
            {
              Cookies.get('login_access_token') &&
              <div className="cursor-pointer  font-medium text-lg text-orange">
                {/* <Link href="/dashboard"> */}
                <div className='flex gap-2 items-center' onClick={() => {
                  router.push('/dashboard');
                }}>
                  {/* <div className='size-[35px] md:size-[50px] rounded-full bg-orange border-4 border-red-200 text-[20px] md:text-[27px] center text-white capitalize'>
                    {profile?.username[0]}
                  </div>
                  <div className='cursor-pointer'>
                    <p className='text-[16px] font-semibold'>{profile?.username}</p>
                    <p className='text-[14px] hidden md:block -mt-2 font-medium text-[#616161]'>{profile?.email}</p>
                  </div> */}
                   <div className="rounded-md ">
                                              <button className="px-3 py-[5px] rounded-md bg-orange  text-white  hover:bg-orange/30 hover:text-orange transition duration-200">
                                             
                                              Dashboard  

                       </button>
                       </div>
                  
                </div>
                {/* </Link> */}
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
