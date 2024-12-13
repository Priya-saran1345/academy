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
const MyCourses = () => {
  const [allvalue, setAllValue] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [apiData, setApiData] = useState();
  const [finalData, setFinalData] = useState([]);

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
      <div className='flex justify-center  gap-8 mt-8 flex-wrap'>
        {finalData.length > 0 ? (
          finalData.map((course) => (
            <>
              {/* <CourseCard slug={course.slug||''} image={course.card_image} name={course.course_name}
             description={course.short_description} level={course.completion_status} 
             category={course.instructor_name|| ''} id={course.id} text={"Start"} link1={`dashboard/mycourses/${course.course_slug}`} /> */}
              <div className="bg-white shadow rounded-lg p-3 flex gap-6 items-start w-full mx-auto ">
                {/* Course Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={course?.card_image}// Replace with the correct path
                    alt="Python Course"
                    width={325}
                    height={193}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex-grow min-h-full">
                  <h2 className="text-[20px] font-bold mb-1">{course.course_name}</h2>
                  <p className="text-gray-600 mb-4">
                  {course.short_description}
                  </p>
                  {/* Learning Progress */}
                  <div className="mb-4">
                    <span className="font-semibold text-[18px] text-black">Learning Progress</span>
                    <div className="w-[90%] h-2 mt-2  bg-gray-200 rounded-full ">
                      <div className="h-2 bg-orange rounded-full w-2/3"></div> {/* 25% progress */}
                    </div>
                  </div>
                  {/* Continue Learning Link */}
                  <Link href={`/dashboard/mycourses/${course.course_slug}`} className="text-orange text-[18px] flex  items-center gap-2  font-semibold ">
                    Continue Learning <BsArrowRight />
                  </Link>
                </div>

                {/* Course Info */}
                <div className="border-l  w-1/4 h-full 
                 pl-6">
                  <div className="flex items-center mt-2 mb-2">
                    <span className="text-lg font-bold mr-1">4.7</span>
                    <FaStar className="text-orange" />
                    <br />
                    <span className="text-textGrey text-sm ml-2">(3,915 reviews)</span>
                  </div>
                  <p className="text-black font-semibold">Beginner level</p>
                  <p className="text-textGrey mb-2">No prior experience required</p>

                  <p className="text-black font-semibold">10 hours to complete</p>
                  <p className="text-textGrey mb-4">3 weeks at 3 hours a week</p>
                </div>
                <div className="border-l   w-1/4 mt-2  h-full  pl-6">
                <div className="text-textGrey gap-2 flex flex-col justify-between">
                  <p>
                    <span className="font-semibold">Amount - </span>₹{course.payment}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Date - </span>{course.order_date}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status - </span>
                    <span className="text-orange font-bold">{course.payment_status}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Access Expiry Date - </span>Dec 8, 2025
                  </p>
                  <p>
                    <span className="font-semibold">Discount - </span>
                    <span className=" ">{course.discount_amount}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Coupan Code- </span>
                    <span className=" ">{course.discount_code}</span>
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
