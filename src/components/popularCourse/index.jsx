import React from 'react';
import { useRouter } from 'next/navigation';
import CourseCard from '@/components/coursecard';

const PopularCourse = ({ course = [] }) => {
  const Router = useRouter();

  return (
    <div className='flex gap-5 flex-wrap center'>
      {course.map((elem) => {
        if (elem.id >= 4) { // Ensure elem.id is used
          return (
            <CourseCard
              key={elem.id} // Added key prop
              slug={elem.slug}
              name={elem.name}
              description={elem.short_description}
              level={elem.course_level}
              category={elem.category || ''}
              id={elem.id}
              text="View"
              link="enroll"
              text1={'Enroll'}
            />
          );
        }
        return null; // Prevent rendering anything when the condition is false
      })}
    </div>
  );
};

export default PopularCourse;
