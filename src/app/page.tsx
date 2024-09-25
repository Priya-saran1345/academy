import Image from "next/image";
import Header from '@/components/header'
import Banner from '@/components/banner'
import Footer from '@/components/footer'
import PopularCourse from '@/components/popularCourse'
import Instructors from '@/components/instructors'
import ScrollingCards from '@/components/scrollingcards'
import Faq from '@/components/faq'
import Testimonial from '@/components/testimonial'

export default function Home() {
  return (
<div className="">
<Header/>
<Banner/>

{/* Master the Most In-Demand */}
<div className="center bg-[#F8F8F8]">
  <div className="flex flex-col py-14 gap-10">
    <h3 className="text-black text-3xl md:text-4xl font-bold text-center">
      Master the Most In-Demand <span className="text-orange">Skills</span> <br /> of Today&apos;s Job Market
    </h3>
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-36">
      <div className="flex flex-col items-center gap-2">
        <Image src={"/images/Group 1000004309.svg"} alt="img" width={100} height={100} />
        <h3 className="text-center text-base font-medium">Technology & Coding</h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image src={"/images/Group 1000004310.svg"} alt="img" width={100} height={100} />
        <h3 className="text-center text-base font-medium">Digital Marketing</h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image src={"/images/Group 1000004259.svg"} alt="img" width={100} height={100} />
        <h3 className="text-center text-base font-medium">Data Science & Analytics</h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image src={"/images/Group 1000004311.svg"} alt="img" width={100} height={100} />
        <h3 className="text-center text-base font-medium">Business & Entrepreneurship</h3>
      </div>
    </div>
  </div>
</div>

{/* ends */}

{/* popular course */}
<div className=" xl:px-60 flex flex-col mt-10 gap-10">
<h3 className="text-4xl font-bold">Popular <span className="text-orange">Courses</span> </h3>
<PopularCourse />
<div className="center ">
<button className="w-40  px-4 py-2 bg-orange text-white rounded-full hover:scale-110 smooth3"> 
  View All
</button>
</div>
</div>
{/* ends */}

{/* Transform Your Future */}
<div className="px-6 md:xl:px-60 flex flex-col md:flex-row mb-10 mt-28">
  <div className="flex-1 flex flex-col gap-4">
    <h3 className="text-3xl md:text-4xl font-bold">
      Transform Your Future <br /> with <span className="text-orange">High-Skill</span> Courses at <br /> <span className="text-orange">Affordable Prices</span>
    </h3>
    <h3 className="text-gray-500 font-medium text-sm md:text-base">
      Elevate your career and personal growth by acquiring <br /> industry-relevant skills at a price that works for you.
    </h3>
    <button className="w-40 px-4 py-2 bg-orange text-white rounded-full hover:scale-110 smooth3">
      Explore
    </button>
  </div>

  <div className="flex-1 flex flex-col gap-5">
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex flex-col py-4 px-6 h-[317px] w-full md:w-[336px] bg-[#F8F8F8] gap-4 hover:bg-orange smooth1 group rounded-lg">
        <Image src={"/images/Group 1000004312.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
        <h3 className="text-2xl text-black font-semibold group-hover:text-white">Boost Your Career Prospects</h3>
        <p className="text-sm text-black font-medium group-hover:text-white">Gain the skills employers are actively seeking, giving you a competitive edge in today&apos;s job market.</p>
      </div>

      <div className="flex flex-col py-4 px-6 h-[317px] w-full md:w-[336px] bg-[#F8F8F8] gap-4 hover:bg-orange smooth1 group rounded-lg">
        <Image src={"/images/Group 1000004313.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
        <h3 className="text-2xl text-black font-semibold group-hover:text-white">Increase Your Earning Potential</h3>
        <p className="text-sm text-black font-medium group-hover:text-white">Gain the expertise needed to secure higher-paying roles and promotions.</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex flex-col py-4 px-6 h-[317px] w-full md:w-[336px] bg-[#F8F8F8] gap-4 hover:bg-orange smooth1 group rounded-lg">
        <Image src={"/images/Group 1000004314.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
        <h3 className="text-2xl text-black font-semibold group-hover:text-white">Enhance Your Personal Growth</h3>
        <p className="text-sm text-black font-medium group-hover:text-white">Develop confidence and problem-solving skills that benefit both your career and life.</p>
      </div>

      <div className="flex flex-col py-4 px-6 h-[317px] w-full md:w-[336px] bg-[#F8F8F8] gap-4 hover:bg-orange smooth1 group rounded-lg">
        <Image src={"/images/Group 1000004315.svg"} width={50} height={50} alt="" className="brightness-0 group-hover:brightness-110" />
        <h3 className="text-2xl text-black font-semibold group-hover:text-white">Get Certified and Build Credibility</h3>
        <p className="text-sm text-black font-medium group-hover:text-white">Earn recognized certificates to showcase your expertise and boost your professional profile.</p>
      </div>
    </div>
  </div>
</div>

{/* ends */}

{/* Meet Our Expert Instructors */}
<div className="xl:px-60 flex flex-col gap-4 center bg-[#F8F8F8] pt-20"> 
<h3 className="text-4xl font-bold">Meet Our <span className="text-orange">Expert Instructors</span>  </h3>
<h3 className="text-sm text-gray-500 font-medium ">
Learn from industry professionals who are passionate about sharing their knowledge and guiding you to success.
</h3>
<Instructors />
</div>
{/* ends */}

{/* Limited-Time Offer:  */}
<div className=" xl:px-60 bg-orange flex py-[60px] flex-col md:flex-row ">
  <div className=" flex flex-1 flex-col gap-4 text-white">
  <h3 className="text-2xl font-bold">Limited-Time Offer: </h3>
  <h3 className="text-4xl font-bold">Get 70% Off on Our Best- <br /> Selling Course!</h3>
  <h3 className="text-base">Upgrade your skills at a fraction of the price. Don&apos;t miss out on this <br /> exclusive offer!</h3>
  <div className="flex gap-2">
    <span className="bg-white/15 px-2 py-1 rounded-md">• Flexible Learning</span>
    <span className="bg-white/15 px-2 py-1 rounded-md">• Expert Support</span>
    <span className="bg-white/15 px-2 py-1 rounded-md">• Certificate of Completion</span>
  </div>
  <h3 className="text-2xl font-bold">Didn't find the perfect course? </h3>
  <h3 className="text-base">No problem! Click here to explore more options <br /> tailored to your interests!</h3>
  <button className=" border border-white px-4 w-40 rounded-full py-2 hover:scale-110 smooth3">Explore More </button>
  </div>



  <div className=" md:flex flex-1 flex-col gap-4 overflow-x-auto scrollbarHidden hidden">
    <ScrollingCards/>
  </div>
    
</div>
{/* ends */}


{/* faq */}
<div className=" xl:px-60 bg-[#F8F8F8] flex py-[80px]  center">
  <div className="center flex-col bg-white py-[69px]  w-5/6 gap-8 rounded-lg  shadow-md">
  <h3 className="text-4xl font-bold">Got <span className="text-orange">Questions</span>? We&apos;ve Got <span className="text-orange">Answers</span>!  </h3>
<Faq />
  </div>
</div>
{/* testimonial */}
<div className=" xl:px-60 bg-white flex py-[80px]  center flex-col gap-4">
<h3 className="text-4xl font-bold">What <span className="text-orange">Studilyft Learners </span> Are Saying</h3>
<h3 className="text-sm text-gray-500 font-medium text-center ">
Real feedback from our satisfied students who transformed their <br />skills and careers!
</h3>
<Testimonial/>
</div>
{/* ends */}
      <div className="xl:px-60 h-[499px] banner2 w-full">
        <div className=" flex gap-[20%] items-center  h-full">
          <div className="max-w-[30%]">
            <h3 className=" text-[53px]  text-white  font-semibold">Studilyft</h3>
            <h3 className=" text-sm text-white text-[16px] font-medium ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt earum eveniet delectusnde accusantium blanditiis magni iure natus. </h3>
          </div>
          <div className=" flex flex-col gap-4 items-center">
            <button className="w-fit bg-white center px-4 py-2 rounded-lg text-[20px] font-semibold text-orange">Start Your Free Trial by $0</button>
            <h3 className=" text-sm font-semibold text-white ">Join today ! Pay after 7 days </h3>
          </div>
        </div>
      </div>
<Footer/>
</div>
  );
}
