"use client"
import { BASE_URL, BASE_URL_IMAGE } from '@/utils/api';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { BiEdit } from "react-icons/bi";
import Cookies from 'js-cookie';
import { RxCross1 } from "react-icons/rx";
import { useapi } from '@/helpers/apiContext';
import { FaStarHalfAlt, FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';
import CourseCard from '@/components/coursecard';
import Image from 'next/image'
import { MdOutlineBookmarkAdd, MdOutlineContactSupport } from 'react-icons/md';
import { FaArrowUpRightFromSquare, FaCode, FaRegCircleCheck, FaStar } from 'react-icons/fa6';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { LuBookOpen } from 'react-icons/lu';
import { BsBoxArrowRight } from 'react-icons/bs';

declare class Razorpay {
  constructor(options: RazorpayOptions);
  open(): void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  image?: string;
  order_id?: string;
  handler?: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  [key: string]: any; // Allow additional options
}
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }
}




const Profile = () => {
  const router = useRouter()
  const { profile, fetch, discount, setdiscount } = useapi();
  const [apidata, setApiData] = useState<any>()
  const [data, setdata] = useState<any>();
  const [showremove, setshowremove] = useState<any>(false)
  const [copied, setCopied] = useState(false);
  // Create a ref for the div
  const codeRef = useRef(null);
  const [discountCode, setdiscountCode] = useState<any>()
  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode).then(() => {
      setCopied(true);
      toast.success('Code Copied!')
      setTimeout(() => setCopied(false), 2000);
      // Update coupanData with the copied discount code and course_id
      const newdata = { ...coupanData, discount_code: discountCode };
      const data1 = { ...newdata, course_id: data?.id };
      setcoupanData(data1);
      // setshowremove(true)
    });
  };
  const fetch1 = async () => {
    try {
    
      const response = await axios.get(`${BASE_URL}active-discounts/`
    
    );
      console.log('my courses are ', response.data)
      setdiscountCode(response.data.code);
    } catch (error:any) {
      console.log("my courses error", error.message);
    }
  };
  useEffect(() => {
    fetch1();
  }, []);

  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
    // Add full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-orange " />);
    }
    // Add half star if there's a fractional part
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange " />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };
  const [updateddata, setupdateddata] = useState({
    course_id: '',
    username: '',
    email: '',
    address: '',
    alternate_phone: '',
    course_interested: '',
    date_of_birth: '',
    extracurriculars: '',
    first_name: '',
    gender: '',
    goals: '',
    last_name: '',
    phone: '',
    qualification: '',
    profession: '',
  })
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully');
    };
    script.onerror = () => {
      console.error('Razorpay SDK failed to load');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const fetchData = async () => {
    try {
      const courseId = localStorage.getItem('courseid');
      if (!courseId) {
        console.error('No course ID found in localStorage');
        return;
      }
      const response = await axios.get(`${BASE_URL}courses/${courseId}/`);
      console.log(response.data)
      setdata(response.data)
    } catch (error: any) {
      console.log('Error fetching data:', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])
  const [coupanData, setcoupanData] = useState<any>({
    course_id: '',
    discount_code: '',
  })
  useEffect(() => {
    setApiData(profile)
  }, [profile]);

  useEffect(() => {
    if (apidata) {
      setupdateddata({
        course_id: data?.id || 0,
        username: apidata.username || '',
        email: apidata.email || '',
        address: apidata.address || '',
        alternate_phone: apidata.alternate_phone || '',
        course_interested: apidata.course_interested || '',
        date_of_birth: apidata.date_of_birth || '',
        extracurriculars: apidata.extracurriculars || '',
        first_name: apidata.first_name || '',
        gender: apidata.gender || '',
        goals: apidata.goals || '',
        last_name: apidata.last_name || '',
        phone: apidata.phone || '',
        qualification: apidata.qualification || '',
        profession: apidata.profession || '',
      });
    }
  }, [apidata, data]);

  const codeset = (event: any) => {
    const newdata = { ...coupanData, [event.target.name]: event.target.value }
    const data1 = { ...newdata, ['course_id']: data?.id }
    setcoupanData(data1)
  }
  const createorder = async () => {
    try {
      const token = Cookies.get('login_access_token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const payload = {
        course_id: data?.id,
        discount_code:''
      };
      if (discount > 0) {
        payload.discount_code =coupanData.discount_code;
      }
      
      // console.log('the order data', updateddata)
      const { data: orderData } = await axios.post(`${BASE_URL}create-order/`,
        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      const { order_id, amount, currency, key, course_name } = orderData;
      toast.success('Order created successfully')
      if (!window.Razorpay) {
        toast.error('Razorpay SDK not loaded');
        return;
      }
      const options = {
        key, // Razorpay API key
        amount: amount * 100, // Amount in paise
        currency,
        name: "Course Enrollment",
        description: `Enroll in ${course_name}`,
        order_id, // Order ID from Razorpay
        handler: async (response: any) => {
          try {
            const verifyResponse = await axios.post(`${BASE_URL}verify-payment/`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              course_id: updateddata.course_id,
            },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            toast.success('Payment successful! You are enrolled in the course.')
            console.log('payment verification', verifyResponse)
            router.push('/thank-you')
          } catch (err) {
            toast.error("Payment verification failed. Please try again.");
            console.error("Payment verification failed:", err);

          }
        },
        prefill: {
          name: updateddata.username, // Customize with actual user data
          email: updateddata.email,
          contact: updateddata.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    }
    catch (error: any) {
      console.log('Error fetching data :', error);
      toast.error(error.message)
    }
    // finally {
    //   fetch();
    
    //   router.push('/thank-you')
    // }
  }
  const ApplyCouponcode = async (e: any) => {
    try {
      const token = Cookies.get('login_access_token');
      if (!token) {
        toast.error('Please login first')
        return;
      }
      const response = await axios.post(`${BASE_URL}apply-discount/`, coupanData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setdiscount(response.data.discount_amount)
      // console.log(response.data)
      setshowremove(true)
      toast.success('applied successfully')
    }
    catch (error: any) {
      console.log('Error fetching data :', error);
      toast.error(error.response.data.error)
    }
  }
  return (
    <div className='w-full flex p-4'>
      {/* uppr div  */}
      <div className='w-full  h-[85vh] gap-3 mx-auto  flex  flex-col lg:flex-row  justify-between  '>
        <div className='  h-fit w-full lg:w-[62%] flex-1 flex flex-col  md:flex-row   gap-3 mx-auto lg:mx-0 shadow rounded-lg py-2 px-4'>
          <div
            className=' 
             border-slate-200 w-full  md:w-1/2 md:max-w-[400px] flex-1 py-4 px-4 pr-5 md:border-r-1 group flex flex-col gap-2  smooth1 '
          >
            <Image src={`${BASE_URL_IMAGE}${data?.card_image}`} height={225} width={414} alt='' className='rounded-md'></Image>
            <h3 className='font-semibold text-black text-xl'>{data?.name}</h3>
            <h3 className='text-sm text-gray-500 font-medium'>
              {data?.short_description}
            </h3>
            <div className=' flex  items-center font-semibold text-black text-[16px]'>Price:<span className='text-orange'> Rs.{data?.price}</span></div>
            <div className=' flex  items-center font-semibold text-black text-[16px]'>Rating:{renderStars(data?.rating)}</div>
            <p className='text-sm text-gray-500 -mt-2 font-medium'>
              ( {data?.review_count}reviews)
            </p>
            <div className=' flex  items-center font-semibold text-black text-[16px]'>{data?.course_level
            } level</div>
            <p className='text-sm text-gray-500 -mt-2 font-medium'>
              No prior experience required            </p>
            <div className=' flex  items-center font-semibold text-black text-[16px]'>Payment Date -</div>
            <p className='text-sm text-gray-500 -mt-2 font-medium'>
              {data?.start_date
              }              </p>
            <div className=' flex  items-center font-semibold text-black text-[16px]'>Access Expiry Date  -</div>
            <p className='text-sm text-gray-500 -mt-2 font-medium'>
              {data?.start_date
              }              </p>
            <p className='font-semibold text-black text-[16px]'>{data?.duration} Days to complete</p>
            <p className='text-sm text-gray-500 -mt-2 font-medium'>
              3 weeks at 3 hours a week
            </p>
            <div className='text-slate-700 mt-3  group py-5 px-3
              bg-lightGrey  rounded-lg
              items-start gap-4'>
              <div className=' flex flex-wrap gap-2 justify-center sm:flex-nowrap'>
                <div className='min-w-[60px] h-[60px] border-[5px]  flex justify-center testimonial-img items-center rounded-full'>
                  <Image
                    src={`${BASE_URL_IMAGE}${data?.instructor_name?.profile_image}`}
                    width={54}
                    height={54}
                    className='rounded-full'
                    alt={''}
                  />
                </div>
                <div className='  '>
                  <p className='text-[16px]'>Name:&nbsp;&nbsp;
                    <span className='font-semibold'>{data?.instructor_name?.name}</span>
                  </p>
                  <p className='text-[16px]'>Expertise:&nbsp;&nbsp;
                    <span className='font-semibold'>{data?.instructor_name?.expertise
                    }</span>
                  </p>
                  <div className="flex items-center  gap-1">
                    Rating: {renderStars(data?.rating)}
                  </div>
                </div>
              </div>
              <p className='text-[14px] mt-4'>{data?.short_description}</p>
            </div>
          </div>
          <div className='flex flex-1 w-[100%]   md:w-1/2 justify-center'>
            <div className='w-full py-4'>
              <div>
                <div className='w-full  border-b-1 pb-2 border-slate-200'>

                  <label className='text-[20px]  font-semibold  text-black capitalize'>Apply Coupon Code</label>
                </div>
                <br />
                <div className='flex gap-3 border-slate-200 rounded-lg border-[2px] justify-between w-full items-center'>
                  <input
                    type="text"
                    value={coupanData.discount_code}
                    name='discount_code'
                    className='capitalize text-textGrey  border-none outline-none w-full  px-2 py-2 '
                    placeholder='Coupon code'
                    onChange={codeset}
                  />
                  {showremove && (
                    <button
                      onClick={() => {
                        setshowremove(false);
                        const data = { ...coupanData, ['discount_code']: '' }
                        setcoupanData(data)
                        setdiscount(0);

                      }}
                      className="bg-orange text-white p-2 px-5 rounded-r-md hover:bg-lightOrange hover:text-orange text-[18px] font-semibold duration-150"
                    >
                      Remove
                    </button>
                  )}
                  {
                    !showremove &&
                    <button
                      onClick={ApplyCouponcode}
                      disabled={!coupanData.discount_code.trim()}
                      className="bg-orange w-fit mx-auto disabled:bg-gray-300 disabled:text-gray-600 sm:mx-0
                   text-white p-2 px-5 rounded-r-md hover:bg-lightOrange text-[18px]
                   font-semibold hover:text-orange duration-150"
                    >
                      Apply
                    </button>
                  }
                </div>
              </div>
              <div className='border-b-[1px] mt-8 w-full'>
                <p className='text-[20px]  w-full mb-2 capitalize  font-semibold'>Your Order Details</p>
              </div>
              <div className='border-b-[1px]'>
                <div className="flex justify-between my-2 px-2">
                  <p className='text-black font-medium text-[18px]'>Total Amount</p>
                  <p className='text-textGrey'>Rs.{data?.price}</p>
                </div>
                <div className="flex justify-between my-2 px-2">
                  <p className='text-black font-medium text-[18px]'>Discount
                  </p>
                  <p className='text-textGrey'>Rs.{discount || 0}</p>
                </div>
                <div className="flex justify-between my-2 px-2">
                  <p className='text-black font-medium text-[18px]'>Final Price</p>
                  <p className='text-textGrey'> Rs.{data?.price - discount}</p>
                </div>
              </div>
              <div className='flex justify-between px-2 mt-3'>
                <p className='text-[19px]   w-full mb-2 capitalize  font-semibold'>Final Amount
                </p>
                <p className='text-orange text-[26px] font-bold'>Rs.{data?.price - discount}</p>
              </div>
              <div className='w-full flex justify-end px-2 mt-4'>
                <button
                  onClick={createorder}
                  className="bg-orange  text-white p-2 px-5 rounded-md hover:bg-lightOrange text-[18px] font-semibold hover:text-orange duration-150"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='shadow border-1 rounded-lg right-4   lg:max-w-[440px] lg:w-[32%]  flex-col sm:flex-row flex lg:flex-col 
        sm:items-center lg:justify-start flex-shrink p-4 sm:justify-between  gap-2 lg:gap-6  font-medium text-[17px] 
                text-slate-600  py-3 top-24 logout-div' >
          <Image src={'/images/checkout.svg'} height={243} width={430} alt='' className='mb-4 lg:w-[430px] w-full sm:w-[280px] '></Image>
          <div className='w-full'>
            <div className="w-full flex justify-start gap-5 items-center ">
              <div className="relative">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 flex justify-center items-center rounded-full"
                  style={{
                    background: `conic-gradient(#FF6B6B ${profile?.profile_completion_percentage || 0}%, #F5F5F5 0)`
                  }}
                >
                  <div className="relative rounded-full p-[4px] bg-white">
                    <div className="md:w-20  w-16  h-16 md:h-20 bg-[#9C9C9C] rounded-full flex items-center justify-center overflow-hidden">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-orange font-bold text-center mt-1">
                  {profile?.profile_completion_percentage || 0}%
                </p>
              </div>

              <div>
                <p className="font-bold text-black">
                  {profile?.first_name}&nbsp;{profile?.last_name}
                </p>
                <p className="text-sm text-textgrey">{profile?.email}</p>
                <div
                  className="text-orange flex gap-2 items-center cursor-pointer text-[14px]"
                  onClick={() => router.push('/dashboard/profile')}
                >
                  Complete Your Profile
                  <span className="text-orange">
                    <FaArrowUpRightFromSquare className="text-[10px]" />
                  </span>
                </div>
              </div>
            </div>

            <div className='w-full bg-orange-100  p-3 rounded-md '>
              <p className=' text-black font-bold text-[18px]  mb-2   mx-auto'>
                {
                  profile?.profile_completion_percentage == 100 ? 'Well done! Your profile is 100% complete.' : 'First Complete Your Profile to Avail this Offer'
                }
              </p>
              {/* {
                profile?.profile_completion_percentage == 100 && */}
                <div>
                  <p className=' text-start text-textGrey'>Use code:</p>
                  <div className="flex items-center gap-3 ">
                    <div
                      ref={codeRef}
                      className="border-dashed border-2 w-2/3  text-center border-orange bg-orange/5 bg-orange-100 text-orange font-bold py-1 px-4 rounded-md"
                    >
                      {discountCode}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="bg-orange/10 py-2 px-6 rounded-md text-orange font-medium flex items-center gap-1"
                    >
                      Copy
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5h9a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 018.25 4.5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 8.25v9a2.25 2.25 0 002.25 2.25h11.25"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              {/* } */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile