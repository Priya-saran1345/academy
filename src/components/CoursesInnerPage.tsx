"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import { GoDownload, GoStarFill } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import Image from 'next/image';
import { BASE_URL, BASE_URL_IMAGE } from '@/utils/api'
import axios from 'axios';
import { useRouter } from "next/navigation"
import { FaMinus, FaStar } from "react-icons/fa6";
import Link from 'next/link'
import Footer from '@/components/footer';
import FooterBanner from '@/components/footerBanner'
import { LiaNewspaper } from "react-icons/lia";
import { MdOutlineAddchart } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { useapi } from '@/helpers/apiContext';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from framer-motion
import ReactPlayer from 'react-player/youtube';
import Cookies from 'js-cookie';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoLockClosed } from 'react-icons/io5';
import { CiLock } from 'react-icons/ci';
import { BsArrowRight } from 'react-icons/bs';
import { FaStarHalfAlt } from 'react-icons/fa';


const page = () => {
    const router = useRouter()
    const [ApiData, setApiData] = useState<any>();
    const [error, setError] = useState();
    const { setcourseid } = useapi()
    const [id, setid] = useState<any>()
    const [openIndex, setOpenIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setisOpen1] = useState(false)
    const [openIndex1, setopenIndex1] = useState<any>()
    const [allTopics, setallTopics] = useState<any>()
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [moduleTitles, setModuleTitles] = useState<string[]>([]);
    const [sidecontentindex, setsidecontentindex] = useState<number>(0);
    const [topics, setTopics] = useState<any[]>([]);
    const [openModule, setOpenModule] = useState<number | null>(0);
    const [expandedLessonIndex, setExpandedLessonIndex] = useState<number | null>(0);
    const [expandednotesIndex, setexpandednotesIndex] = useState<any>()
    const pathname = usePathname()
    const toggleLesson = (index: number) => {
        setExpandedLessonIndex(expandedLessonIndex === index ? null : index);
    };
    useEffect(()=>{
        const id = pathname.split('/').pop();
        setid(id)
    },[])
    const toggleNotes = (index: number) => {
        setexpandednotesIndex(expandednotesIndex === index ? null : index);
    };
    const getAllTopics = (apiData: any, index: number) => {
        return apiData?.modules?.[index]?.topics || [];
    };
    useEffect(() => {
        if (ApiData) {
            setTopics(getAllTopics(ApiData, sidecontentindex));
        }
    }, [ApiData, sidecontentindex]);

    const getModuleTitles = (apiData: any) => {
        return apiData?.modules?.map((module: any) => module?.module_title) || [];
    };

    useEffect(() => {
        if (ApiData) {
            setModuleTitles(getModuleTitles(ApiData));
        }
    }, [ApiData]);

    const fetchData = async () => {
        const token = Cookies.get('login_access_token'); // Retrieve the token from cookies

        try {
            const headers: any = {}; // Initialize headers as an empty object

            // Add the Authorization header only if the token is available
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            // Fetch data with or without the Authorization header
            const response = await axios.get(`${BASE_URL}courses/${id}/`, {
                headers, // Dynamically pass the headers
            });

            console.log('API data:', response.data);
            setApiData(response.data); // Update state with fetched data
        } catch (error: any) {
            console.log('Error fetching data:', error.message);
            setError(error.message); // Store the error message in state
        }
    };

const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
    // Add full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-orange " />);
    }
    // Add half star if there's a fractional part
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange " />);
    }
    return <div className="flex gap-1">{stars}</div>;
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

    return (
        ApiData && <div>
            <Header />
            <div className="py-4 bg-transparent pt-32  text-black px-3 md:px-6 w-full   mx-auto lg:w-[95%] 2xl:w-[77%] mt-2">
                <div className=' gap-3 flex'>
                    <div className='w-[429px] sticky top-5 hidden lg:block h-fit pb-20 shadow-xl p-6 border-[1px] border-lightGrey rounded-sm'>
                        {/* <div className='border-b-2 border-slate-300 pb-3'>
                            <p className='text-textGrey font-[16px]'>Course Starts -{ApiData?.start_date}</p>
                        </div> */}
                        <Image src={`${BASE_URL_IMAGE}${ApiData?.card_image}`} width={320} height={120} alt='' className='rounded-md'></Image>
                        <div className='py-4'>
                            {/* <p>Popular</p> */}
                            <p className='text-[24px] font-bold text-black leading-tight'>{ApiData?.name}</p>
                            <p className='text-textGrey text-[14px] mb-4'>{ApiData?.short_description}</p>
                            <div className='flex  flex-wrap pb-5 gap-2 border-b-2 border-slate-300'>
                                {/* <Link href={`/enroll`}> */}
                                {ApiData?.is_purchased ? (
                                    <>
                                        <p className='text-textGrey'><span className='text-orange'>Awesome! You&apos;ve already enrolled in this course. Let&apos;s get started on your learning journey today!
                                        </span> </p>

                                        <button
                                            className="rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]"
                                            onClick={() => {
                                                if (ApiData?.slug) {
                                                    router.push(`/dashboard/mycourses/${ApiData.slug}`);
                                                } else {
                                                    console.error('Slug is missing');
                                                }
                                            }}
                                            >
                                            Let's Dive In!
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]"
                                        onClick={() => {
                                            if (id) {
                                                localStorage.setItem('courseid', id);
                                                setcourseid(id);
                                                router.push(`/dashboard/enroll`);
                                            } else {
                                                console.error('ID is missing');
                                            }
                                        }}
                                    >
                                        Enroll Now
                                    </button>
                                )}
                                {/* </Link> */}
                                {
                                    !ApiData?.is_purchased &&
                                    <div>
                                        <p className='text-[24px] font-bold'> {ApiData?.price}<span className='text-[24px] text-orange'>Rs.</span></p>
                                    </div>
                                }
                            </div>
                            {
                                !ApiData?.is_purchased &&
                                <p className='text-textGrey'><span className='text-orange'>{ApiData?.
                                    review_count}</span> &nbsp;already  enrolled</p>
                            }
                            {/* {
                                ApiData?.is_purchased &&
                                <p className='text-textGrey'><span className='text-orange'>Start Your Journey</span> </p>
                            } */}
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
                            {/* side course modules */}
                            <p className='text-[24px] font-semibold text-black my-4'>Course Modules:</p>
                            <nav className="space-y-1">
                                {moduleTitles?.map((module: string, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => setsidecontentindex(index)}
                                        className="w-full items-center text-left px-4 border-none py-3 rounded-lg text-sm hover:bg-gray-100 focus:outline-none"
                                    >
                                        <div className="flex cursor-pointer text-textGrey font-medium text-[15px] gap-4">
                                            <div className="min-w-[13px] h-[13px] border-2 border-orange rounded-full"></div>
                                            {module}
                                        </div>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className='lg:ml-5  w-full'>
                        <div className=' flex h-fit flex-wrap md:flex-nowrap  lg:hidden pb-20 mb-8 gap-5 shadow-xl p-6 border-[1px] border-lightGrey rounded-sm'>
                            <div className='py-4 md:w-2/3'>
                                {/* <p>Popular</p> */}
                                <p className='text-textGrey font-[16px]'>Course Starts - {ApiData?.start_date}</p>
                                <p className='text-[38px] font-bold text-black leading-tight'>{ApiData?.name}</p>
                                <p className='text-textGrey text-[14px] mb-4'>{ApiData?.short_description}</p>
                                <div className='flex flex-wrap pb-5 gap-2 '>
                                    {/* <Link href={`/enroll`}> */}
                                    {ApiData?.is_purchased ? (
                                        <>
                                            <p className='text-textGrey'><span className='text-orange'>Great You have already enrolled</span> </p>
                                            <button
                                                className="rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]"
                                                onClick={() => {
                                                    router.push(`/dashboard/mycourses/${ApiData?.slug}`);
                                                }}
                                            >
                                                Let's Dive In!
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]"
                                            onClick={() => {
                                                localStorage.setItem("courseid", id || "");
                                                setcourseid(id);
                                                router.push(`/dashboard/enroll`);
                                            }}
                                        >
                                            Enroll Now
                                        </button>
                                    )}
                                    {/* </Link> */}
                                    {
                                        !ApiData?.is_purchased &&
                                        <div>
                                            {
                                                !ApiData?.is_purchased &&
                                                <p className='text-textGrey'><span className='text-orange'>{ApiData?.
                                                    review_count}</span> &nbsp;already  enrolled</p>
                                            }
                                            {
                                                ApiData?.is_purchased &&
                                                <p className='text-textGrey'><span className='text-orange'>Start Your Journey</span> </p>
                                            }
                                        </div>
                                    }
                                </div>
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
                                <p className='text-[22px] font-medium'>Overview of Course</p>
                            </div>
                            <div className='flex w-full justify-center gap-4 2xl:justify-between flex-wrap mt-6'>
                                <div className='lg:max-w-[216px]  w-[45%] sm:w-[30%] md:w-[22%] text-center flex-col h-[98px] hover:shadow-xl duration-200 
                                rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <div className='text-[18px] font-bold flex justify-center'>{ renderStars(ApiData?.rating)}
                                    </div>  
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
                                    <div className='flex justify-center sm:justify-start gap-3 flex-wrap text-[16px]'>
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
                                    <p className='text-[22px] font-medium'>Details to know</p>
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
                            <div>
                                <div className='flex gap-2 mt-6  items-center know'>
                                    <div className='size-[13px] rounded-full bg-orange'></div>
                                    <p className='text-[22px] font-medium'>Course Curriculum</p>
                                </div>
                                {
                                ApiData?.is_purchased ? (
                                    <div className=' shadow  mt-4 p-6 border-l-4 border-orange rounded-lg '>
                                    <p className=' text-[20px] font-medium'>Welcome Back! Continue Your Learning Journey</p>
                                    <p className=' text-[16px] text-textGrey'>
                                    You &apos;re enrolled in the 
                                    &apos;{ApiData?.name} &apos; course. You can access all the modules and start learning right away.             
                                         </p>
                                 </div>
                                    ):
                                  
                                 <div className=' shadow  mt-4 p-6 border-l-4 border-orange rounded-lg '>
                                 <p className=' text-[20px] font-medium'>Unlock Full Access to All Course Modules!</p>
                                 <p className=' text-[16px] text-textGrey'>To access all the modules and start learning in-depth, click the button below to enroll in 
                                    &apos;{ApiData?.name} &apos; today! The first module is available for preview.</p>
                                </div>
                                }
                            </div>
                            {ApiData?.modules.length > 0 &&
                                <div>
                                    <p className='text-[18px] mt-4 font-semibold module' >Course Modules:</p>
                                    <div className='w-full mt-3 p-2 lg:p-4 bg-lightGrey rounded-lg'>
                                        <div className='flex flex-col gap-3'>
                                            {
                                                topics.length > 0 &&
                                                <div className="p-2 lg:p-4">
                                                    {topics?.map((module: any, moduleIndex: number) => (
                                                        <div key={moduleIndex} className="mb-4">
                                                          { 
                                                          module?.locked==false?
                                                           <button
                                                                onClick={() => setOpenModule(openModule === moduleIndex ? null : moduleIndex)}
                                                                className="w-full flex items-center justify-between p-4 border-slate-200 border-1 hover:shadow-lg mb-3 duration-250 rounded-lg"
                                                            >
                                                                <span className="font-medium text-[18px]">{moduleIndex + 1}. {module?.title || 'Untitled Module'}</span>
                                                                {openModule === moduleIndex ? <FiMinus className="text-[24px] text-orange" /> : <FiPlus className="text-[24px] text-orange" />}
                                                            </button>:
                                                            <div>

                                                            <button
                                                                onClick={() => setOpenModule(openModule === moduleIndex ? null : moduleIndex)}
                                                                className="w-full flex items-center justify-between p-4
                                                                 border-slate-200 border-1 hover:shadow-lg mb-3 duration-250 rounded-lg"
                                                                > 
                                                                <span  className=" font-semibold text-[18px]">{moduleIndex + 1}. {module?.title || 'Untitled Module'}</span>
                                                                <CiLock className='text-[24px] text-textGrey' />
                                                                {/* {openModule === moduleIndex ? <FiMinus className="text-[24px] text-orange" /> : 
                                                                <FiPlus className="text-[24px] text-orange" />} */}
                                                            </button>
                                                            <div className='w-full  flex justify-end items-center cursor-pointer  gap-2 px-3 py-1 text-orange' onClick={()=>{
                                                                                                                localStorage.setItem('courseid', id);
                                                                                                                setcourseid(id);
                                                                                                            router.push(`/dashboard/enroll`);
                                                            }}>
                                                            Unlock This Module and Begin Your Learning Journey!
                                                            <BsArrowRight />
                                                            </div>
                                                                </div>
                                                            }
                                                            <AnimatePresence>                
                                                                {openModule === moduleIndex && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        {module?.content?.length>0 &&
                                                                        module?.content?.map((lesson: any, lessonIndex: number) => (
                                                                            <>
                                                                                <div key={lessonIndex} className="flex flex-col gap-2 mt-2">
                                                                                    <div
                                                                                        className={`flex border-1 ${expandedLessonIndex === lessonIndex ? 
                                                                                            "border-orange" : "border-slate-200"} p-3 rounded-lg items-start gap-3 text-sm cursor-pointer`}
                                                                                        onClick={() => toggleLesson(lessonIndex)}
                                                                                    >
                                                                                        <div className="flex-1 min-w-0">
                                                                                            <div className="flex justify-between">
                                                                                                <div className="flex items-start gap-2">
                                                                                                    <div className="min-w-[13px] h-[13px] border-2 mt-1 border-orange rounded-full"></div>
                                                                                                    <div className="items-center gap-2">
                                                                                                        <div className={`font-normal text-[16px]
                                                                                                            ${expandedLessonIndex === lessonIndex
                                                                                                             ? "text-orange" : "text-textGrey"}`}>{lesson?.title}</div>
                                                                                                        <div className="text-gray-500 mt-1 text-xs">Video • {lesson.duration}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {expandedLessonIndex === lessonIndex ? <BiChevronUp className="text-[28px] text-orange" />
                                                                                                    : <BiChevronDown className="text-[28px] text-orange" />}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <AnimatePresence>
                                                                                        {expandedLessonIndex === lessonIndex && (
                                                                                            <motion.div
                                                                                                initial={{ height: 0, opacity: 0 }}
                                                                                                animate={{ height: "auto", opacity: 1 }}
                                                                                                exit={{ height: 0, opacity: 0 }}
                                                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                                                className="overflow-hidden"
                                                                                            >
                                                                                                <div className="h-[500px] rounded-md">
                                                                                                    <ReactPlayer url={lesson?.video_url} controls width="100%" height="100%" />
                                                                                                </div>
                                                                                            </motion.div>
                                                                                        )}
                                                                                    </AnimatePresence>
                                                                                </div>
                                                                                {/* pdf content here */}
                                                                                <div key={lessonIndex} className={`flex  ${expandednotesIndex === lessonIndex ? 
                                                                                    "border-orange" : "border-slate-200"} rounded-lg border-1 flex-col gap-2 mt-2`}>
                                                                                    <div
                                                                                        className={`flex p-3
                                                                                        rounded-lg items-start gap-3 text-sm cursor-pointer`}
                                                                                        onClick={() => toggleNotes(lessonIndex)}
                                                                                    >
                                                                                        <div className="flex-1 min-w-0">
                                                                                            <div className="flex justify-between">
                                                                                                <div className="flex items-start gap-2">
                                                                                                    <div className="min-w-[13px] h-[13px]  mt-1 border-2 border-orange  rounded-full"></div>
                                                                                                    <div className="items-center gap-2">
                                                                                                        <div className={`font-normal text-[16px]
                                                                                                            ${expandednotesIndex === lessonIndex
                                                                                                             ? "text-orange" : "text-textGrey"}`}>{lesson?.title} Notes</div>
                                                                                                        <div className="text-gray-500 mt-1 text-xs">Video • {lesson.duration}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {expandednotesIndex === lessonIndex ? <BiChevronUp className="text-[28px] text-orange" />
                                                                                                    : <BiChevronDown className="text-[28px] text-orange" />}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <AnimatePresence>
                                                                                        {expandednotesIndex === lessonIndex && (
                                                                                            <motion.div
                                                                                                initial={{ height: 0, opacity: 0 }}
                                                                                                animate={{ height: "auto", opacity: 1 }}
                                                                                                exit={{ height: 0, opacity: 0 }}
                                                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                                                className="overflow-hidden"
                                                                                            >
                                                                                                <div className="rounded-md mx-8 pb-3">
                                                                                                    <button className="px-4 py-[9px] rounded-md bg-orange  text-white  hover:bg-orange/30 hover:text-orange transition duration-200">
                                                                                                        <Link
                                                                                                            href={`${BASE_URL_IMAGE}${lesson.notes}`}
                                                                                                            className="flex gap-2 items-center"
                                                                                                            download
                                                                                                        >
                                                                                                            Download PDF-1  <GoDownload className="text-[20px]" />
                                                                                                        </Link>
                                                                                                    </button>
                                                                                                    {/* <a href="#" className="px-4 py-2 bg-orange-600  rounded-lg hover:bg-orange-500 transition duration-200">Download PDF-2</a> */}
                                                                                                </div>
                                                                                            </motion.div>
                                                                                        )}
                                                                                    </AnimatePresence>
                                                                                </div>
                                                                            </>
                                                                        ))
                                                                    
                                                                    }

                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                            {
                                                topics.length === 0 &&
                                                <div className="p-4 text-center">No topics found</div>
                                            }
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