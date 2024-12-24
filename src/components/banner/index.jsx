"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Link from 'next/link';
import { BASE_URL_IMAGE } from '@/utils/api'
import { motion } from "framer-motion";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    image:
      "/images/Group 1000004307.svg",
  },
];

const Banner = ({ props }) => {
  const [str, setStr] = useState('');
  const [lastFour, setLastFour] = useState('');
  const [restOfString, setRestOfString] = useState('');
  useEffect(() => {
    const heading = localStorage.getItem('banner-heading');
    setStr(heading);
    setLastFour(heading?.slice(-5).trim());
    setRestOfString(heading?.slice(0, -5).trim());
  }, []); // Include props.heading in the dependency array
  return (
    <div className="h-fit md:min-h-[850px] flex flex-col md:flex-row bg-banner px-6 mx-auto w-full lg:w-[95%] 2xl:w-[77%]">
      {/* Left Section */}
      <motion.div
        className="flex-1 flex flex-col mb-16 mt-32 md:my-20 lg:my-0 justify-center gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: .2 } },
        }}
      >
        {/* Heading */}
        <motion.div
          className="flex flex-col gap-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <h1 className="2xl:text-[68px] xl:text-[55px] text-[35px] text-black font-bold leading-tight">
            <span>{restOfString}</span>
            <span className="px-0 mx-0 text-orange">{lastFour}</span>
          </h1>
        </motion.div>
        <motion.div
         variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >

          <p className="text-lg md:text-xl">{props?.short_description}</p>
        </motion.div>

        {/* Button */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, 
          visible: { opacity: 1, y: 0 } }}
        >
          <Link href={`/courses`}>
            <div className="flex items-center justify-start">
              <button className="bg-orange text-white text-center text-[15px] xl:text-lg px-6 py-2 xl:py-3 font-medium hover:bg-white border border-orange hover:border-orange hover:text-orange smooth1 rounded-full">
                {props?.button_text}
              </button>
            </div>
          </Link>
        </motion.div>

        {/* Students Section */}
        <motion.div
          className="flex flex-col gap-1"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <div className="flex flex-row w-full">
            <AnimatedTooltip items={people} />
          </div>
          <h3 className="font-medium text-gray-500 w-[250px] bg-lightGrey p-1 rounded-lg">
            <span className="text-orange">Students</span>, achieve their goals.
          </h3>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="md:flex flex-1 items-center justify-center hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .5 }}
      >
        {!props?.image && <div className="loader"></div>}
        {props?.image && (
          <Image
            src={`${BASE_URL_IMAGE}${props?.image}`}
            alt="banner"
            height={600}
            width={600}
          />
        )}
      </motion.div>
    </div>
  );
}


export default Banner