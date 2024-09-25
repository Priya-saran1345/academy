"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Header = () => {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
<>
<header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent text-black z-50 px-4 md:px-60 mt-2">
  <div className="text-lg font-bold">
    <a href="/">
    <Image src="/images/Browk Shop.svg" alt="logo" width={130} height={100} className=''  />
    </a>
  </div>
  <nav className={`flex flex-col md:flex-row items-center md:space-x-8 transition-all duration-300 ${isOpen ? 'hidden' : 'hidden md:block'}`}>
    <ul className="flex flex-col md:flex-row md:space-x-8 items-center">
      <li className="relative group cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
      <a href="/">Home</a>
      </li>
      <li className="relative group cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">
        Courses
        <ul className="absolute left-0 mt-1 rounded-lg bg-white text-black shadow-lg hidden group-hover:block">
          <li className="px-4 py-2 hover:bg-gray-200">Web Development</li>
          <li className="px-4 py-2 hover:bg-gray-200">App Development</li>
          <li className="px-4 py-2 hover:bg-gray-200">SEO Services</li>
        </ul>
      </li>
      <li className="cursor-pointer underlineHover font-medium text-lg text-black hover:text-orange">Contact Us</li>
      <li className="cursor-pointer underlineHover font-medium text-lg text-orange"><a href="/signup">Sign Up</a></li>
      <li className="cursor-pointer smooth1 hover:text-white font-medium text-lg border border-orange px-4 py-2 rounded-lg text-orange hover:bg-orange"><a href="/login">Log In</a></li>
    </ul>
  </nav>
  <button className="md:hidden p-2 text-2xl text-orange" onClick={toggleSidebar}>
    ☰
  </button>
</header>

{/* Sidebar for mobile view */}
{isOpen && (
  <div className="absolute top-20 left-0 right-0 bg-white shadow-lg p-4 md:hidden">
    <ul className="flex flex-col space-y-4">
      <li className="cursor-pointer text-lg text-black hover:text-orange">Home</li>
      <li className="cursor-pointer text-lg text-black hover:text-orange">
        Courses
        <ul className="flex flex-col space-y-2 mt-2">
          <li className="px-4 py-2 hover:bg-gray-200">Web Development</li>
          <li className="px-4 py-2 hover:bg-gray-200">App Development</li>
          <li className="px-4 py-2 hover:bg-gray-200">SEO Services</li>
        </ul>
      </li>
      <li className="cursor-pointer text-lg text-black hover:text-orange">Contact Us</li>
      <li className="cursor-pointer text-lg text-orange">Sign Up</li>
      <li className="cursor-pointer smooth1 hover:text-white border border-orange px-4 py-2 rounded-lg text-orange hover:bg-orange">Log In</li>
    </ul>
  </div>
)}


</>
  );
};

export default Header;
