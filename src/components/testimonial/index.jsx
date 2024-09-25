"use client"
import React, { useState, useEffect } from 'react';

const testimonialsData = [
  // Sample data for demonstration; replace with your own testimonials
  ['Testimonial 1', 'Testimonial 2', 'Testimonial 3'],
  ['Testimonial 4', 'Testimonial 5', 'Testimonial 6'],
  ['Testimonial 7', 'Testimonial 8', 'Testimonial 9'],
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const totalSets = testimonialsData.length;

  const handleButtonClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSets);
    }, 5000); // Change set every 5 seconds

    return () => clearInterval(interval);
  }, [totalSets]);

  return (
    <>
      <div className='w-full flex gap-4 overflow-hidden'>
        {testimonialsData[currentIndex].map((testimonial, index) => (
          <div key={index} className='flex-1 h-[221px] bg-[#F8F8F8] hover:bg-orange hover:text-white rounded-lg flex items-center justify-center'>
            {testimonial}
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center gap-2 mt-4'>
        {Array.from({ length: totalSets }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`w-4 h-4 rounded-full ${currentIndex === index ? 'bg-orange' : 'bg-orange/50'}`}
          ></button>
        ))}
      </div>
    </>
  );
};

export default Testimonial;
