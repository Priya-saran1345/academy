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
import { BASE_URL } from '@/utils/api'
import FooterBanner from '@/components/footerBanner'
import Link from "next/link";
export default function Home() {

  const [website_banner, setwebsite_banner] = useState()
  const [instructor, setinstructor] = useState()
  const [faq, setfaq] = useState()
  const [testimonial, settestimonial] = useState()
  const [courses, setcourses] = useState()
  const [Apidata, setApidata] = useState()
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}home/`);
      const data = response.data;
      setApidata(data) // Assuming the response is structured correctly
      setwebsite_banner(data.website_banner[0])
      setinstructor(data.instructors)
      setfaq(data.faqs)
      settestimonial(data.testimonials)
      setcourses(data.courses)
      localStorage.setItem('banner-heading', data.website_banner[0].heading)
    } catch (error: any) {
      console.log('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {
        !Apidata && <div className="min-h-[90vh] w-full flex justify-center items-center">
          <div className="loader"></div>
        </div>

      }
      {
        Apidata &&
        <div>
          <Header />

          <Banner props={website_banner} />

          {/* Master the Most In-Demand */}
          <div className="center bg-lightGrey">
            <div className="flex flex-col px-4 py-14 gap-10">
              <h3 className="text-black text-3xl md:text-4xl font-bold text-center">
                Master the Most In-Demand <span className="text-orange">Skills</span> <br /> of Today&apos;s Job Market
              </h3>
              <div className="flex flex-wrap  lg:flex-nowrap items-center justify-center gap-10 md:gap-36">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="rounded-full mx-auto w-[110px] h-[110px] flex justify-center items-center bg-white group-hover:bg-orange transition">
                    <Image
                      src="/images/animation1.svg"
                      alt="Business & Entrepreneurship"
                      width={50}
                      height={50}
                      className="transition group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                  <h3 className="text-center text-base font-medium">Technology & Coding</h3>
                </div>
                <div className="flex flex-col group items-center gap-2">
                  <div className="rounded-full mx-auto w-[110px] h-[110px] flex justify-center items-center bg-white group-hover:bg-orange transition">
                    <Image
                      src="/images/animation2.svg"
                      alt="Business & Entrepreneurship"
                      width={50}
                      height={50}
                      className="transition group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                  <h3 className="text-center text-base font-medium">Digital Marketing</h3>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="rounded-full mx-auto w-[110px] h-[110px] flex justify-center items-center bg-white group-hover:bg-orange transition">
                    <Image src={"/images/animation3.svg"} alt="img" width={55} height={55} className="transition group-hover:brightness-0 group-hover:invert" />
                  </div>
                  <h3 className="text-center text-base font-medium">Data Science & Analytics</h3>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="rounded-full mx-auto w-[110px] h-[110px] flex justify-center items-center bg-white group-hover:bg-orange transition">
                    <Image
                      src="/images/animation4.svg"
                      alt="Business & Entrepreneurship"
                      width={50}
                      height={50}
                      className="transition group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                  <h3 className="text-center text-base font-medium">Business & Entrepreneurship</h3>
                </div>

              </div>
            </div>
          </div>
          {/* ends */}

          {/* popular course */}
          <div className="px-4 w-full  mx-auto xl:w-[77%] flex flex-col mt-10 gap-10">
            <h3 className="text-4xl font-bold text-center md:text-left">Popular <span className="text-orange">Courses</span> </h3>
            <PopularCourse course={courses} />
            <div className="center ">
              <Link href="/courses">
                <button className="w-40  px-4 py-2 bg-orange text-white rounded-full hover:scale-110 smooth3">
                  View All
                </button>
              </Link>
            </div>
          </div>
          {/* ends */}

          {/* Transform Your Future */}
          <div className="px-6  w-full  mx-auto xl:w-[77%] flex flex-col lg:flex-row mb-10 mt-28">
            <div className="flex-1 items-center lg:items-start text-center lg:text-left mb-6  flex flex-col gap-4">
              <h3 className="text-3xl md:text-4xl font-bold">
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

          {/* ends */}

          {/* Meet Our Expert Instructors */}
          <div className=" flex text-center flex-col gap-4 px-4 center bg-lightGrey pt-20">
            <h3 className="text-4xl font-bold">Meet Our <span className="text-orange">Expert Instructors</span>  </h3>
            <h3 className="text-sm text-gray-500 font-medium ">
              Learn from industry professionals who are passionate about sharing their knowledge and guiding you to success.
            </h3>
            <Instructors instructor={instructor} />
          </div>
          {/* ends */}

          {/* Limited-Time Offer:  */}
          <div className=" xl:px-60 px-6 bg-orange flex py-[60px] h-fit flex-col md:flex-row ">
            <div className=" flex flex-1 flex-col gap-7 text-white">
              <h3 className="text-2xl font-bold">Limited-Time Offer: </h3>
              <h3 className="text-4xl font-bold">Get 70% Off on Our Best- <br /> Selling Course!</h3>
              <h3 className="text-base">Upgrade your skills at a fraction of the price. Don&apos;t miss out on this <br /> exclusive offer!</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/15 px-2 py-1 rounded-md">• Flexible Learning</span>
                <span className="bg-white/15 px-2 py-1 rounded-md">• Expert Support</span>
                <span className="bg-white/15 px-2 py-1 rounded-md">• Certificate of Completion</span>
              </div>
              <h3 className="text-2xl font-bold">Didn't find the perfect course? </h3>
              <h3 className="text-base">No problem! Click here to explore more options <br /> tailored to your interests!</h3>
              <button className=" border border-white px-4 w-40 rounded-full py-2 hover:scale-110 smooth3">Explore More </button>
            </div>
            <div className=" md:flex flex-1 flex-col gap-4 overflow-x-auto scrollbarHidden hidden">
              <ScrollingCards course={courses} />
            </div>
          </div>
          {/* ends */}
              <Faq faqs={faq} />
          {/* testimonial */}
          <div className=" xl:px-60 bg-white text-center px-4  flex py-[80px]  center flex-col gap-4">
            <h3 className="text-4xl font-bold">What <span className="text-orange">Studilyft Learners </span> Are Saying</h3>
            <h3 className="text-sm text-gray-500 font-medium text-center ">
              Real feedback from our satisfied students who transformed their <br />skills and careers!
            </h3>
            <Testimonial testimonials={testimonial} />
          </div>
          {/* ends */}
          
          <FooterBanner />
          <Footer />
        </div>
      }

    </>
  );
}
