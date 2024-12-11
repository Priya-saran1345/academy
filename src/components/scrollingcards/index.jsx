"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const ScrollingCards = ({course=[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardData = Array(4).fill({
    title: "Master Python Programming",
    description: "Enroll in our top-rated Python course and gain real-world coding skills.",
    price: "Originally $149, now just $99!",
    image: "/images/Group 1000004316.svg",
  });
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 450; // Width of one card
      let newIndex = currentIndex;

      if (direction === 'left' && currentIndex > 0) {
        newIndex--;
      } else if (direction === 'right' && currentIndex < cardData.length - 1) {
        newIndex++;
      }
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(newIndex); // Update the current index
    }
  };
  const handleCardClick = (index) => {
    const cardWidth = 450; // Width of one card
    const scrollPosition = index * cardWidth;
    scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setCurrentIndex(index); // Update the current index
  };
  return (
    <>
      <div className='w-full flex gap-4 scrollbarHidden overflow-x-auto' ref={scrollRef}>
        {course.map((elem,index) => (
          <div key={index} className='min-h-[544px] min-w-[450px] relative bg-white/20 p-4 rounded-xl flex flex-col justify-between gap-4 text-white hover:shadow-2xl group smooth1'>
            <Image  width={500} height={500} alt='' src={"/images/Frame 1116607704.svg"} className='  smooth3' />
            <h3 className='text-2xl font-bold'>{elem.name}</h3>
            <h3 className="text-base">{elem.short_description}</h3>
            <h3 className='text-lg font-semibold'>Originally Rs. {elem.price} , Go and check for discount</h3>
            <Link href={`/courses/${elem.slug}`}>
            <button className='px-4 py-2 rounded-lg w-40 bg-white text-orange hover:scale-105 smooth3'>Enroll Now</button>
            </Link>

            <div className=' bottom-2 flex'>
              <span className='text-sm mr-3 border-r pr-3'>{elem.course_level}</span>
              <span className='text-sm mr-3 border-r pr-3'>{elem.category}</span>
              <span className='text-sm'>Certificate</span>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-2 flex justify-between items-center'>
        <div className='flex gap-2'>
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)} 
              className={`border-2 w-10 ${currentIndex === index ? 'border-white' : 'border-white/20'}`}
            ></button>
          ))}
        </div>
        <div className='flex gap-2'>
          <div className='h-10 w-10 rounded-full bg-white/15 flex items-center justify-center cursor-pointer' onClick={() => handleScroll('left')}>
            <FaAngleLeft  className='text-white text-xl'/>
          </div>
          <div className='h-10 w-10 rounded-full bg-white/15 flex items-center justify-center cursor-pointer' onClick={() => handleScroll('right')}>
            <FaAngleRight className='text-white text-xl' />
          </div>
        </div>
      </div>
    </>
  );
}

export default ScrollingCards;
