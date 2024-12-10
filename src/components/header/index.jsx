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
  const basic_detail=useapi()

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [data, setdata] = useState()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <>
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent text-black z-50 px-6   mx-auto w-full lg:w-[95%] 2xl:w-[77%] mt-2">
        <div className="text-lg font-bold">
         <Link href="/">
            <Image src={basic_detail.basic_detail
?.logo_image} alt="logo" width={230} height={100} className='' />
          </Link>
        </div>
        <nav className={`flex flex-col md:flex-row items-center md:space-x-8 transition-all duration-300 ${isOpen ? 'hidden' : 'hidden md:block'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 items-center">
            <li className="relative group cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
             <Link href="/">Home</Link>
            </li>
            <Link href="/courses">
              <li className="relative group cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
                Courses
                {/* <ul className="absolute left-0 mt-1 w-[200px] rounded-lg text-[16px] bg-white text-black fomt-medium shadow-lg hidden group-hover:block">
          <li className="px-4 py-2 hover:bg-gray-200"><p>Web Development</p></li>
          <li className="px-4 py-2 hover:bg-gray-200"><p>App Development</p></li>
          <li className="px-4 py-2 hover:bg-gray-200"><p>SEO Services</p></li>
          </ul> */}
              </li>
            </Link>
            <Link href={'/contact'}>
              <li className="cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">Contact Us</li>
            </Link>
            {
              !Cookies.get('login_access_token') &&
                <Link href="/signup">
              <li className="cursor-pointer underlineHover font-medium text-lg text-orange">
                Sign Up
                </li>
                </Link>
            }
            {
              !Cookies.get('login_access_token') &&
              <li className="cursor-pointer smooth1 hover:text-white font-medium text-lg border
      border-orange px-4 py-2 rounded-lg text-orange hover:bg-orange"> 
       <Link href="/login">Log In</Link>
              </li>
            }
            {
              Cookies.get('login_access_token') &&
                <Link href="/dashboard">
              <li className="cursor-pointer underlineHover font-medium text-lg text-orange">
                Dashboard
                </li>
                </Link>
            }
          </ul>
        </nav>
        <button className="md:hidden p-2 text-2xl text-orange" onClick={toggleSidebar}>
          ☰
        </button>
      </header>
      {/* Sidebar for mobile view */}
      {isOpen && (
        <div className="absolute  top-24 left-0 right-0 bg-white shadow-lg p-4 md:hidden">
          <ul className="flex flex-col space-y-4">
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
            <Link href={'/signup'}>
              <li className="cursor-pointer text-lg text-orange">Sign Up</li>
            </Link>
            <Link href={'/login'}>
              <li className="cursor-pointer smooth1 hover:text-white border border-orange px-4 py-2 rounded-lg text-orange hover:bg-orange">Log In</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
