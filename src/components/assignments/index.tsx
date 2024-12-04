"use client"
import React, { useState } from 'react'
import { IoCall } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import Link from 'next/link';
import { FiPaperclip } from "react-icons/fi";
import { BASE_URL } from '@/utils/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import { json } from 'stream/consumers';

const Support = () => {
  const [data, setdata] = useState({name:'',email:'',subject:'',message:"",phone_number:""})
  const submitdata = async () => {
    try {
      const response = await axios.post(`${BASE_URL}contact/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success('Message sent successfully');
    } catch (error: any) {
      console.error('Error submitting data:', error);
      toast.error('Try again');
    }
  };
 const handlechange=(e:any)=>{
   const dataTosent={...data ,[e.target.name]:e.target.value}
  setdata(dataTosent)
 }
 console.log(data)
  return (
    <div>
      <div className='flex justify-between
      '>
        <div className='w-[55%]'>
          <p className='fonnt-bold text-[22px] text-black'>Common Issues & Fixes</p>
          <div className='rounded-lg shadow-lg mt-5 border-[1px] border-slate-200 p-8'>
            <ol className='list-decimal'>
              <li className=' py-3  border-b-[1px] border-slate-200'>
                <p className='text-[17px] font-medium'>Course video won’t load  </p>
                <p className='text-[16px] text-textGrey'>Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, contact support.</p>
              </li>
              <li className=' py-3  border-b-[1px] border-slate-200'>
                <p className='text-[17px] font-medium'>Course video won’t load  </p>
                <p className='text-[16px] text-textGrey'>Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, contact support.</p>
              </li>
              <li className=' py-3  border-b-[1px] border-slate-200'>
                <p className='text-[17px] font-medium'>Course video won’t load  </p>
                <p className='text-[16px] text-textGrey'>Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, contact support.</p>
              </li>
            </ol>

          </div>
        </div>
        <div className='w-[40%]'>
          <p className='fonnt-bold text-[22px] text-black'>Common Issues & Fixes</p>
          <div className='rounded-lg shadow-lg mt-5 border-[1px] border-slate-200 p-8'>

            <div className='flex gap-3 text-medium items-center'>
              <div className='size-[40px] rounded-full bg-[#F24A2540] flex justify-center items-center text-textGrey'><IoCall className='text-orange text-[20px]' />
              </div>
              Call us at <span className='text-orange'>+1 (91) 123-4567</span> for direct support
            </div>
            <div className='flex items-start gap-3 mt-6 '>
              <div className='min-w-[40px] min-h-[40px] rounded-full bg-[#F24A2540] flex justify-center items-center text-textGrey'>
                <CiMail className='text-orange text-[22px]' />
              </div>

              <div className='text-medium'>

                Reach out to us at
                <span className='text-orange mx-[2px]'> <a href="mailto:">studilyft@Gmail.com</a></span> for detailed inquiries. We aim to respond within 24 hours.
                <div>
                  <Link href="mailto:">
                    <button className='px-8 py-3 rounded-md bg-orange text-white text-[18px] mt-4'>Email US</button>
                  </Link>
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>

      </div>
      <div className='mt-10 w-1/2'>
        <p className='text-[22px] font-semibold text-black'>Contact Us</p>
        <div className='border-[1px] p-8 border-slate-200 flex justify-between gap-7 shadow-lg rounded-lg'>
          <div className=' flex flex-wrap gap-6'>
            <div className=''>
              <label  className='text[17px] font-medium  text-black '>Full Name</label>
              <br />
              <input type="text" name='name' className='capitalize  text-textGrey mt-3 
              w-full woutline-none border-[2px] px-8 py-3 border-slate-200 rounded-lg ' required placeholder='Enter your full name' onChange={handlechange} />
            </div>
            <div>
              <label htmlFor="email" className='text[17px] font-medium text-black '>Email
                Address
              </label>
              <br />
              <input type="text" required name='email' className='capitalize mt-3 text-textGrey 
              outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                placeholder='Enter your Email' onChange={handlechange}/>
            </div>
      
            <div>
              <div>
                <label htmlFor="subject" className='text[17px] font-medium text-black '>Subject
                </label>
                <br />
                <input type="text" name='subject' className='capitalize mt-3 text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg ' 
                required placeholder='Enter your Subject'onChange={handlechange} />

              </div>

            </div>
            <div>
                <label className='text[17px] font-medium text-black '>Phone Number
                </label>
                <br />
                <input type="phone" name='phone_number' className='capitalize mt-3 text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg ' 
                required placeholder='Enter Your Phone no' onChange={handlechange} />

              </div>

            <div className='w-[87%]'>
              <label htmlFor="email" className='text[17px] font-medium text-black '>
                Message
              </label>
              <br />
              <textarea name='message' className='capitalize mt-3 text-textGrey w-full outline-none border-[2px] px-8 py-3 border-slate-200 rounded-lg ' required placeholder='Describe your
          MessIssues or Questions' onChange={handlechange}/>
            </div>
            <button className='px-7 mt-4 py-3 rounded-md bg-orange text-white text-[18px] font-medium' onClick={submitdata}>
            Submit Request
            </button>
          </div>
        
         
             
          
            {/* <div className=''>
              <label htmlFor="attachment" className='text-[17px] w-full font-medium text-black '>
                Attachment (Optional)
              </label>
              <br />
              <div className="custom-file-upload mt-3">
                <label
                  htmlFor="file-upload"
                  className='cursor-pointer bg-white border-[2px] border-slate-200 text-gray-500 px-8 py-3 rounded-lg inline-block'
                >
                  <div className='flex text-textGrey items-center justify-between'>

                    Attach file or screenshot <FiPaperclip className='text-orange ml-3 text-[18px]' />
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                />
              </div>
              <p className='text-[13px] text-textGrey mt-2'>PNG, JPEG, PDF</p>
            </div> */}
          
          </div>
        </div>
      </div>
  )
}

export default Support