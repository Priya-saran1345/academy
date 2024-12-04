"use client"
import { useState } from 'react';
import Image from 'next/image';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineMenuBook } from 'react-icons/md';
import {  PiCertificateLight } from 'react-icons/pi';
import { GrSettingsOption } from 'react-icons/gr';
import { useRouter } from "next/navigation";
import { RiUserSettingsLine } from 'react-icons/ri';
import { BsBoxArrowLeft } from 'react-icons/bs';
import React  from 'react';
import Cookies from 'js-cookie';
import {useDashboard} from '@/helpers/dashboardContext';
import Link from 'next/link';
import { MdOutlineContactSupport } from "react-icons/md";
import { GoBook } from 'react-icons/go';


const DashboardSidebar = () => {
  const router = useRouter();
  const [activeoption, setactiveoption] = useState('dashboard');
  const { setProfileState } = useDashboard();
  const getItemClass = (option:any) => {
    return `flex gap-2 items-center text-[16px] font-medium py-3 px-2 rounded-md my-2 ${
      activeoption === option ? 'bg-orange text-white' : 'bg-[#F9F9F9] text-[#545454] hover:bg-orange hover:text-white'
    }`;
  };
  const logout = () => {
   
    Cookies.remove('login_access_token');
    Cookies.remove('login_refresh_token');
    
    router.push('/login');
  };

  return (
    <div className='w-[245px] bg-[#F7F7F7] px-2 min-h-[97vh]'>
      <div className='p-5'>
        <Link href="/">
        <Image src="/images/Browk Shop.svg" alt="logo" width={130} height={100} />
        </Link>
      </div>
      <div>
        <ul>
          <li className={getItemClass('dashboard')} onClick={() => {setactiveoption('dashboard'),
            setProfileState('dashboard')
          }}>
            <RxDashboard className='text-[23px]' /> Dashboard
          </li >
          <li className={getItemClass('myCourses')} onClick={() => {setactiveoption('myCourses')
            setProfileState('myCourses')
          }}>
            <MdOutlineMenuBook className='text-[23px]' /> My Courses
          </li>
          <li className={getItemClass('other-courses')} onClick={() => {setactiveoption('other-courses'),
            setProfileState('other-courses')
          }}>
            <GoBook  className='text-[23px]' /> Explore More
          </li>
          <li className={getItemClass('certificate')} onClick={() => {setactiveoption('certificate'),
            setProfileState('certificate')
          }}>
            <PiCertificateLight className='text-[23px]' /> Certificates
          </li>
          <li className={getItemClass('updates')} onClick={() =>{ setactiveoption('updates'),
            setProfileState('updates')
          }}>
            <GrSettingsOption className='text-[23px]' /> Updates
          </li>
          <li className={getItemClass('profile')} onClick={() => {setactiveoption('profile'),
            setProfileState('profile')
          }}>
            <RiUserSettingsLine className='text-[23px]' /> Profile and Settings
          </li>
          <li className={getItemClass('help')} onClick={() => {setactiveoption('help'),
            setProfileState('help')
          }}>
            <MdOutlineContactSupport className='text-[23px]' />Help & support
          </li>
        
        </ul>
      </div>
      <div className='text-orange text-[18px] cursor-pointer font-medium flex gap-3 items-center mx-4 fixed bottom-5' onClick={logout}>
        <BsBoxArrowLeft className='text-[23px] font-bold' />
        Log out
      </div >
    </div>
  );
};
export default DashboardSidebar;
