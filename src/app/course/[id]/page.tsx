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

const page = () => {
    const router = useRouter()
    const [ApiData, setApiData] = useState<any>();
    const [error, setError] = useState();
    const pathname = usePathname()
    const id = pathname.split('/').pop();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setisOpen1] = useState(false)
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
    console.log(`${BASE_URL_IMAGE}${ApiData?.instructor_name?.profile_image}`);

    return (
        ApiData && <div>
            <Header />
            <div className="p-4 bg-transparent pt-32  text-black px-6 w-full  mx-auto xl:w-[77%] mt-2">
                <div className=' gap-3 flex'>
                    <div className='w-[429px] pb-20 shadow-xl p-6 border-[1px] border-lightGrey rounded-sm'>
                        <div className='border-b-2 border-slate-300 pb-3'>
                            <p className='text-textGrey font-[16px]'>Course Starts - {ApiData?.start_date}</p>
                        </div>
                        <div className='py-4'>
                            {/* <p>Popular</p> */}
                            <p className='text-[38px] font-bold text-black leading-tight'>{ApiData?.name}</p>
                            <p className='text-textGrey text-[14px] mb-7'>{ApiData?.short_description}</p>
                            <div className='flex  pb-5 gap-2 border-b-2 border-slate-300'>
                            <Link href={`/enroll/${id}`}>
                                <button className='rounded-lg py-2 px-6 text-white bg-orange font-medium text-[16px]'>Enroll now</button>
                                </Link>
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

                                <li className='hover:text-orange text-textGrey py-2 bg-lightGrey rounded-lg px-5 font-medium'>Overview of Course</li>
                                <li className='hover:text-orange text-textGrey py-2 bg-lightGrey rounded-lg px-5 font-medium'>What you'll learn</li>
                                <li className='hover:text-orange text-textGrey py-2 bg-lightGrey rounded-lg px-5 font-medium'>What you'll learn</li>
                                <li className='hover:text-orange text-textGrey py-2 bg-lightGrey rounded-lg px-5 font-medium'>Course Curriculum</li>
                            </ul>
                            <p className='text-[24px] font-semibold text-black my-4'>Why Choose This Course?</p>
                            <ul className='text-textGrey list-disc mx-7 '>
                                <li>Learn Python from scratch to advanced level</li>
                                <li>Build web apps and data analysis projects</li>
                                <li>Earn a recognized certificate to enhance your resume</li>
                            </ul>
                        </div>
                    </div>

                    {/* //right side bar */}
                    <div className='ml-5 w-full'>
                        {/* first section */}
                        <div>
                            <div className='flex gap-2  items-center'>
                                <div className='size-[13px] rounded-full bg-orange'></div>
                                <p className='text-[24px]'>Overview of Course</p>
                            </div>
                            <div className='flex w-full justify-between mt-6'>
                                <div className='w-[216px] flex-col h-[98px] hover:shadow-xl
                                rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold flex justify-center'>{ApiData?.rating}<GoStarFill className='text-orange text-[18px]' />
                                    </p>
                                    <p className='text-textGrey text-[14px]'>(3,915 reviews)</p>
                                </div>
                                <div className='w-[216px] flex-col h-[98px] hover:shadow-xl rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold'>{ApiData?.course_level}</p>
                                    <p className='text-textGrey text-[14px]'>No prior experience required</p>
                                </div>
                                <div className='w-[216px] flex-col h-[98px] hover:shadow-xl rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold'>10 hours to complete</p>
                                    <p className='text-textGrey text-[14px]'>3 weeks at 3 hours a week</p>
                                </div>
                                <div className='w-[216px] flex-col h-[98px] hover:shadow-xl rounded-lg flex border-[1px] justify-center items-center border-slate-300 '>
                                    <p className='text-[18px] font-bold'>Flexible schedule</p>
                                    <p className='text-textGrey text-[14px]'>Learn at your own pace</p>
                                </div>
                            </div>
                            <div className='mt-5 flex gap-6'>
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
                                <div className='w-full mt-3 p-7 bg-lightGrey rounded-lg'>
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
                                        <div className='p-5 bg-gray-100 rounded-lg mt-2'>
                                            <p className='text-[16px] text-black'>
                                            <span className='font-medium'>Expertise &nbsp;:</span> {ApiData?.instructor_name?.expertise}
                                                <p className='text-[17px] font-medium'>course Teaches:</p>
                                                <ul className='list-disc ml-7'>
                                                    {
                                                        ApiData?.instructor_name?.courses_taught.map((elem:any)=>(
                                                             <li className='text-[15px]'>{elem}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </p>
                                        </div>
                                    )}
                                    <div className='bg-white flex gap-3 py-3 px-10 mt-3 rounded-lg justify-between'  onClick={toggleAccordion1}>
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
                                    <div className='p-5 bg-gray-100 rounded-lg mt-2'>
                                            <p className='text-[16px] text-black'>
                                            <span className='font-medium capitalize'>achievements &nbsp;:</span> {ApiData?.instructor_name?.achievements}
                                            </p>
                                            <span className='font-medium capitalize'>experience &nbsp;:</span> {ApiData?.instructor_name?.experience}

                                        </div>)}
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2 mt-6  items-center'>
                                    <div className='size-[13px] rounded-full bg-orange'></div>
                                    <p className='text-[24px]'>Details to know</p>
                                </div>
                                <div className='flex mt-6 justify-between'>
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