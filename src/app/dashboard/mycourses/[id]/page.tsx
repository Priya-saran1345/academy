'use client'
import { motion } from 'framer-motion'; // Import motion from framer-motion

import Header from '@/components/header'
import { useState, useRef, useEffect } from 'react'
import { BiChevronLeft, BiChevronRight, BiDownload, BiEdit, BiMessageSquare, BiPlayCircle, BiSave } from 'react-icons/bi'
import { FaCircleCheck } from 'react-icons/fa6'
import { MdOutlinePlayCircle } from 'react-icons/md'
import ReactPlayer from 'react-player';
import DashboardHeader from '@/components/dashboardHeader';

const videoData = [
    {
        heading: 'Lorem ipsum dolor sit amet',
        videos: [
            'lorem106.png w3era branding agency',
            'lorem106.png w3era branding agency',
        ],
    },
    {
        heading: ' Consectetur adipisicing elit',
        videos: [
            'lorem106.png w3era branding agency',
            'lorem106.png w3era branding agency',
        ],
    },
];
const page = () => {
    const [openIndex, setOpenIndex] = useState<any>()
    const toggleModule = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex mt-12 md:flex-nowrap flex-wrap w-full transition-all duration-300">
                <div className='w-full m-2 md:w-[30%] lg:w-[25%] xl:w-[20%]  h-fit pb-20 shadow-xl p-6 border-1 border-grey-200 rounded-lg'>
                    <div className='border-b-2 border-slate-300 pb-3'>
                        <p className='text-textGrey  font-semibold text-[16px]'>Start Now -</p>
                    </div>
                    <div className="py-4">
                        {videoData.map((elem, index) => (
                            <div key={index} className="mb-4">
                                {/* Heading */}
                                <div onClick={() => toggleModule(index)} className="cursor-pointer">
                                    <p className="text-[18px] mb-2 font-medium  leading-tight">
                                        {elem.heading}
                                    </p>
                                </div>

                                {/* Video List - shown if openIndex matches the current index */}
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }} // Initial state (closed)
                                        animate={{ opacity: 1, height: 'auto' }} // Final state (opened)
                                        exit={{ opacity: 0, height: 0 }} // Exit state (closed)
                                        transition={{ duration: 0.2 }} // Smooth transition
                                        className='p-3 bg-gray-100 rounded-lg mt-2 flex flex-col gap-3'
                                    >
                                        {/* <p className="font-semibold mb-2">Multiple Video Titles</p> */}
                                        {elem.videos.map((videoTitle, videoIndex) => (
                                            <div key={videoIndex} className="flex gap-2 items-start ">
                                                <MdOutlinePlayCircle className="text-[22px] text-textGrey" />
                                                <FaCircleCheck className="text-[18px] text-green-800" />
                                                <p className="text-textGrey font-medium text-[15px]">
                                                    {videoTitle}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <main className="overflow-hidden w-full md:w-[70%] lg:w-[75%] xl:w-[60%]">
                    <div className="h-full flex flex-col p-4 border-1 border-slate-200 rounded-lg">
                        <div className="relative aspect-video bg-black">
                            <ReactPlayer
                                url="https://youtu.be/tqL5OOTycMo?si=t5k83ttpQ8Ji4vLI"
                                controls
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div className="p-4 border-t flex items-center justify-between">
                            <div className="flex gap-4">
                                {/* <button className="flex items-center gap-2 text-sm">
                                    <BiSave className="h-4 w-4" />
                                    Save Note
                                </button>
                                <button className="flex items-center gap-2 text-sm">
                                    <BiMessageSquare className="h-4 w-4" />
                                    Discuss
                                </button> */}
                                <button className="flex border-1 px-3 py-2 rounded-lg items-center gap-2 text-sm">
                                    <BiDownload className="h-5 w-5" />
                                    Download Notes
                                </button>
                            </div>
                            {/* <select className="px-2 py-1 border rounded bg-background">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select> */}
                        </div>
                    </div>
                </main>
                <div className="border-1 border-slate-200 hidden xl:block rounded-lg w-[20%]  bg-card overflow-hidden">
                    <div className="p-4 space-y-4">
                        <h2 className="font-semibold text-xl">Notes</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <BiSave className="h-4 w-4" />
                                <BiEdit className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Click the "Save Note" button when you want to capture a screen. You can also highlight and save lines from the transcript below. Add your own notes to anything you've captured.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page