import React, { useEffect, useState, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CourseCard from '@/components/coursecard';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';

const OtherCourses = () => {
  const [programming, setProgramming] = useState<any>([]);
  const [marketing, setMarketing] = useState<any>([]);
  const [development, setDevelopment] = useState<any>([]);
  const [ppc, setPpc] = useState<any>([]);
  const [allcourse, setAllCourse] = useState<any>([]); // Initializing with an empty array
  const sliderRef1 = useRef<any>(null); // Reference for slider
  const sliderRef2 = useRef<any>(null); // Reference for slider
  const sliderRef3 = useRef<any>(null); // Reference for slider
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}courses/`);
      setAllCourse(response.data); // Populate the allcourse state with fetched data
    } catch (error: any) {
      console.log('all courses error', error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetch();
  }, []);

  // Filter courses when allcourse changes
  useEffect(() => {
    if (allcourse.length > 0) {
      setProgramming(
        allcourse.filter((elem: any) =>
          elem.category.toLowerCase().includes('programming')
        )
      );

      setMarketing(
        allcourse.filter((elem: any) =>
          elem.category.toLowerCase().includes('marketing')
        )
      );

      setDevelopment(
        allcourse.filter((elem: any) =>
          elem.category.toLowerCase().includes('development')
        )
      );

      setPpc(
        allcourse.filter((elem: any) =>
          elem.category.toLowerCase().includes('ppc')
        )
      );
    }
  }, [allcourse]); // Trigger filtering when allcourse is updated

  return (
    <div className='w-full'>
      <p className='text-[22px] text-black font-semibold mb-5 border-orange border-b-2 w-fit'>
        Courses For You
      </p>

      {/* Programming courses */}
      <div>
        <div className='flex justify-between gap-3 text-[30px] text-white items-center'>
          <div className=''>
            <p className='text-[22px]  font-semibold text-black'>
              Programming Language
            </p>
          </div>
          <div className='flex gap-3 justify-end'>
            <div
              className='w-[40px] h-[40px] bg-lightOrange hover:bg-orange active:bg-orange text-orange hover:text-white rounded-full flex justify-center items-center cursor-pointer'
              onClick={() => sliderRef1.current.slickPrev()}
            >
              <MdKeyboardArrowLeft />
            </div>
            <div
              className='w-[40px] h-[40px] bg-lightOrange rounded-full hover:bg-orange active:bg-orange text-orange hover:text-white flex justify-center items-center cursor-pointer'
              onClick={() => sliderRef1.current.slickNext()}
            >
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
        <Slider {...settings} ref={sliderRef1} className='slick-slider mb-10 mt-6'>
          {programming?.map((course: any) => (
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
        </Slider>
      </div>

      {/* Marketing courses */}
      <div>
        <div className='flex justify-between gap-3 text-[30px] text-white items-center'>
          <div>
            <p className='text-[22px] font-semibold text-black'>Digital Marketing</p>
          </div>
          <div className='flex gap-3 justify-end'>
            <div
              className='w-[40px] h-[40px] bg-lightOrange hover:bg-orange active:bg-orange text-orange hover:text-white rounded-full flex justify-center items-center cursor-pointer'
              onClick={() => sliderRef2.current.slickPrev()}
            >
              <MdKeyboardArrowLeft />
            </div>
            <div
              className='w-[40px] h-[40px] bg-lightOrange rounded-full hover:bg-orange text-orange hover:text-white active:bg-orange flex justify-center items-center cursor-pointer'
              onClick={() => sliderRef2.current.slickNext()}
            >
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
        <Slider {...settings} ref={sliderRef2} className='slick-slider mb-10 mt-6'>
          {marketing?.map((course: any) => (
            <CourseCard
              key={course.id}
              slug={course.slug}
              name={course.name}
              description={course.short_description}
              level={course.course_level}
              category={course.category || ''}
              id={course.id}
              text={'Enroll'}
            />
          ))}
        </Slider>
      </div>

      {/* PPC courses */}
      <div>
        <div className='flex justify-between gap-3 text-[30px] text-white items-center'>
          <div>
            <p className='text-[22px] font-semibold text-black'>PPC Ads</p>
          </div>
          <div className='flex gap-3 justify-end'>
            <div
              className='w-[40px] h-[40px] bg-lightOrange hover:bg-orange active:bg-orange rounded-full text-orange hover:text-white flex justify-center items-center cursor-pointer'
              onClick={() => sliderRef3.current.slickPrev()}
            >
              <MdKeyboardArrowLeft />
            </div>
            <div
              className='w-[40px] h-[40px] bg-lightOrange rounded-full hover:bg-orange active:bg-orange text-orange hover:text-white flex justify-center items-center cursor-pointer'
              onClick={() => sliderRef3.current.slickNext()}
            >
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
        <Slider {...settings} ref={sliderRef3} className='slick-slider mb-10 mt-6'>
          {ppc?.map((course: any) => (
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
        </Slider>
      </div>
    </div>
  );
};

export default OtherCourses;
