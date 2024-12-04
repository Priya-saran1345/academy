
"use client";
import { useState } from 'react';
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';

import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"
const ResetPasswordPage = ({ params }: { params: { id: string; token: string } }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  // const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e: any) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `http://192.168.211.41:8000/api/reset-password/${params.id}/${params.token}/`,
        {
          password: newPassword,
          password_confirm: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Log the response
      console.log("Reset password response:", response.data);
      toast.success('Password reset successfully');
      router.push('/login')
    } catch (error: any) {
      console.error("Reset password failed", error.response ? error.response.data : error.message);
      toast.error(`${error.response.data.error}`);
    }
  };
  return (
    <>
      <Header />
      <div className='flex h-screen flex-col lg:flex-row   px-6 w-full  mx-auto xl:w-[77%]'>
        <div className='flex-1 center flex-col gap-4 mt-28  '>
          <Image src="/images/Browk Shop.svg" alt="logo" width={180} height={180} className='' />
          <h3 className='text-base text-center text-gray-500 '>Sign in now and dive into a world of endless <br /> learning opportunities.</h3>
          <Image src="/images/Group 1000004450.svg" alt="logo" width={480} height={480} className='hidden lg:flex' />
        </div>
        <div className='flex-1 relative center'>
          <div className='h-[440px] sm:h-[536px] border-t-[.5px] border-slate-100 rounded-lg w-[663px] bg-white shadow-xl lg:mt-28 px-7 sm:px-20 py-10 sm:py-20 flex-col gap-8'>
            <h3 className='text-xl font-semibold text-start mb-6'>Reset Password</h3>
            <div className='flex flex-col gap-8 items-start justify-start'>

              <div className="wave-group">
                <input
                  type="password"
                  value={newPassword}
                  className="input"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span className="bar"></span>
                <label className="label">
                  {['N', 'e', 'w', 'P', 'a', 's', 's', 'w', 'o', 'r', 'd'].map((char, index) => (
                    <span className="label-char" key={index} >
                      {char}
                    </span>
                  ))}
                </label>

              </div>
              <div className="wave-group">
                <input
                  type="password"
                  value={confirmPassword}
                  className="input"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="bar"></span>
                <label className="label">
                  {['C', 'o', 'n', 'f', 'i', 'r', 'm', 'P', 'a', 's', 's', 'w', 'o', 'r', 'd'].map((char, index) => (
                    <span className="label-char" key={index} >
                      {char}
                    </span>
                  ))}
                </label>

              </div>
              {message && <p>{message}</p>}
              <button className='rounded-lg bg-orange text-white py-2 w-full hover:bg-white hover:scale-105 hover:text-orange border border-orange
                         hover:border-orange smooth3' onClick={handleResetPassword}>
                Reset                        </button>

            </div>
          </div>

        </div>
      </div>
      <div className=" px-6 lg:px-[10%] xl:px-[12%] h-[499px] py-16 sm:py-0 banner2 w-full">
        <div className=" flex flex-wrap sm:flex-nowrap sm:gap-[20%]  justify-center sm:justify-start items-center  h-full">
          <div className="sm:max-w-[30%] text-center sm:text-left">
            <h3 className=" text-[53px]  text-white  font-semibold">Studilyft</h3>
            <h3 className=" text-sm text-white text-[16px] font-medium ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt earum eveniet delectusnde accusantium blanditiis magni iure natus. </h3>
          </div>
          <div className=" flex flex-col gap-4 items-center">
            <button className="w-fit bg-white center px-4 py-2 rounded-lg text-[20px] font-semibold text-orange">Start Your Free Trial by $0</button>
            <h3 className=" text-sm font-semibold text-white ">Join today ! Pay after 7 days </h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ResetPasswordPage;
