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
  const [data, setData] = useState({ name: '', email: '', subject: '', message: '', phone_number: '' });
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '', phone_number: '' });

  // Regex for email and phone validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Adjust according to your requirements

  const validateForm = () => {
    let formErrors = { name: '', email: '', subject: '', message: '', phone_number: '' };
    let isValid = true;

    // Check if each field is empty
    if (!data.name) {
      formErrors.name = 'Full name is required.';
      isValid = false;
    }

    if (!data.email) {
      formErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      formErrors.email = 'Enter a valid email address.';
      isValid = false;
    }

    if (!data.subject) {
      formErrors.subject = 'Subject is required.';
      isValid = false;
    }

    if (!data.phone_number) {
      formErrors.phone_number = 'Phone number is required.';
      isValid = false;
    } else if (!phoneRegex.test(data.phone_number)) {
      formErrors.phone_number = 'Enter a valid phone number (10 digits).';
      isValid = false;
    }

    if (!data.message) {
      formErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submitData = async () => {
    if (!validateForm()) {
      return; // Stop the submission if validation fails
    }

    try {
      const response = await axios.post(`${BASE_URL}contact/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success('Message sent successfully');
      setData({ name: '', email: '', subject: '', message: '', phone_number: '' }); // Clear the form
    } catch (error: any) {
      console.error('Error submitting data:', error);
      toast.error('Try again');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

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
        <div className='flex flex-wrap gap-6'>
          <div>
            <label className='text-[17px] font-medium text-black'>Full Name</label>
            <br />
            <input
              type="text"
              name='name'
              className='capitalize text-textGrey mt-3 w-full outline-none border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              required
              placeholder='Enter your full name'
              onChange={handleChange}
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className='text-[17px] font-medium text-black'>Email Address</label>
            <br />
            <input
              type="text"
              required
              name='email'
              className='capitalize mt-3 text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              placeholder='Enter your Email'
              onChange={handleChange}
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="subject" className='text-[17px] font-medium text-black'>Subject</label>
            <br />
            <input
              type="text"
              name='subject'
              className='capitalize mt-3 text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              required
              placeholder='Enter your Subject'
              onChange={handleChange}
            />
            {errors.subject && <p className='text-red-500 text-sm'>{errors.subject}</p>}
          </div>

          <div>
            <label className='text-[17px] font-medium text-black'>Phone Number</label>
            <br />
            <input
              type="text"
              name='phone_number'
              className='capitalize mt-3 text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              required
              placeholder='Enter Your Phone no'
              onChange={handleChange}
            />
            {errors.phone_number && <p className='text-red-500 text-sm'>{errors.phone_number}</p>}
          </div>

          <div className='w-[87%]'>
            <label htmlFor="message" className='text-[17px] font-medium text-black'>Message</label>
            <br />
            <textarea
              name='message'
              className='capitalize mt-3 text-textGrey w-full outline-none border-[2px] px-8 py-3 border-slate-200 rounded-lg'
              required
              placeholder='Describe your issues or questions'
              onChange={handleChange}
            />
            {errors.message && <p className='text-red-500 text-sm'>{errors.message}</p>}
          </div>

          <button className='px-7 mt-4 py-3 rounded-md bg-orange text-white text-[18px] font-medium' onClick={submitData}>
            Submit Request
          </button>
        </div>
      </div>
    </div>
      </div>
  )
}

export default Support