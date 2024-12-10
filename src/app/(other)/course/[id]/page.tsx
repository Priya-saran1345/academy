"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import { GoStarFill } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import Image from 'next/image';
import { BASE_URL, BASE_URL_IMAGE } from '@/utils/api'
import axios from 'axios';
import { useRouter } from "next/navigation"
import { FaMinus } from "react-icons/fa6";
import Link from 'next/link'
import Footer from '@/components/footer';
import FooterBanner from '@/components/footerBanner'
import { LiaNewspaper } from "react-icons/lia";
import { MdOutlineAddchart } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { useapi } from '@/helpers/apiContext';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import ReactPlayer from 'react-player/youtube';


const page = () => {
    const router = useRouter()
    const [ApiData, setApiData] = useState<any>();
    const [error, setError] = useState();
    const { setcourseid } = useapi()
    const pathname = usePathname()
    const id = pathname.split('/').pop();
    const [openIndex, setOpenIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setisOpen1] = useState(false)
    const [openIndex1, setopenIndex1] = useState<any>()
    const [isFullScreen, setIsFullScreen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}courses/${id}/`);
            console.log(response.data)
            setApiData(response.data)// Update state with fetched data
        } catch (error: any) {
            console.log('Error fetching data:', error.message);
            setError(error.message); // Store the error message in state
        }
    };
    useEffect(() => {
        if (id == 'undefined') {
            router.push('/four/'); // Redirect to /four if id is undefined
        }
        else {

            fetchData(); // Call fetchData when the component mounts
        }
    }, [id, router]);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    const toggleAccordion1 = () => {
        setisOpen1(!isOpen1);
    };
    const toggleModule = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const toggleobjective = (index: any) => {
        setopenIndex1(openIndex1 === index ? null : index);
    };
    const scrollToSection = (targetClass: any) => {
        // Find the element with the given class
        const targetElement = document.getElementsByClassName(targetClass)[0];
        console.log('rthe scroll behaviuor', targetElement)
        if (targetElement) {
            // Scroll to the element
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start', // Align to the top of the page
            });
        }
    };

    // Function to open the video in full-screen
    const toggleFullScreen = () => {
        console.log(isFullScreen)
        setIsFullScreen((prev) => !prev);
    };
    return (
        ApiData && <div>
            <Header />
            <div className="py-4 bg-transparent pt-32  text-black px-3 md:px-6 w-full   mx-auto lg:w-[95%] 2xl:w-[77%] mt-2">
                <div className=' gap-3 flex'>
                    <div className='w-[429px] sticky top-5 hidden lg:block h-fit pb-20 shadow-xl p-6 border-[1px] border-lightGrey rounded-sm'>
                        <div className='border-b-2 border-slate-300 pb-3'>
                            <p className='text-textGrey font-[16px]'>Course Starts - {ApiData?.start_date}</p>
                        </div>
                        <div className='py-4'>
                            {/* <p>Popular</p> */}
                            <p className='text-[38px] font-bold text-black leading-tight'>{ApiData?.name}</p>
                            <p className='text-textGrey text-[14px] mb-7'>{ApiData?.short_description}</p>
                            <div className='flex  pb-5 gap-2 border-b-2 border-slate-300'>
                                {/* <Link href={`/enroll`}> */}
                                <button className='rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]' onClick={() => {
                                    localStorage.setItem("courseid",id ||'');
                                    setcourseid(id)
                                    router.push(`/enroll`)

                                }}>Enroll now</button>
                                {/* </Link> */}
                                <div>
                                    <p className='text-[32px] font-bold'> {ApiData?.price}<span className='text-[24px] text-orange'>Rs.</span></p>
                                </div>
                            </div>
                            <p className='text-textGrey'><span className='text-orange'>{ApiData?.
                                review_count}</span> &nbsp;already  enrolled</p>
                        </div>
                        <div className='py-3'>
                            <p className='text-[24px] font-semibold text-black'>Jump to Section</p>
                            <ul className='flex flex-col gap-3'>

                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('overview')}

                                >Overview of Course</li>
                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('learn')}

                                >What you'll learn</li>
                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('know')}
                                >Details to know</li>
                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('module')}

                                >Course Curriculum</li>
                            </ul>
                            <p className='text-[24px] font-semibold text-black my-4'>Why Choose This Course?</p>
                            <ul className='text-textGrey list-disc mx-7 '>
                                <li>Learn Python from scratch to advanced level</li>
                                <li>Build web apps and data analysis projects</li>
                                <li>Earn a recognized certificate to enhance your resume</li>
                            </ul>
                        </div>
                    </div>
                    {/* //top bar under lg */}
                    <div className='lg:ml-5  w-full'>
                    <div className=' flex h-fit flex-wrap md:flex-nowrap  lg:hidden pb-20 mb-8 gap-5 shadow-xl p-6 border-[1px] border-lightGrey rounded-sm'>
                        
                        <div className='py-4 md:w-2/3'>
                            {/* <p>Popular</p> */}
                            <p className='text-textGrey font-[16px]'>Course Starts - {ApiData?.start_date}</p>
                            <p className='text-[38px] font-bold text-black leading-tight'>{ApiData?.name}</p>
                            <p className='text-textGrey text-[14px] mb-7'>{ApiData?.short_description}</p>
                            <div className='flex  pb-5 gap-2 '>
                                {/* <Link href={`/enroll`}> */}
                                <button className='rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]' onClick={() => {
                                    localStorage.setItem("courseid",id ||'');
                                    setcourseid(id)
                                    router.push(`/enroll`)

                                }}>Enroll now</button>
                                {/* </Link> */}
                                <div>
                                    <p className='text-[32px] font-bold'> {ApiData?.price}<span className='text-[24px] text-orange'>Rs.</span></p>
                                </div>
                            </div>
                            {/* <p className='text-textGrey'><span className='text-orange'>{ApiData?.
                                review_count}</span> &nbsp;already  enrolled</p> */}
                        </div>
                        <div className='py-3'>
                            <p className='text-[24px] font-semibold text-black'>Jump to Section</p>
                            <ul className='flex flex-wrap md:flex-col gap-3'>

                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('overview')}

                                >Overview of Course</li>
                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('learn')}

                                >What you'll learn</li>
                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('know')}
                                >Details to know</li>
                                <li className='hover:text-orange text-textGrey cursor-pointer py-2 bg-lightGrey rounded-lg px-5 font-medium'
                                    onClick={() => scrollToSection('module')}

                                >Course Curriculum</li>
                            </ul>
                         
                        </div>
                    </div>
                        {/* first section */}
                        <div>
                            <div className='flex gap-2  items-center overview'>
                                <div className='size-[13px] rounded-full bg-orange'></div>
                                <p className='text-[24px]'>Overview of Course</p>
                            </div>
                            <div className='flex w-full justify-center gap-4 2xl:justify-between flex-wrap mt-6'>
                                <div className='lg:max-w-[216px]  w-[45%] sm:w-[30%] md:w-[22%] text-center flex-col h-[98px] hover:shadow-xl duration-200 
                                rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold flex justify-center'>{ApiData?.rating}<GoStarFill className='text-orange text-[18px]' />
                                    </p>
                                    <p className='text-textGrey text-[14px]'>(3,915 reviews)</p>
                                </div>
                                <div className='lg:max-w-[216px]  w-[45%] sm:w-[30%] md:w-[22%] text-center flex-col h-[98px] hover:shadow-xl duration-200  rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold'>{ApiData?.course_level}</p>
                                    <p className='text-textGrey text-[14px]'>No prior experience required</p>
                                </div>
                                <div className='lg:max-w-[216px]  w-[45%] sm:w-[30%] md:w-[22%] text-center flex-col h-[98px] hover:shadow-xl duration-200  rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold'>10 hours to complete</p>
                                    <p className='text-textGrey text-[14px]'>3 weeks at 3 hours a week</p>
                                </div>
                                <div className='lg:max-w-[216px]  w-[45%] sm:w-[30%] md:w-[22%] text-center flex-col h-[98px] hover:shadow-xl duration-200  rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold'>Flexible schedule</p>
                                    <p className='text-textGrey text-[14px]'>Learn at your own pace</p>
                                </div>
                            </div>
                            <div className='mt-5 flex flex-wrap sm:flex-nowrap gap-6'>
                                <div>
                                    <p className='text-black text-[18px] font-bold mb-4'>Course Details</p>
                                    <ul className='list-disc text-textGrey mx-7 text-[18px]'>
                                        <li> <span className='text-black font-medium mt-1'>Category&nbsp;:&nbsp;</span>{ApiData?.category}</li>
                                        <li> <span className='text-black font-medium mt-1'>Certificate&nbsp;:&nbsp;</span>Development</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className='text-black text-[18px] font-bold mb-4'>Skills You’ll Master in This Course</p>
                                    <div className='flex justify-center gap-3 flex-wrap text-[16px]'>
                                        {ApiData?.skills?.map((elem: any) => (
                                            <span key={elem} className='bg-lightGrey rounded-md p-1'>{elem}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='text-[18px] mt-4 font-semibold'>Meet Your Instructor</p>
                                <div className='w-full mt-3 p-3 md:p-7 bg-lightGrey rounded-lg'>
                                    <div className='bg-white flex gap-3 text-textGrey p-4 rounded-lg'>
                                        <div className='size-[88px] bg-white  rounded-full'>
                                            <Image
                                                src={`${BASE_URL_IMAGE}${ApiData?.instructor_name?.profile_image}`} // Fallback to a default image if profile_image is not available
                                                height={58}
                                                width={58}
                                                alt='Instructor Profile Image'
                                                className='rounded-full object-cover' // Added object-cover to ensure the image fits well inside the rounded container
                                            />
                                        </div>
                                        <div>
                                            <p> <span className='text-black font-semibold mr-2'>Instructor&nbsp;:</span>{ApiData?.instructor_name?.name}</p>
                                            <p> <span className='text-black font-semibold mr-2'>Expertise&nbsp;:</span>{ApiData?.instructor_name?.expertise}</p>
                                            <p className='text-[16px] '>"{ApiData?.instructor_name?.bio}"</p>
                                        </div>
                                    </div>
                                    <div
                                        className='bg-white flex gap-3 py-3 px-10 mt-3 rounded-lg justify-between cursor-pointer'
                                        onClick={toggleAccordion} // Toggle accordion on click
                                    >
                                        <p className='text-[18px] font-medium text-black'>Instructor Expertise</p>
                                        {isOpen ? (
                                            <FaMinus
                                                className='text-orange text-[20px]' /> // Minus icon when open
                                        ) : (
                                            <GoPlus className='text-orange text-[20px]' /> // Plus icon when closed
                                        )}
                                    </div>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }} // Initial state (closed)
                                            animate={{ opacity: 1, height: 'auto' }} // Final state (opened)
                                            exit={{ opacity: 0, height: 0 }} // Exit state (closed)
                                            transition={{ duration: 0.2 }} // Smooth transition
                                            className='p-5 bg-gray-100 rounded-lg mt-2'
                                        >                                            <p className='text-[16px] text-black'>
                                                <span className='font-medium'>Expertise &nbsp;:</span> {ApiData?.instructor_name?.expertise}
                                                <p className='text-[17px] font-medium'>course Teaches:</p>
                                                <ul className='list-disc ml-7'>
                                                    {
                                                        ApiData?.instructor_name?.courses_taught.map((elem: any) => (
                                                            <li className='text-[15px]'>{elem}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </p>
                                        </motion.div>
                                    )}
                                    <div className='bg-white flex gap-3 py-3 px-10 mt-3 rounded-lg justify-between' onClick={toggleAccordion1}>
                                        <p className='text-[18px] font-medium text-black'>Instructor Achievements</p>
                                        {isOpen1 ? (
                                            <FaMinus
                                                className='text-orange text-[20px]' /> // Minus icon when open
                                        ) : (
                                            <GoPlus className='text-orange text-[20px]' /> // Plus icon when closed
                                        )}
                                        {/* <GoPlus className='text-orange text-[20px]' /> */}
                                    </div>
                                    {isOpen1 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }} // Initial state (closed)
                                            animate={{ opacity: 1, height: 'auto' }} // Final state (opened)
                                            exit={{ opacity: 0, height: 0 }} // Exit state (closed)
                                            transition={{ duration: 0.2 }} // Smooth transition
                                            className='p-5 bg-gray-100 rounded-lg mt-2'
                                        >
                                            <p className='text-[16px] text-black'>
                                                <span className='font-medium capitalize'>achievements &nbsp;:</span> {ApiData?.instructor_name?.achievements}
                                            </p>
                                            <span className='font-medium capitalize'>experience &nbsp;:</span> {ApiData?.instructor_name?.experience}
                                        </motion.div>)}
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2 mt-6  items-center know'>
                                    <div className='size-[13px] rounded-full bg-orange'></div>
                                    <p className='text-[24px]'>Details to know</p>
                                </div>
                                <div className='flex flex-wrap gap-4 sm:flex-nowrap mt-6 justify-between'>
                                    <div className='flex  gap-4'>
                                        <TbCertificate
                                            className='text-[40px] text-orange' />
                                        <div>
                                            <p className='text-[18px] font-medium'>Shareable certificate</p>
                                            <p className='text-textGrey mt-2'>Add to your LinkedIn profile</p>
                                        </div>

                                    </div>
                                    <div className='flex  gap-4'>
                                        <MdOutlineAddchart
                                            className='text-[40px] text-orange' />
                                        <div>
                                            <p className='text-[18px] font-medium'>Recently updated!</p>
                                            <p className='text-textGrey mt-2'>Add to your LinkedIn profile</p>
                                        </div>

                                    </div>
                                    <div className='flex  gap-4'>
                                        <LiaNewspaper


                                            className='text-[40px] text-orange' />
                                        <div>
                                            <p className='text-[18px] font-medium'>Assessments</p>
                                            <p className='text-textGrey mt-2'>Add to your LinkedIn profile</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            {
                                ApiData?.course_modules.length > 0 &&

                                <div>
                                    <p className='text-[18px] mt-4 font-semibold module' >Course Modules:</p>
                                    <div className='w-full mt-3 p-4 bg-lightGrey rounded-lg'>

                                        <div className='flex flex-col gap-3'>
                                            {ApiData?.course_modules?.map((module: any, index: any) => (
                                                <div key={index} className=''>
                                                    {/* Accordion Header */}
                                                    <div
                                                        className='bg-white flex gap-3 py-3 px-10  rounded-lg justify-between cursor-pointer'
                                                        onClick={() => toggleModule(index)} // Toggle accordion on click
                                                    >
                                                        <p className='text-[18px] font-medium text-black'>{module.module_title}</p>
                                                        {openIndex === index ? (
                                                            <FaMinus className='text-orange text-[20px]' /> // Minus icon when open
                                                        ) : (
                                                            <GoPlus className='text-orange text-[20px]' /> // Plus icon when closed
                                                        )}
                                                    </div>

                                                    {/* Accordion Content */}
                                                    {openIndex === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }} // Initial state (closed)
                                                            animate={{ opacity: 1, height: 'auto' }} // Final state (opened)
                                                            exit={{ opacity: 0, height: 0 }} // Exit state (closed)
                                                            transition={{ duration: 0.2 }} // Smooth transition
                                                            className='p-5 bg-gray-100 rounded-lg mt-2'
                                                        >
                                                            <div
                                                                className='text-[16px] text-textGrey '
                                                                dangerouslySetInnerHTML={{ __html: module.module_description }} // Render HTML content
                                                            />


                                                            <div
                                                                className={` ${isFullScreen ? 'fixed top-0 left-0 w-screen h-screen z-50 bg-black' : 'relative w-full h-[300px]'} rounded-lg cursor-pointer`}

                                                            >
                                                                <ReactPlayer
                                                                    url={`https://www.youtube.com/watch?v=${module.video_url}`}
                                                                    width='100%'
                                                                    height='100%'
                                                                    controls
                                                                    onClick={toggleFullScreen}
                                                                />
                                                                {isFullScreen && (
                                                                    <button
                                                                        className='absolute top-2 right-2 bg-white px-4 py-2 rounded text-black z-50'
                                                                        onClick={toggleFullScreen}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                ApiData?.objectives.length > 0 &&
                                <div>
                                    <p className='text-[18px] mt-4 font-semibold learn'>What You will Learn:</p>
                                    <div className='w-full mt-3 p-4 bg-lightGrey rounded-lg'>
                                        <div className='flex flex-col gap-3'>
                                            {ApiData?.objectives?.map((module: any, index: any) => (
                                                <div key={index} className=''>
                                                    {/* Accordion Header */}
                                                    <div
                                                        className='bg-white flex gap-3 py-3 px-10  rounded-lg justify-between cursor-pointer'
                                                        onClick={() => toggleobjective(index)} // Toggle accordion on click
                                                    >
                                                        <p className='text-[18px] font-medium text-black'>{module.title}</p>
                                                        {openIndex1 === index ? (
                                                            <FaMinus className='text-orange text-[20px]' /> // Minus icon when open
                                                        ) : (
                                                            <GoPlus className='text-orange text-[20px]' /> // Plus icon when closed
                                                        )}
                                                    </div>

                                                    {/* Accordion Content */}
                                                    {openIndex1 === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }} // Initial state (closed)
                                                            animate={{ opacity: 1, height: 'auto' }} // Final state (opened)
                                                            exit={{ opacity: 0, height: 0 }} // Exit state (closed)
                                                            transition={{ duration: 0.2 }} // Smooth transition
                                                            className='p-5 bg-gray-100 rounded-lg mt-2'
                                                        >
                                                            <div
                                                                className='text-[16px] text-textGrey mb-4'
                                                                dangerouslySetInnerHTML={{ __html: module.description }} // Render HTML content
                                                            />

                                                            {/* YouTube Video Embed */}

                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {/* first section */}

                    </div>
                </div>

            </div>
            <FooterBanner
            />
            <Footer />
        </div>
    )
}
export default page