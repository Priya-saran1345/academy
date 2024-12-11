"use client"
import Footer from '@/components/footer';
import Header from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { BASE_URL } from '@/utils/api'
import axios from 'axios'
import { useRouter } from "next/navigation"
import FooterBanner from '@/components/footerBanner';
const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [forgetmail, setforgetmail] = useState()
    const [showform, setshowform] = useState(true)
    const areTokensPresent = () => {
        const accessToken = Cookies.get('login_access_token');
        const refreshToken = Cookies.get('login_refresh_token');
        return !!accessToken && !!refreshToken; 
      };
      
// code for login
const handleLogin = async (e) => {
  e.preventDefault(); 
  try {
    const response = await axios.post(`${BASE_URL}login/`, {
      email: email,
      password: password,
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    // Log the response
    console.log("Login response:", response.data);
    Cookies.set('login_access_token', response.data.access, {
      expires: 1/24, // valid for 1 day
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    Cookies.set('login_refresh_token', response.data.refresh, {
      expires: 1, // valid for 1 days
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    if (areTokensPresent()) {
      toast.success("Login successful");
      router.push("/dashboard")
      window.location.reload();
    } else {
      toast.error("Error: Tokens are missing in localStorage.");
    }
  } catch (error) {
    console.error("Login failed", error.response ? error.response.data : error.message);
    toast.error(`${error.response.data.error}`);
  }
};

// code for forget password
const  handleForgetPassword= async()=>{
  // e.preventDefault(); 
  try {
    const response = await axios.post(`${BASE_URL}forgot-password/`, {
      email: forgetmail,
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    // Log the response
    console.log("Login response:", response.data);
    toast.success("link sent to your mail");
    setshowform(true)
          router.push("/login")

  } catch (error) {
    console.error("Password reset failed", error.response ? error.response.data : error.message);
    toast.error(`${error.response.data.error} `);
  }

}
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email is required.";
        if (!emailRegex.test(value)) return "Email is invalid.";
        return "";
    };

    const validatePassword = (value) => {
        if (!value) return "Password is required.";
        if (value.length < 6) return "At least 6 characters.";
        return "";
    };

    const handleInputChange = (setter, validator, field) => (e) => {
        const value = e.target.value;
        setter(value);
        setErrors((prev) => ({ ...prev, [field]: validator(value) }));
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <Header />
            <div className='flex h-screen flex-col lg:flex-row   px-6  mx-auto w-full lg:w-[95%] 2xl:w-[77%]'>
                <div className='flex-1 center flex-col gap-4 mt-28  '>
                    {/* <Image src="/images/Browk Shop.svg" alt="logo" width={180} height={180} className='' /> */}
                    <h3 className='text-base text-center text-gray-500 '>Sign in now and dive into a world of endless <br /> learning opportunities.</h3>
                    <Image src="/images/Group 1000004450.svg" alt="logo" width={480} height={480} className='hidden lg:flex' />
                </div>
                <div className='flex-1 relative center'>
                  {
                    showform && <div className='h-[440px] sm:h-[536px] border-t-[.5px] border-slate-100 rounded-lg xl:w-[663px]
                     bg-white shadow-xl lg:mt-28 px-7 sm:px-20 py-10 sm:py-20 flex-col gap-8'>
                    <h3 className='text-xl font-semibold text-start mb-6'>Log In</h3>
                    <div className='flex flex-col gap-8 items-start justify-start'>
                        <div className="wave-group">
                            <input
                                required
                                type="text"
                                className="input"
                                value={email}
                                onChange={handleInputChange(setEmail, validateEmail, 'email')}
                                autoComplete="off"
                            />
                            <span className="bar"></span>
                            <label className="label">
                                {['E', 'm', 'a', 'i', 'l', '\u00A0', 'A', 'd', 'd', 'r', 'e', 's', 's'].map((char, index) => (
                                    <span className="label-char" key={index} style={{ '--index': index }}>
                                        {char}
                                    </span>
                                ))}
                            </label>
                            {errors.email && <p className="error text-red-500 ">{errors.email}</p>}
                        </div>

                        <div className="wave-group">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                className="input"
                                value={password}
                                onChange={handleInputChange(setPassword, validatePassword, 'password')}
                                autoComplete="off"
                            />
                            <span className="bar"></span>
                            <label className="label">
                                {['P', 'a', 's', 's', 'w', 'o', 'r', 'd'].map((char, index) => (
                                    <span className="label-char" key={index} style={{ '--index': index }}>
                                        {char}
                                    </span>
                                ))}
                            </label>
                            {errors.password && <p className="error text-red-500 ">{errors.password}</p>}
                            <button
                                type="button"
                                onClick={handlePasswordToggle}
                                className="text-blue-500 hover:text-blue-800 mt-2 text-sm"
                            >
                                {showPassword ? "Hide" : "Show"} Password
                            </button>
                        </div>
                        <button className='rounded-lg bg-orange text-white py-2 w-full hover:bg-white hover:scale-105 hover:text-orange border border-orange
                         hover:border-orange smooth3' onClick={handleLogin}>
                            Log In
                        </button>
                        <div className='flex justify-between gap-5 flex-wrap font-semibold'>
                        <button  className='text-orange ml-2 underlineHover' onClick={()=>setshowform(!showform)}> <p>Forget Password</p></button>
                        <h3 className='text-base text-center font-medium  text-gray-500 flex items-center  justify-center ' >Don&apos;t have an account ? <a href='/signup'
                         className='text-orange ml-2 underlineHover'>Signup</a></h3>
                         </div>
                    </div>
                </div>
                  }
                    
                    {/* forget password form */}
                    {
                      !showform&& <div className='shadow-lg  w-[563px] rounded-lg py-16 px-12 absolute '>
                      <div className='text-center'>
                      <p className='text-[22px]  font-semibold my-3 '>Find Your Account </p>
                      </div>
                      <p className='text-center font-medium mb-5 text-slate-400 text-[17px]'>Please enter your email address or mobile number to search for your account.</p>
                      <div className="wave-group">
                                <input
                                    required
                                    type="text"
                                    className="input"
                                    value={forgetmail}
                                    onChange={handleInputChange(setforgetmail, validateEmail, 'email')}
                                    autoComplete="off"
                                />
                                <span className="bar"></span>
                                <label className="label">
                                    {['E', 'm', 'a', 'i', 'l', '\u00A0', 'A', 'd', 'd', 'r', 'e', 's', 's'].map((char, index) => (
                                        <span className="label-char" key={index} style={{ '--index': index }}>
                                            {char}
                                        </span>
                                    ))}
                                </label>
                                {errors.email && <p className="error text-red-500 ">{errors.email}</p>}
                            </div> 
                            <div className='flex gap-6 mt-8 justify-end'>
                            <button className='rounded-lg bg-orange text-white py-2 px-10 hover:bg-white hover:scale-105 hover:text-orange border border-orange
                             hover:border-orange smooth3' onClick={handleForgetPassword} >
                             Submit
                            </button>
                            <button className='rounded-lg bg-white text-orange py-2 px-10 hover:bg-orange hover:scale-105 hover:text-white border border-orange
                             hover:border-orange smooth3'onClick={()=>setshowform(!showform)} >
                             Cancel
                            </button>

                              </div>                   
                    </div>
                    }
                     {/* forget password form ends here*/}

                </div>
            </div>
           
      <FooterBanner/>
            <Footer />
        </>
    )
}

export default Login
