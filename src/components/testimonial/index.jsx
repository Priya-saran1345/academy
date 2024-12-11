"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BASE_URL_IMAGE } from '@/utils/api';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Testimonial = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSets = testimonials.length;
  const scrollStep = 370; // Set scroll step to 350px
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalSets * 2));
    }, 5000); // Change set every 6 seconds
    return () => clearInterval(interval);
  }, [totalSets]);
  // To create a smooth continuous scrolling effect
  const visibleTestimonials = [...testimonials, ...testimonials];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
    // Add full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-orange group-hover:text-white" />);
    }
    // Add half star if there's a fractional part
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange group-hover:text-white" />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };
 
  return (
    <>
      <div className='w-full overflow-hidden'>
        <div
          ref={containerRef}
          className='flex gap-5 transition-transform ease-in-out duration-500'
          style={{
            transform: `translateX(-${(currentIndex * scrollStep)}px)`,
            width: `${visibleTestimonials.length * 350}px`, // Total width of the visible area
          }}
        >
          {visibleTestimonials.map((elem, index) => (
            <div key={index} className='text-slate-700 min-w-[350px] md:min-w-[470px] group min-h-[221px] 
              bg-lightGrey  hover:bg-orange p-5 hover:text-white rounded-lg
              flex flex-wrap justify-center sm:flex-nowrap items-start gap-4'>
              <div className='min-w-[60px] h-[60px] border-[5px] group-hover:border-red-300 flex justify-center testimonial-img items-center rounded-full'>
                <Image
                  src={`${BASE_URL_IMAGE}${elem.profile_image}`}  
                  width={54}
                  height={54}
                  className='rounded-full'
                  alt={elem.author_name}
                />
              </div>
              <div className=' text-center md:text-left'>
                <p className='text-[16px]'>Name:&nbsp;&nbsp;
                  <span className='font-semibold'>{elem.author_name}</span>
                </p>
                <p className='text-[16px]'>Course:&nbsp;&nbsp;
                  <span className='font-semibold'>{elem.author_position}</span>
                </p>
                <p className="flex items-center  gap-1">
                  Rating: {renderStars(elem.rating)}
                </p>
                <p className='text-[14px] mt-4'>{elem.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex justify-center gap-2 mt-4'>
        {Array.from({ length: totalSets }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex % totalSets === index ? 'bg-orange' : 'bg-orange/50'}`}
          ></button>
        ))}
      </div>
    </>
  );
};

export default Testimonial;
