"use client";
import React, { useEffect, useState } from 'react';
import CourseCard from "@/components/coursecard"
import Cookies from 'js-cookie';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import { FaStar } from 'react-icons/fa6';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { FaStarHalfAlt } from 'react-icons/fa';
const MyCourses = () => {
  const [allvalue, setAllValue] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [apiData, setApiData] = useState();
  const [finalData, setFinalData] = useState([]);
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-orange " />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange " />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };
  const fetch = async () => {
    try {
      const token = Cookies.get('login_access_token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get(`${BASE_URL}purchased-courses/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('my courses are ', response.data)
      setApiData(response.data);
    } catch (error) {
      console.log("my courses error", error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    if (apiData?.length > 0) {
      if (allvalue) {
        setFinalData(apiData);
      } else {
        const filteredData = apiData?.filter((course) =>
          course?.completion_status.toLowerCase().includes(filterValue.toLowerCase())
        );
        setFinalData(filteredData);
      }
    } else {
      setFinalData([]);
    }
  }, [allvalue, filterValue, apiData]);
  return (
    <div>
      <div className='flex flex-wrap  justify-center lg:justify-start items-end  gap-3'>
        <div className='h-12 flex justify-center items-center'>
          <p className='text-[22px] font-semibold '>My Courses:</p>
        </div>

        <button
          className={`h-11  px-4 lg:px-7 text-[15px] lg:text-[18px] font-medium rounded-full
      ${allvalue ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
          onClick={() => {
            setAllValue(true);
            setFilterValue('');
          }}
        >
          All
        </button>

        <button
          className={`h-11 px-4 lg:px-7 text-[15px] lg:text-[18px] font-medium rounded-full
      ${!allvalue && filterValue === 'completed' ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
          onClick={() => {
            setAllValue(false);
            setFilterValue('completed');
          }}
        >
          Completed
        </button>

        <button
          className={`h-11 px-4 lg:px-7 text-[15px] lg:text-[18px] font-medium rounded-full
      ${!allvalue && filterValue === 'In Progress' ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
          onClick={() => {
            setAllValue(false);
            setFilterValue('In Progress');
          }}
        >
          In Progress
        </button>
        <button
          className={`h-11 px-4 lg:px-7 text-[15px] lg:text-[18px] font-medium rounded-full
      ${!allvalue && filterValue === 'Not Started' ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
          onClick={() => {
            setAllValue(false);
            setFilterValue('Not Started');
          }}
        >
          Not Started
        </button>
      </div>
      <div className='flex justify-center gap-8 mt-8 flex-wrap '>
        {finalData.length > 0 ? (
          finalData?.map((course) => (
            <>
              <div className="bg-white  sm:w-full  shadow h-fit rounded-lg p-3 flex lg:flex-nowrap flex-wrap gap-2 sm:gap-6 items-start  mx-auto ">
                {/* Course Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={course?.card_image}// Replace with the correct path
                    alt="Python Course"
                    width={425}
                    height={193}
                    className="rounded-lg w-full  mx-auto sm:mx-0 sm:w-[250px] min-h-[193px] xl:w-[375px]"
                  />
                </div>
                <div className="flex-grow  sm:w-1/2 lg:w-1/4 min-h-full">
                  <h2 className=" text-[17px] xl:text-[20px] font-bold mb-1">{course.course_name}</h2>
                  <p className="text-gray-600 mb-1  xl:mb-4">
                  {course.short_description}
                  </p>
                  <div className=" mb-1 xl:mb-4">
                    <div className='flex justify-between items-center'>

                    <span className="font-semibold text-[18px] text-black">Learning Progress</span>
                    <span className="font-bold text-[18px] text-orange">{Math.floor(course?.course_progress) ||0}%</span>
                    </div>
                    <div className="w-[85%] h-2 mt-2  bg-gray-200 rounded-full ">
                    <div className="h-2 bg-orange rounded-full" style={{ width: `${course.course_progress ||0}%` }}></div>
                    </div>
                  </div>
                  <Link href={`/dashboard/mycourses/${course?.course_slug}`} className="text-orange text-[15px] xl:text-[18px] flex  items-center gap-2  font-semibold ">
                    Continue Learning <BsArrowRight />
                  </Link>
                </div>
             
                <div className="border-t sm:border-t-0 lg:border-l w-full  sm:w-[45%]  lg:w-1/4 h-full pl-2 lg:pl-6">
                  <div className=" mt-2 sm:mt-0 lg:mt-2 mb-2">
                    <div className="text-lg flex items-center font-bold mr-1"> Rating: {renderStars(course?.rating)}</div>
                   
                    <br />
                    <div className="text-textGrey text-sm  -mt-6 ">({course?.review_count} reviews)</div>
                  </div>
                  <p className="text-black font-semibold">{course.course_level}</p>
                  <p className="text-textGrey mb-2">No prior experience required</p>
                  <p className="text-black font-semibold">{course?.duration} to complete</p>
                  <p>
                    <span className="font-semibold">Complition Status - </span>
                    <span className=" ">{course?.completion_status}</span>
                  </p>
                </div>
                <div className=" border-t sm:border-t-0 w-full sm:border-l sm:w-1/2  lg:w-1/4 mt-2  h-full  pl-2 lg:pl-6">
                <div className="text-textGrey text-[14px] xl:text-[16px] xl:gap-2 pt-2 sm:pt-0 flex flex-col justify-between">
                  <p>
                    Amount -  <span className="text-black ">{course.payment}</span>₹
                  </p>
                 <p>
                    Payment Date - <span className="text-black ">{course.order_date}</span>
                  </p>
                  <p>
                    Payment Status - 
                    <span className="text-orange font-bold capitalize">{course.payment_status}</span>
                  </p>
                  <p>
                    Access Expiry Date - <span className="text-black ">Life Time</span>
                  </p>
                  <p>
                    Discount - 
                    <span className="text-black ">{course?.discount_amount} </span>
                  </p>
                  <p>
                    Coupan Code- 
                    <span className="text-black ">{course?.discount_code ||'No coupan used'} </span>
                  </p>
                </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <p className='text-center text-textGrey'>No courses available.</p>
        )}
      </div>
     </div>
  );
}

export default MyCourses;
