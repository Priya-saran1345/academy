"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineMenuBook, MdOutlineContactSupport } from 'react-icons/md';
import { PiCertificateLight } from 'react-icons/pi';
import { GrSettingsOption } from 'react-icons/gr';
import { useRouter, usePathname } from "next/navigation"; // Import usePathname for current path
import { RiUserSettingsLine } from 'react-icons/ri';
import { BsBoxArrowLeft } from 'react-icons/bs';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { GoBook } from 'react-icons/go';

const DashboardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [activeOption, setActiveOption] = useState('');

  useEffect(() => {
    // Set activeOption based on the current path
    if (pathname.includes('/dashboard/mycourses')) {
      setActiveOption('myCourses');
    } else if (pathname.includes('/dashboard/allcourses')) {
      setActiveOption('other-courses');
    } else if (pathname.includes('/dashboard/certificate')) {
      setActiveOption('certificate');
    } else if (pathname.includes('/dashboard/updates')) {
      setActiveOption('updates');
    } else if (pathname.includes('/dashboard/profile')) {
      setActiveOption('profile');
    } else if (pathname.includes('/dashboard/support')) {
      setActiveOption('help');
    } else {
      setActiveOption('dashboard');
    }
  }, [pathname]);

  const getItemClass = (option: string) => {
    return `flex gap-2 items-center text-[16px] font-medium py-3 px-2 rounded-md my-2 ${
      activeOption === option ? 'bg-orange text-white' : 'bg-[#F9F9F9] text-[#545454] hover:bg-orange hover:text-white'
    }`;
  };

  const handleNavigation = (option: string, path: string) => {
    setActiveOption(option);
    router.push(path);
  };

  const logout = () => {
    Cookies.remove('login_access_token');
    Cookies.remove('login_refresh_token');
    router.push('/login');
  };

  return (
    <div className='relative min-w-[245px] pt-4 max-w-[245px] pr-5 bg-[#F7F7F7] px-2 min-h-[97vh]'>
      <div className='p-5'>
        <Link href="/">
          <Image src="/images/Browk Shop.svg" alt="logo" width={130} height={100} />
        </Link>
      </div>
      <div>
        <ul>
          <li
            className={getItemClass('dashboard')}
            onClick={() => handleNavigation('dashboard', '/dashboard')}
          >
            <RxDashboard className='text-[23px]' /> Dashboard
          </li>
          <li
            className={getItemClass('myCourses')}
            onClick={() => handleNavigation('myCourses', '/dashboard/mycourses')}
          >
            <MdOutlineMenuBook className='text-[23px]' /> My Courses
          </li>
          <li
            className={getItemClass('other-courses')}
            onClick={() => handleNavigation('other-courses', '/dashboard/allcourses')}
          >
            <GoBook className='text-[23px]' /> Explore More
          </li>
          <li
            className={getItemClass('certificate')}
            onClick={() => handleNavigation('certificate', '/dashboard/certificate')}
          >
            <PiCertificateLight className='text-[23px]' /> Certificates
          </li>
          <li
            className={getItemClass('updates')}
            onClick={() => handleNavigation('updates', '/dashboard/updates')}
          >
            <GrSettingsOption className='text-[23px]' /> Updates
          </li>
          <li
            className={getItemClass('profile')}
            onClick={() => handleNavigation('profile', '/dashboard/profile')}
          >
            <RiUserSettingsLine className='text-[23px]' /> Profile and Settings
          </li>
          <li
            className={getItemClass('help')}
            onClick={() => handleNavigation('help', '/dashboard/support')}
          >
            <MdOutlineContactSupport className='text-[23px]' /> Help & Support
          </li>
        </ul>
      </div>
      <div
        className='text-orange text-[18px] cursor-pointer font-medium flex gap-3 items-center mx-4 fixed bottom-5'
        onClick={logout}
      >
        <BsBoxArrowLeft className='text-[23px] font-bold' />
        Log out
      </div>
    </div>
  );
};

export default DashboardSidebar;
