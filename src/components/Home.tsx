'use client'
import Image from "next/image";
import Header from '@/components/header'
import Banner from '@/components/banner'
import Footer from '@/components/footer'
import PopularCourse from '@/components/popularCourse'
import Instructors from '@/components/instructors'
import ScrollingCards from '@/components/scrollingcards'
import Faq from '@/components/faq'
import Testimonial from '@/components/testimonial'
import { useEffect, useState } from "react";
import axios from 'axios';
import { motion } from 'framer-motion';
import { BASE_URL } from '@/utils/api'
import FooterBanner from '@/components/footerBanner'
import Link from "next/link";
import Script from 'next/script';
import Popup from '@/components/Popup'
export default function Home({data}:any) {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    // Set a timer to show the popup after 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  const [website_banner, setwebsite_banner] = useState()
  const [instructor, setinstructor] = useState()
  const [faq, setfaq] = useState()
  const [testimonial, settestimonial] = useState()
  const [courses, setcourses] = useState()
  const [Apidata, setApidata] = useState<any>()
  useEffect(() => {
    // fetchData();
    setApidata(data) 
    setwebsite_banner(data.website_banner[0])
    setinstructor(data.instructors)
    setfaq(data.faqs)
    settestimonial(data.testimonials)
    setcourses(data.courses)
    localStorage.setItem('banner-heading', data.website_banner[0].heading)
  }, []);
  return (
    <>
      {/* {
        !Apidata && <div className="min-h-[90vh] w-full flex justify-center items-center">
          <div className="loader"></div>
        </div> 
      } */}
      {
        <div>
          <Header />
          <Banner props={website_banner} />
          {
            showPopup && (
              <motion.div
                className="fixed md:bottom-10  p-4  z-50 bottom-4 right-4 md:right-10  bg-orange-500 text-white  bg-white rounded-lg shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Popup />
                <div className="flex items-center gap-4 mt-6">
                  <button className="bg-orange text-white py-2 px-6 rounded-full font-medium">
                    <Link href='/signup'>
                      Register Now
                    </Link>
                  </button>
                  <button className="text-orange font-bold underline" onClick={() => { setShowPopup(false) }}>Skip</button>
                </div>
              </motion.div>
            )
          }    <div className="center bg-lightGrey">
            <div className="flex flex-col px-4 py-14 gap-10">
              <h3 className="text-black text-[24px] md:text-4xl font-bold text-center">
                Master the Most In-Demand <span className="text-orange">Skills</span> <br /> of Today&apos;s Job Market
              </h3>
              <div className="flex flex-wrap  lg:flex-nowrap items-center justify-center gap-10 xl:gap-36">
                {
                  Apidata?.categories?.slice(0, 4).map((elem: any, index: any) => (
                    <div className="flex flex-col items-center gap-2 group">
                      <div className="rounded-full mx-auto w-[110px] h-[110px] flex justify-center items-center bg-white group-hover:bg-orange transition">
                        <Image
                          src={`/images/animation${index + 1}.svg`}
                          alt="Business & Entrepreneurship"
                          width={50}
                          height={50}
                          className="transition group-hover:brightness-0 group-hover:invert"
                        />
                      </div>
                      <h3 className="text-center text-base font-medium">{elem}</h3>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="px-4   mx-auto w-full lg:w-[95%] 2xl:w-[77%]
 flex flex-col mt-10 gap-10">
            <h3 className="text-[24px] md:text-4xl font-bold text-center lg:text-left">Popular <span className="text-orange">Courses</span> </h3>
            <PopularCourse course={courses} />
            <div className="center ">
              <Link href="/courses">
                <button className="w-40  px-4 py-2 bg-orange text-white rounded-full hover:scale-110 smooth3">
                  View All
                </button>
              </Link>
            </div>
          </div>
          <div className="px-6   mx-auto w-full lg:w-[95%] 2xl:w-[77%]
 flex flex-col lg:flex-row mb-10 mt-28">
            <div className="flex-1 items-center lg:items-start text-center lg:text-left mb-6  flex flex-col gap-4">
              <h3 className="text-[24px] md:text-4xl font-bold">
                Transform Your Future <br /> with <span className="text-orange">High-Skill</span> Courses at <br /> <span className="text-orange">Affordable Prices</span>
              </h3>
              <h3 className="text-gray-500 font-medium text-sm md:text-base">
                Elevate your career and personal growth by acquiring <br /> industry-relevant skills at a price that works for you.
              </h3>
              <Link href="/courses">
                <button className="w-40 px-4 py-2 bg-orange text-white rounded-full hover:scale-110 smooth3">
                  Explore
                </button>
              </Link>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex flex-wrap md:flex-nowrap justify-center  gap-5">
                <div className="flex flex-col py-4 px-6 h-[317px] w-full sm:w-[320px] xl:w-[336px] bg-lightGrey gap-4 hover:bg-orange smooth1 group rounded-lg">
                  <Image src={"/images/Group 1000004312.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
                  <h3 className="text-2xl text-black font-semibold group-hover:text-white">Boost Your Career Prospects</h3>
                  <p className="text-sm text-black font-medium group-hover:text-white">Gain the skills employers are actively seeking, giving you a competitive edge in today&apos;s job market.</p>
                </div>
                <div className="flex flex-col py-4 px-6 h-[317px] w-full sm:w-[320px] xl:w-[336px] bg-lightGrey gap-4 hover:bg-orange smooth1 group rounded-lg">
                  <Image src={"/images/Group 1000004313.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
                  <h3 className="text-2xl text-black font-semibold group-hover:text-white">Increase Your Earning Potential</h3>
                  <p className="text-sm text-black font-medium group-hover:text-white">Gain the expertise needed to secure higher-paying roles and promotions.</p>
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap justify-center  gap-5">
                <div className="flex flex-col py-4 px-6 h-[317px] w-full sm:w-[320px] xl:w-[336px] bg-lightGrey gap-4 hover:bg-orange smooth1 group rounded-lg">
                  <Image src={"/images/Group 1000004314.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
                  <h3 className="text-2xl text-black font-semibold group-hover:text-white">Enhance Your Personal Growth</h3>
                  <p className="text-sm text-black font-medium group-hover:text-white">Develop confidence and problem-solving skills that benefit both your career and life.</p>
                </div>
                <div className="flex flex-col py-4 px-6 h-[317px] w-full sm:w-[320px] xl:w-[336px] bg-lightGrey gap-4 hover:bg-orange smooth1 group rounded-lg">
                  <Image src={"/images/Group 1000004315.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
                  <h3 className="text-2xl text-black font-semibold group-hover:text-white">Get Certified and Build Credibility</h3>
                  <p className="text-sm text-black font-medium group-hover:text-white">Earn recognized certificates to showcase your expertise and boost your professional profile.</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex text-center flex-col gap-4 px-4 center bg-lightGrey pt-10 lg:pt-20">
            <h3 className="text-[24px] md:text-4xl font-bold">Meet Our <span className="text-orange">Expert Instructors</span>  </h3>
            <h3 className="text-sm text-gray-500 font-medium ">
              Learn from industry professionals who are passionate about sharing their knowledge and guiding you to success.
            </h3>
            <Instructors instructor={instructor} />
          </div>
          <div className=" xl:px-60 px-6 bg-orange flex py-[60px] h-fit flex-col md:flex-row ">
            <div className=" flex flex-1 flex-col gap-7 text-white">
              <h3 className=" text-[22px] md:text-2xl font-bold">Limited-Time Offer: </h3>
              <h3 className="text-[24px] md:text-4xl font-bold">Get 70% Off on Our Best- <br /> Selling Course!</h3>
              <h3 className="text-base">Upgrade your skills at a fraction of the price. Don&apos;t miss out on this <br /> exclusive offer!</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/15 px-2 py-1 rounded-md">• Flexible Learning</span>
                <span className="bg-white/15 px-2 py-1 rounded-md">• Expert Support</span>
                <span className="bg-white/15 px-2 py-1 rounded-md">• Certificate of Completion</span>
              </div>
              <h3 className="text-[22px] md:text-2xl font-bold">Didn't find the perfect course? </h3>
              <h3 className="text-base">No problem! Click here to explore more options <br /> tailored to your interests!</h3>
              <Link href={'/courses'}>
                <button className=" border border-white px-4 w-40 rounded-full py-2 hover:scale-110 smooth3">Explore More </button>
              </Link>
            </div>
            <div className=" md:flex flex-1 flex-col gap-4 overflow-x-auto scrollbarHidden hidden">
              <ScrollingCards course={courses} />
            </div>
          </div>
          <Faq faqs={faq} />
          <div className=" xl:px-60 bg-white text-center px-4  flex py-10 lg:py-[80px]  center flex-col gap-4">
            <h3 className="text-[24px] md:text-4xl font-bold">What <span className="text-orange">Studilyft Learners </span> Are Saying</h3>
            <h3 className="text-sm text-gray-500 font-medium text-center ">
              Real feedback from our satisfied students who transformed their <br />skills and careers!
            </h3>
            <Testimonial testimonials={testimonial} />
          </div>
          <FooterBanner />
          <Footer />
        </div>
      }
    </>
  );
}
