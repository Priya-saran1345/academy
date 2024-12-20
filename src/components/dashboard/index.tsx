import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BarChart from "@/components/barChart/BarChart"
import Image from 'next/image';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useapi } from '@/helpers/apiContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
  const { dashboard } = useapi();
  const router = useRouter();
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [Apidata, setApidata] = useState<any>()
  const [purchased_courses, setpurchased_courses] = useState<any>()
  let purchasedCoursesLength = purchased_courses?.length ?? 0;
  let completedCourses = Apidata?.user_stats?.completed ?? 0;
  let gainercertificate = Apidata?.user_stats?.completed ?? 0;
  useEffect(() => {
    setApidata(dashboard)
    setpurchased_courses(dashboard?.purchased_courses)
  }, [dashboard]);

  console.log(Apidata)
  let data = [
    {
      label: "Label 2",
      value: completedCourses,  // Total purchased courses
      color: "#F24A25",
      // cutout: "50%",
    },
    {
      label: "Label 1",
      value: purchasedCoursesLength - completedCourses,  // Remaining courses
      color: "#F24A2540",
      // cutout: "50%",
    },
  ];
  const data2 = [
    {
      // label: "Label 2", // Completed certificates
      value: gainercertificate,
      color: "#F24A25",
    },
    {
      // label: "Label 1", // Remaining certificates
      value: purchasedCoursesLength - gainercertificate,
      color: "#F24A2540",
    },
  ];


  const options: any = {
    plugins: {
      responsive: true,
    },
    cutout: '80%',
    rotation: Math.PI,
    circumference: '270',
    // borderRadius: 10, // Add rounded corners to all segments
    // hoverBorderRadius: 10,
  };

  const finalData = {
    // labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 0,
        dataVisibility: new Array(data.length).fill(true),
        borderRadius: 10
      },
    ],
  };
  const finalData2 = {
    // labels: data2.map((item) => item.label), // Labels for the chart
    datasets: [
      {
        data: data2.map((item) => Math.round(item.value)), // Set the data values (make sure it's 'data', not 'data2')
        backgroundColor: data2.map((item) => item.color), // Set the background color
        borderColor: data2.map((item) => item.color), // Set the border color
        borderWidth: 0, // No borders for each segment
        borderRadius: 10, // You can customize the border radius if needed
      },
    ],
  };

  const data1 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'], // Days of the week
    datasets: [
      {
        label: 'last week', // First parameter
        data: [78, 19, 3, 5, 2, 3, 8], // Performance values for A
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for Performance A
      },
      {
        label: 'Current week', // Second parameter
        data: [6, 12, 9, 8, 5, 7, 10], // Performance values for B
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for Performance B
      },
    ],
  };
  return (


    <>

      {
        !Apidata && <div className="min-h-[90vh]  w-full flex justify-center items-center">
          <div className="loader"></div>
        </div>
      }
      {
        Apidata &&
        <div className=''>
          <div className=' flex flex-wrap  rounded-sm px-0 md:px-4 py-5 '>
            <div className='flex flex-col w-full md:w-[70%] xl:w-[60%]  gap-3'>
              <div>
                <p className='text-[22px] font-medium text-center sm:text-left text-black'>Progress Overview</p>
              </div>
              <div className='flex justify-center md:justify-start sm:justify-start flex-wrap  gap-2'>
                <div className='shadow py-4 rounded-xl flex flex-col gap-6 max-h-[355px] w-[80%]   min-h-[331px]  sm:w-[31%]'>
                  <p className='font-semibold text-center text-black'>Course Completed</p>
                  <Doughnut data={finalData} options={options} className='rotate-[224deg] w-[50%] mx-auto' />
                  <p className='text-center mt-[-130px]  text-[30px] font-medium text-black'>{Apidata?.user_stats.completed}/ {purchased_courses?.length ?? 0}</p>
                  <p className='text-center font-semibold'>Goal: {purchased_courses?.length ?? 0}</p>
                  {
                    purchased_courses?.length > 0 &&
                    <p className='text-textGrey text-center'>Almost there! Keep going!</p>
                  }
                </div>
                <div className='shadow  py-4 rounded-xl flex flex-col gap-6 max-h-[355px] w-[80%]   min-h-[331px]  sm:w-[31%]'>
                  <p className='font-semibold text-center text-black'>Course Not Started</p>
                  <Doughnut data={finalData} options={options} className='rotate-[224deg] w-[50%] mx-auto' />
                  <p className='text-center mt-[-130px]  text-[30px] font-medium text-black'>{Apidata?.user_stats.not_started}/{purchased_courses?.length ?? 0}</p>
                  <p className='text-center  font-semibold'>Goal: {purchased_courses?.length ?? 0}</p>
                  {
                    purchased_courses?.length > 0 &&
                    <p className='text-textGrey text-center'>Almost there! Keep going!</p>
                  }
                </div>
                <div className='shadow  py-4 rounded-xl flex flex-col gap-6 max-h-[355px] w-[80%]   min-h-[331px]  sm:w-[31%]'>
                  <p className='font-semibold text-center text-black'>Certificate Gained</p>
                  <Doughnut data={finalData2} options={options} className='rotate-[224deg] w-[50%] mx-auto' />
                  <p className='text-center mt-[-130px]  text-[30px] font-medium text-black'>{Apidata?.user_stats.completed}/{purchased_courses?.length ?? 0}</p>
                  <p className='text-center  font-semibold'>Goal: {purchased_courses?.length ?? 0} </p>
                  {
                    purchased_courses?.length > 0 &&
                    <p className='text-textGrey text-center'>Almost there! Keep going!</p>
                  }
                </div>
              </div>
            </div>
            <div className=' w-[90%] mx-auto md:mx-0 md:w-[30%] xl:w-[36%] '>
              <div>
                <p className='text-[22px] mt-8 md:mt-0 text-center md:text-start font-medium text-black'>Learning Progress</p>
              </div>
              <div className='shadow w-full rounded-2xl   h-[331px] mt-3 '>
                <BarChart />
              </div>
            </div>
          </div>
          {/* make the slider here */}
          <div className="px-6 w-full max-w-[1750px] min-w-[370px]">
            <p className="text-[22px] mb-3 my text-black font-semibold">Enrolled Courses</p>
            {/* <Slider {...settings}> */}
            <div className='flex w-full flex-wrap gap-4 justify-center lg:justify-start '>
              {purchased_courses?.map((course: any) => (
                <div
                  key={course.id}
                  className="px-2 w-full cursor-pointer sm:w-[45%] border pb-4 p-2 group duration-200 hover:bg-orange border-gray-200 rounded-xl lg:w-[30%] xl:w-[24%]"
                  onClick={() => {
                    router.push(`/dashboard/mycourses/${course?.course_slug}`);
                  }}
                >
                  <div className="w-full h-full group-hover:text-white flex gap-5 text-black">
                    <div className="w-[202px]">
                      <Image
                        src={course?.card_image}
                        alt="Business & Entrepreneurship"
                        width={202}
                        height={202}
                      // className="transition group-hover:brightness-0 group-hover:invert"
                      />
                    </div>
                    <div className="w-full pr-2">
                      <div className="flex w-full justify-between">
                        <p className="text-[17px] font-semibold">{course?.course_name}</p>
                        <FaArrowUpRightFromSquare className="font-normal ml-2 text-[16px]" />
                      </div>
                      {/* <p className="text-[14px]">
                        Total Amount:&nbsp;{course?.payment + course?.discount_amount}
                      </p>
                      <p className="text-[14px]">Status:&nbsp;{course?.completion_status}</p>
                      <p className="text-[14px]">Discount:&nbsp;{course?.discount_amount}</p>
                      <p className="text-[14px]">Payed Amount:&nbsp;{course?.payment}</p> */}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-md  group-hover:bg-white">
                    <div className="w-7/12 group-hover:bg-lightOrange bg-orange rounded-md h-full"></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* last cards */}
          <div className='flex flex-wrap   lg:flex-nowrap gap-6 mt-8 justify-center lg:justify-center '>
            <div className='bg-white pb-4 xl:pb-0 xl:min-h-[91px] xl:gap-3 w-[90%] sm:w-[47%] lg:w-[23%] flex xl:flex-row  flex-col justify-center items-center
         rounded-xl shadow border-[1px] border-slate-200'>
              <p className='text-orange text-[48px]  font-medium'>{Apidata?.user_stats.enroll_project}</p>
              <p className='text-[20px] font-medium'>Enrolled Courses</p>
            </div>
            <div className='bg-white pb-4 xl:pb-0 xl:min-h-[91px] xl:gap-3 w-[90%] sm:w-[47%] lg:w-[23%] flex xl:flex-row  flex-col justify-center items-center 
        rounded-xl shadow border-[1px] border-slate-200'>
              <p className='text-orange text-[48px] font-medium'>{Apidata?.user_stats.not_started}</p>
              <p className='text-[20px] font-medium'>Not Started Course</p>
            </div>
            <div className='bg-white pb-4 xl:pb-0 xl:min-h-[91px] xl:gap-3 w-[90%] sm:w-[47%] lg:w-[23%] flex xl:flex-row  flex-col justify-center items-center
         rounded-xl shadow border-[1px] border-slate-200'>
              <p className='text-orange text-[48px] font-medium'>{Apidata?.user_stats.ongoing}</p>
              <p className='text-[20px] font-medium'>Ongoing Courses</p>
            </div>
            <div className='bg-white pb-4 xl:pb-0 xl:min-h-[91px] xl:gap-3 w-[90%] sm:w-[47%] lg:w-[23%] flex xl:flex-row  flex-col justify-center items-center rounded-xl 
         shadow border-[1px] border-slate-200'>
              <p className='text-orange text-[48px] font-medium'>{Apidata?.user_stats.completed}</p>
              <p className='text-[20px] font-medium'>Completed Course</p>
            </div>
          </div>
        </div>
      }

    </>

  )
}

export default Dashboard