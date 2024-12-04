"use client";
import React, { useEffect, useState } from 'react';
import { useapi } from '@/helpers/apiContext';
import CourseCard from "@/components/coursecard"
const MyCourses = () => {
  const { dashboard } = useapi();
  const [allvalue, setAllValue] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [apiData, setApiData] = useState({ purchased_courses: [] });
  const [finalData, setFinalData] = useState([]);

  
  useEffect(() => {
setApiData(dashboard)
  }, [dashboard]);


  useEffect(() => {
    if (apiData.purchased_courses.length > 0) {
      if (allvalue) {
        setFinalData(apiData.purchased_courses);
      } else {
        const filteredData = apiData.purchased_courses.filter((course) =>
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
    <div className='flex items-end  gap-3'>
  <div className='h-12 flex justify-center items-center'>
    <p className='text-[22px] font-semibold '>My Courses:</p>
  </div>

  <button
    className={`h-11   px-7 text-[18px] font-medium rounded-full
      ${allvalue ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
    onClick={() => {
      setAllValue(true);
      setFilterValue('');
    }}
  >
    All
  </button>

  <button
    className={`h-11  px-7 text-[18px] font-medium rounded-full
      ${!allvalue && filterValue === 'completed' ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
    onClick={() => {
      setAllValue(false);
      setFilterValue('completed');
    }}
  >
    Completed
  </button>

  <button
    className={`h-11  px-7 text-[18px] font-medium rounded-full
      ${!allvalue && filterValue === 'In Progress' ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
    onClick={() => {
      setAllValue(false);
      setFilterValue('In Progress');
    }}
  >
    In Progress
  </button>

  <button
    className={`h-11  px-7 text-[18px] font-medium rounded-full
      ${!allvalue && filterValue === 'not_started' ? 'bg-orange text-white' : 'bg-[#F24A2533] text-orange hover:bg-orange hover:text-white'}`}
    onClick={() => {
      setAllValue(false);
      setFilterValue('not_started');
    }}
  >
    Not Started
  </button>
</div>


      <div className='flex gap-8 mt-8 flex-wrap'>
        {finalData.length > 0 ? (
          finalData.map((course) => (
            <>
            <CourseCard slug={course.slug||''} name={course.course_name} description={course.short_description} level={course.completion_status} 
             category={course.instructor_name|| ''} id={course.id} text={"Start"} />

           
            </>
          ))
        ) : (
          <p className='text-center text-gray-500'>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
