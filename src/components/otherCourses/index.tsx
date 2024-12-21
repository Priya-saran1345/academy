"use client";
import React, { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CourseCard from "@/components/coursecard";
import axios from "axios";
import { BASE_URL, BASE_URL_IMAGE } from "@/utils/api";
import { IoMdSearch } from "react-icons/io";

const OtherCourses = () => {
  const [allcourse, setAllCourse] = useState<Record<string, any[]>>({});
  const sliderRefs = useRef<{ [key: string]: React.RefObject<Slider> }>({});
  const [searched, setsearched] = useState<any[]>([]);
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
     
      {
        breakpoint: 1377,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 983,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 819,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 673,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 495,
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
      console.log("Fetched courses:", response.data);
    } catch (error: any) {
      console.log("All courses error", error.message);
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
    <div className="w-full relative p-4 lg:px-0 md:p-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <p className="text-[22px] text-black font-semibold mb-5 border-orange border-b-2 w-fit">
          Courses For You
        </p>
        <div className="flex items-center h-[38px] text-[16px] border-lightOrange border-[1px] rounded-md px-4 w-full md:w-fit">
          <input
            type="text"
            onChange={handleselect}
            placeholder="Search Here"
            className="border-none px-2 w-full outline-none placeholder:text-textGrey"
          />
          <IoMdSearch className="text-[24px] text-textGrey ml-2" />
        </div>
      </div>

      <div className="w-full flex gap-5 flex-wrap justify-center">
        {searched.map((course: any) => (
          <CourseCard
            key={course.id}
            slug={course.slug}
            name={course.name}
            text={"Go To Course"}
            // text1={"Enroll"}
            description={course.short_description}
            level={course.course_level}
            category={course.category || ""}
            id={course.id}
          />
        ))}
      </div>

      {Object.keys(allcourse).map((category: string) => {
        if (!sliderRefs.current[category]) {
          sliderRefs.current[category] = React.createRef();
        }
        return (
          <div key={category} className="my-6">
            <div className="flex flex-col md:flex-row  items-center gap-3">
              <p className="text-[22px] font-semibold text-black">{category}</p>
              <div className="flex gap-3 justify-center md:justify-end">
                <div
                  className="w-[40px] h-[40px] bg-lightOrange hover:bg-orange active:bg-orange text-orange hover:text-white rounded-full flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    sliderRefs.current[category]?.current?.slickPrev()
                  }
                >
                  <MdKeyboardArrowLeft className="text-[28px]" />
                </div>
                <div
                  className="w-[40px] h-[40px] bg-lightOrange rounded-full hover:bg-orange active:bg-orange text-orange hover:text-white flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    sliderRefs.current[category]?.current?.slickNext()
                  }
                > 
                  <MdKeyboardArrowRight className="text-[28px]" />
                </div>
              </div>
            </div>
            <Slider
              {...settings}
              ref={sliderRefs.current[category]}
              className="slick-slider overflow-x-hidden "
            >
              {allcourse[category]?.map((course: any) => (
                <div
                  key={course.id}
                  className="w-full  flex justify-center px-2"
                >
                  <CourseCard
                    slug={course.slug}
                    name={course.name}
                    image={`${BASE_URL_IMAGE}${course.card_image}`}
                    text={"Go To Course"}
                    link1={`courses/${course.slug}`}
                    // text1={"Enroll"}
                    // link={`dashboard/enroll`}
                    description={course.short_description}
                    level={course.course_level}
                    category={course.category || ""}
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
