import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BarChart from "@/components/barChart/BarChart"
import Image from 'next/image';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useapi } from '@/helpers/apiContext';

const Dashboard = () => {
  const { dashboard } = useapi();
  
  ChartJS.register(ArcElement, Tooltip, Legend  );
  const [Apidata, setApidata] = useState<any>()
  const [purchased_courses, setpurchased_courses] = useState<any>()
  let purchasedCoursesLength = purchased_courses?.length ?? 0;
  let completedCourses = Apidata?.user_stats?.completed ?? 0;
  let gainercertificate=Apidata?.user_stats?.completed ?? 0;
  useEffect(() => {
    setApidata(dashboard)
    setpurchased_courses(dashboard?.purchased_courses)  
  }, [dashboard]);

  //data for pi chart
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
      !Apidata && <div className="min-h-[90vh] w-full flex justify-center items-center">
        <div className="loader"></div>
      </div>

    }
    {
      Apidata&&
      <div>
      <div className='w-full flex gap-8 rounded-sm px-6 py-5 '>
        <div className='flex flex-col gap-3'>
          <div>
            <p className='text-[22px] font-medium text-black'>Progress Overview</p>
          </div>

          <div className='flex  gap-2'>
            <div className='shadow-lg border-slate-200 py-3 border-[1px] rounded-lg flex flex-col gap-6  h-[331px] w-[271px]'>
              <p className='font-semibold text-center text-black'>Course Completed</p>
              <Doughnut data={finalData} options={options} className='rotate-[224deg] w-[70%] mx-auto' />
              <p className='text-center mt-[-130px]  text-[30px] font-medium text-black'>{Apidata?.user_stats.completed}/ {purchased_courses?.length ?? 0}</p>
              <p className='text-center font-semibold'>Goal: {purchased_courses?.length ?? 0}</p>
              <p className='text-textGrey text-center'>Almost there! Keep going!</p>
            </div>
            <div className='shadow-lg border-slate-200 py-3 border-[1px] rounded-lg flex flex-col gap-6  h-[331px] w-[271px]'>
              <p className='font-semibold text-center text-black'>Course Completed</p>
              <Doughnut data={finalData} options={options} className='rotate-[224deg] w-[70%] mx-auto' />
              <p className='text-center mt-[-130px]  text-[30px] font-medium text-black'>5/7</p>
              <p className='text-center  font-semibold'>Goal: 7</p>
              <p className='text-textGrey text-center'>Almost there! Keep going!</p>
            </div>
            <div className='shadow-lg border-slate-200 py-3 border-[1px] rounded-lg flex flex-col gap-6  h-[331px] w-[271px]'>
              <p className='font-semibold text-center text-black'>Certificate Gained</p>
              <Doughnut data={finalData2} options={options} className='rotate-[224deg] w-[70%] mx-auto' />
              <p className='text-center mt-[-130px]  text-[30px] font-medium text-black'>{Apidata?.user_stats.completed}/{purchased_courses?.length ?? 0}</p>
              <p className='text-center  font-semibold'>Goal: {purchased_courses?.length ?? 0} </p>
              <p className='text-textGrey text-center'>Almost there! Keep going!</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className='text-[22px] font-medium text-black'>Learning Progress</p>
          </div>
          <div className='w-[650px] border-[1px] border-slate-200 h-[331px] mt-3 '>
            <BarChart />
          </div>
        </div>
      </div>
      {/* make the slider here */}
      <div className='px-6'>
        <p className='text-[22px] text-black text-semibold'>Enrolled Courses</p>
        <div className='flex justify-start gap-4 overflow-x-auto w-full py-4'>
          {

           purchased_courses?.map((course:any)=>{
              return(
                <div className='min-w-[448px] h-[134px] hover:text-white  flex gap-5 text-black  rounded-xl p-2 bg-lightOrange hover:bg-orange'>
                <div className='w-[102px]'>
                  <Image
                    src="/images/laptop.png"
                    alt="Business & Entrepreneurship"
                    width={100}
                    height={100}
                    className="transition group-hover:brightness-0 group-hover:invert"
                  />
                </div>
                <div className='w-full pr-2'>
                  <div className='flex w-full justify-between'>
                    <p className='text-[17px] font-semibold'>{course?.course_name}</p>
                    <FaArrowUpRightFromSquare className='text-[22px]'/>
                  </div>
                  <p className='text-[14px]'>Status:&nbsp;{course?.completion_status}</p>
                  <p className='text-[14px]'>discount Amount:&nbsp; {course?.discount_amount}</p>
                  {/* <p className='text-[14px]'>7/10 modules</p> */}
                  <div className='w-full flex justify-end'>
                    {/* <p className='text-[14px]'>75% Complete</p> */}
                  </div>
                </div>
              </div>
              )
            })
          }
        
        </div>
      </div>
      {/* last cards */}
      <div className='flex flex-wrap  mt-8 justify-between pl-7'>
        <div className='bg-white min-h-[91px] gap-3 min-w-[311px] flex justify-center items-center rounded-3xl shadow-lg border-[1px] border-slate-200'>
          <p className='text-orange text-[48px] font-medium'>{Apidata?.user_stats.enroll_project}</p>
          <p className='text-[20px] font-medium'>Enrolled Courses</p>
        </div>
        <div className='bg-white min-h-[91px] gap-3 min-w-[311px] flex justify-center items-center rounded-3xl shadow-lg border-[1px] border-slate-200'>
          <p className='text-orange text-[48px] font-medium'>{Apidata?.user_stats.not_started}</p>
          <p className='text-[20px] font-medium'>Not Started Course</p>
        </div>
        <div className='bg-white min-h-[91px] gap-3 min-w-[311px] flex justify-center items-center rounded-3xl shadow-lg border-[1px] border-slate-200'>
          <p className='text-orange text-[48px] font-medium'>{Apidata?.user_stats.ongoing}</p>
          <p className='text-[20px] font-medium'>Ongoing Courses</p>
        </div>
        <div className='bg-white min-h-[91px] gap-3 min-w-[311px] flex justify-center items-center rounded-3xl shadow-lg border-[1px] border-slate-200'>
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