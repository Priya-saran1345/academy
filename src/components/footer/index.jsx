import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
<div className="px-4 md:px-60">
  <div className="flex flex-col md:flex-row pt-20 pb-24 justify-between border-b border-slate-900">
    <div>
      <ul className="flex flex-col md:flex-row gap-5 text-[16px] md:text-[18px] font-medium">
        <li className="hover:text-[#F24A25] text-[#F24A25]">Home</li>
        <li className="hover:text-[#F24A25]">Courses</li>
        <li className="hover:text-[#F24A25]">Contact Us</li>
        <li className="hover:text-[#F24A25]">About Us</li>
      </ul>
    </div>
    <div className="flex gap-3 text-[20px] md:text-[25px] mt-4 md:mt-0">
      <FaFacebook />
      <FaInstagram />
      <FaLinkedin />
      <CiLocationOn />
    </div>
  </div>
  <div className="flex justify-center items-center py-5 text-slate-500 font-semibold text-[14px] md:text-[16px]">
    <p>Copyright © - All rights reserved by Me!</p>
  </div>
</div>

  )
}

export default Footer