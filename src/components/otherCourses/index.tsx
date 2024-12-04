"use client"
import React, { useEffect, useState, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CourseCard from '@/components/coursecard';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { IoMdSearch } from "react-icons/io";

const OtherCourses = () => {
  const [allcourse, setAllCourse] = useState<Record<string, any[]>>({});
  const sliderRefs = useRef<{ [key: string]: React.RefObject<Slider> }>({}); // Define the sliderRefs as RefObjects
  const [searched, setsearched] = useState<any[]>([]);
  
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}courses/`);
      setAllCourse(response.data);
      console.log('Fetched courses:', response.data);
    } catch (error: any) {
      console.log('All courses error', error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleselect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase().trim();
  
    if (!searchValue) {
      setsearched([]);
      return;
    }
  
    let selectedData: any[] = [];
  
    Object.keys(allcourse).forEach((category: string) => {
      const items = allcourse[category];
  
      const filteredItems = items.filter((elem: any) => {
        return (
          elem?.category.toLowerCase().includes(searchValue) ||
          elem?.name.toLowerCase().includes(searchValue) ||
          elem?.short_description.toLowerCase().includes(searchValue)
        );
      });
  
      selectedData = [...selectedData, ...filteredItems];
    });
  
    setsearched(selectedData);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between mb-5'>
        <p className='text-[22px] text-black font-semibold mb-5 border-orange border-b-2 w-fit'>
          Courses For You
        </p>
        <div className='flex items-center h-[45px] text-[20px] border-lightOrange border-[1px] rounded-md px-4 w-fit'>
          <input
            type="text"
            onChange={handleselect}
            placeholder="Search Here"
            className='border-none px-2 w-[200px] outline-none placeholder:text-textGrey'
          />
          <IoMdSearch className='text-[24px] text-textGrey ml-2' />
        </div>
      </div>

      <div className='w-full flex gap-5 flex-wrap'>
        {searched.map((course: any) => (
          <CourseCard
            key={course.id}
            slug={course.slug}
            name={course.name}
            text={'Enroll'}
            description={course.short_description}
            level={course.course_level}
            category={course.category || ''}
            id={course.id}
          />
        ))}
      </div>

      {Object.keys(allcourse).map((category: string) => {
        if (!sliderRefs.current[category]) {
          sliderRefs.current[category] = React.createRef();
        }
        return (
          <div key={category}>
            <div className='flex justify-between gap-3 text-[30px] items-center'>
              <p className='text-[22px] font-semibold text-black'>{category}</p>
              <div className='flex gap-3 justify-end'>
                <div
                  className='w-[40px] h-[40px] bg-lightOrange hover:bg-orange active:bg-orange text-orange hover:text-white rounded-full flex justify-center items-center cursor-pointer'
                  onClick={() => sliderRefs.current[category]?.current?.slickPrev()}
                >
                  <MdKeyboardArrowLeft />
                </div>
                <div
                  className='w-[40px] h-[40px] bg-lightOrange rounded-full hover:bg-orange active:bg-orange text-orange hover:text-white flex justify-center items-center cursor-pointer'
                  onClick={() => sliderRefs.current[category]?.current?.slickNext()}
                >
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </div>
            <Slider
              {...settings}
              ref={sliderRefs.current[category]} // Correctly pass the ref
              className='slick-slider my-6'
            >
              {allcourse[category]?.map((course: any) => (
                <div key={course.id} className='w-full flex justify-center'>
                  <CourseCard
                    slug={course.slug}
                    name={course.name}
                    text={'View'}
                    text1={'Enroll'}
                    description={course.short_description}
                    level={course.course_level}
                    category={course.category || ''}
                    id={course.id}
                  />
                </div>
              ))}
            </Slider>
          </div>
        );
      })}


    </div>
  );
};
export default OtherCourses;
