"use client"
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import Cookies from 'js-cookie';
import { RxCross1 } from "react-icons/rx";
import { useapi } from '@/helpers/apiContext';
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';
import CourseCard from '@/components/coursecard';
import Image from 'next/image'
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { FaCode, FaRegCircleCheck } from 'react-icons/fa6';
import { usePathname } from 'next/navigation'

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
  const { profile, fetch, discount, setdiscount } = useapi();
  const {courseid ,setcourseid }=useapi()
  const [apidata, setApiData] = useState<any>()
  const [data, setdata] = useState<any>();
  const [showremove, setshowremove] = useState<any>(false)
  // const pathname = usePathname()
  // const id = pathname.split('/').pop();

  const [updateddata, setupdateddata] = useState({
    course_id:'',
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
  const fetchData = async () => {
    try {
      console.log('courseid-----------------',courseid)
      const response = await axios.get(`${BASE_URL}courses/${courseid}/`);
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
    course_id:'',
    discount_code: '',
  })
  useEffect(() => {
    setApiData(profile)
  }, [profile]);

  useEffect(() => {
    if (apidata) {
      setupdateddata({
        course_id:data?.id || 0,
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
  }, [apidata ,data]);
  const changeValue = (event: any) => {
    const newdata = { ...updateddata, [event.target.name]: event.target.value }
    setupdateddata(newdata)
  }
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
      console.log('the order data',updateddata)
      const  { data: orderData } = await axios.post(`${BASE_URL}create-order/`,   { course_id: data?.id, discount_code: coupanData.discount_code },

        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { order_id, amount, currency, key, course_name } = orderData;

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
        handler: async (response:any) => {
          try {
            // Step 3: Call verify-payment API
            const verifyResponse = await axios.post(`${BASE_URL}verify-payment/`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              course_id: updateddata.course_id,
            });

            alert("Payment successful! You are enrolled in the course.");
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Your Name", // Customize with actual user data
          email: "your-email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
      toast.success('Enrolled successfully')
    }
     catch (error: any) {
      console.log('Error fetching data :', error);
      toast.error(error.message)
    }
    finally {
      fetch();
    }
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
    <div className='w-full flex  mt-[100px]  p-7'>
      <div className='w-full gap-3 lg:w-[95%] 2xl:w-[75%] mx-auto   flex flex-col lg:flex-row  justify-center  '>
        <div className=' p-4  flex-1 gap-5 border-[1px] flex flex-wrap border-slate-200 justify-center shadow-xl rounded-lg bg-white'>
          <div className=' w-full sm:w-[45%]'>
            <label htmlFor="first_name" className='text[17px] mb-3 font-medium text-black uppercase'>First Name</label>
            <br />
            <input
              type="text"
              value={updateddata.first_name}
              name='first_name'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Your Name'
              onChange={changeValue}
            />
          </div>
          <div className='w-full sm:w-[45%]'>
            <label htmlFor="last_name" className='text[17px] mb-3 font-medium text-black uppercase'>Last Name</label>
            <br />
            <input
              type="text"
              value={updateddata.last_name}
              name='last_name'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Your Name'
              onChange={changeValue}
            />
          </div>
          <div className='w-full sm:w-[45%]'>
                        <label htmlFor="phone" className='text[17px] mb-3 font-medium text-black uppercase'>Phone</label>
            <br />
            <input
              type="number"
              value={updateddata.phone}
              name='phone'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Your phone no'
              onChange={changeValue}
            />
          </div>
          <div className='w-full sm:w-[45%]'>
                        <label htmlFor="alternate_phone" className='text[17px] mb-3 font-medium text-black uppercase'>Alternate Phone</label>
            <br />
            <input
              type="number"
              value={updateddata.alternate_phone}
              name='alternate_phone'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter alternate phone no'
              onChange={changeValue}
            />
          </div>

          <div className='w-full sm:w-[45%]'>      
                  <label htmlFor="qualification" className='text[17px] mb-3 font-medium text-black uppercase'>Qualification</label>
            <br />
            <input
              type="text"
              value={updateddata.qualification}
              name='qualification'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Qualification'
              onChange={changeValue}
            />
          </div>
          <div className='w-full sm:w-[45%]'>
            <label htmlFor="profession" className='text[17px] mb-3 font-medium text-black uppercase'>Profession</label>
            <br />
            <input
              type="text"
              value={updateddata.profession}
              name='profession'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Your Profession'
              onChange={changeValue}
            />
          </div>
          <div className='w-full sm:w-[45%]'>
            <label htmlFor="gender" className='text[17px] mb-3 font-medium text-black uppercase'>Gender</label>
            <br />
            <input
              type="text"
              value={updateddata.gender}
              name='gender'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Gender'
              onChange={changeValue}
            />
          </div>

          <div className='w-full sm:w-[45%]'>
            <label htmlFor="course_interested" className='text[17px] mb-3 font-medium text-black uppercase'>Course Interested</label>
            <br />
            <input
              type="text"
              value={updateddata.course_interested}
              name='course_interested'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Interested Course'
              onChange={changeValue}
            />
          </div>

          <div className='w-full sm:w-[45%]'>
            <label htmlFor="date_of_birth" className='text[17px] mb-3 font-medium text-black uppercase'>Date of Birth</label>
            <br />
            <input
              type="text"
              value={updateddata.date_of_birth}
              name='date_of_birth'
              className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='yyyy-mm-dd'
              onChange={changeValue}
            />
          </div>

          <div className='w-full sm:w-[45%]'>
            <label htmlFor="goals" className='text[17px] mb-3 font-medium text-black uppercase'>Goals</label>
            <br />
            <input
              type="text"
              value={updateddata.goals}
              name='goals'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Goals'
              onChange={changeValue}
            />
          </div>

          <div className='w-full sm:w-[45%]'>
            <label htmlFor="extracurriculars" className='text[17px] mb-3 font-medium text-black uppercase'>Extracurriculars</label>
            <br />
            <input
              type="text"
              value={updateddata.extracurriculars}
              name='extracurriculars'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Extracurriculars'
              onChange={changeValue}
            />
          </div>

          <div className='w-full sm:w-[45%]'>
            <label htmlFor="address" className='text[17px] mb-3 font-medium text-black uppercase'>Address</label>
            <br />
            <input
              type="text"
              value={updateddata.address}
              name='address'
              className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter Address'
              onChange={changeValue}
            />
          </div>
          <div className='flex flex-col sm:flex-row  justify-between gap-3 sm:items-end w-full'>
            <div>
              <label htmlFor="address" className='text[17px] mb-3 font-medium text-black uppercase'>Apply Coupon Code</label>
              <br />
              <div className='flex gap-3 items-center'>
                <input
                  type="text"
                  value={coupanData.discount_code}
                  name='discount_code'
                  className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                  placeholder='Coupon code'
                  onChange={codeset}
                />
                {showremove && (
                  <button
                    onClick={() => {
                      setshowremove(false);
                      const data = { ...coupanData, ['discount_code']: '' }
                      setcoupanData(data)// Setting to false as it's already true
                      setdiscount(0);
                      // Resetting the discount
                    }}
                    className="bg-orange/70 text-white p-2 px-5 rounded-md hover:bg-lightOrange hover:text-orange text-[18px] font-semibold duration-150"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div>
            </div>
            
            <button
              onClick={ApplyCouponcode}
              className="bg-orange w-fit mx-auto sm:mx-0 text-white p-2 px-5 rounded-md hover:bg-lightOrange text-[18px] font-semibold hover:text-orange duration-150"
            >
              Apply
            </button>
          </div>

        </div>
        <div className='sm:w-[429px]  border-[1px] border-slate-200 mx-auto lg:mx-0 shadow-xl rounded-lg p-4'>
          <div className='border-b-[1px] w-full'>
            <p className='text-[22px]  w-full mb-2 uppercase  font-semibold'>Course Summary</p>
          </div>
          <div
            className=' justify-between 
             border-slate-200  my-2   group flex flex-col gap-2  smooth1 flex-1'
          >
            <Image src="/images/Frame 1116607704.svg" height={350} width={410} alt='te' className='mx-auto' />
            <h3 className='font-semibold text-black text-xl'>{data?.name}</h3>
            <h3 className='text-sm text-gray-500 font-medium'>
            {data?.short_description}
              </h3> {/* Updated to use character limit */}
            <div className='flex gap-2 flex-wrap'>
              <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center gap-2'>
                <MdOutlineBookmarkAdd className='text-orange text-xl' />
                <span className='text-sm text-gray-500 font-medium capitalize'>{data?.course_level}</span>
              </span>
              <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center gap-2'>
                <FaCode className='text-orange' />
                <span className='text-sm text-gray-500 font-medium capitalize'>{data?.category}</span>
              </span>
              <span className='bg-[#F8F8F8] p-1 rounded-full flex items-center gap-2'>
                <FaRegCircleCheck className='text-orange' />
                <span className='text-sm text-gray-500 font-medium capitalize'>Certificate</span>
              </span>
            </div>
          </div>
          <div className='border-b-[1px] mt-8 w-full'>
            <p className='text-[22px]  w-full mb-2 uppercase  font-semibold'>Your Order Details</p>
          </div>
          <div className='border-b-[1px]'>
            <div className="flex justify-between my-3 px-2">
              <p className='text-black font-medium text-[18px]'>Original Price</p>
              <p className='text-textGrey'>${data?.price}</p>
            </div>
            <div className="flex justify-between my-3 px-2">
              <p className='text-black font-medium text-[18px]'>Limited-Time Offer</p>
              <p className='text-textGrey'>${discount || 0}</p>
            </div>
            <div className="flex justify-between my-3 px-2">
              <p className='text-black font-medium text-[18px]'>Taxes</p>
              <p className='text-textGrey'>+$0</p>
            </div>
            <div className="flex justify-between my-3 px-2">
              <p className='text-black font-medium text-[18px]'>Final Price</p>
              <p className='text-textGrey'>{data?.price - discount}</p>
            </div>
          </div>
          <div className='flex justify-between px-3 mt-3'>
            <p className='text-[19px]   w-full mb-2 uppercase  font-semibold'>Payable Amount</p>
            <p className='text-orange text-[26px] font-bold'>${data?.price - discount}</p>
          </div>
          <div className='w-full px-3 mt-4'>
            <button
              onClick={createorder}
              className="bg-orange w-full text-white p-2 px-5 rounded-md hover:bg-lightOrange text-[18px] font-semibold hover:text-orange duration-150"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile


