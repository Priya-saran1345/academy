"use client"
import { toast } from 'react-hot-toast';
import Footer from '@/components/footer'
import Header from '@/components/header'
import { BASE_URL } from '@/utils/api'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import FooterBanner from '@/components/footerBanner';

const Signup = () => {
  const router = useRouter();
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [buttonactive, setbuttonactive] = useState(false)
  // const [istutor, setistutor] = useState(false)
  const [errors, setErrors] = useState({});
  const signup = async () => {
   
    try {
      const response = await axios.post(`${BASE_URL}signup/`, {
        username: username, email: email, first_name: firstName,
        last_name: lastName, phone: mobileNumber, password: password
      }, 
      {
      });
      toast.success("Signed up successfully");
      console.log('res', response.data);
      router.push('/login')
      return response;
    } catch (error) {
      console.error("Signup failed", error.response ? error.response.data : error.message);
      const err = error.response.data.email ? error.response.data.email : error.response.data.username
      toast.error(``);
    }
  };
  const validateFirstName = (value) => {
    if (!value) return "Full Name is required.";
    return "";
  };
  const validateLastName = (value) => {
    if (!value) return "Full Name is required.";
    return "";
  };
  const validateUserName = (value) => {
    if (!value) return "Full Name is required.";
    return "";
  };
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required.";
    if (!emailRegex.test(value)) return "Email is invalid.";
    return "";
  };

  const validateMobileNumber = (value) => {
    const mobileRegex = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
    if (!value) return "Mobile Number is required.";
    if (!mobileRegex.test(value)) return "Must be 10 digits.";
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
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

useEffect(()=>{
if(firstName==""|| lastName==""||password==""||email==""||username==''||mobileNumber=="")
  {
  setbuttonactive(false)
}
else{
  setbuttonactive(true)
}
})

  return (
    <>
      <Header />
      <div className='flex flex-col lg:flex-row min-h-screen  px-6 w-full  mx-auto xl:w-[77%]'>
        <div className='flex-1 center flex-col gap-4 mt-28' >
          <Image src="/images/Browk Shop.svg" alt="logo" width={180} height={180} className='' />
          <h3 className='text-base text-center text-gray-500 '>Sign in now and dive into a world of endless <br /> learning opportunities.</h3>
          <Image src="/images/Group 1000004450.svg" alt="logo" width={480} height={480} className='hidden lg:inline' />
        </div>
        <div className='flex-1  center'>
          <div className='min-h-[665px] rounded-lg w-[663px] border-t-[.5px] border-slate-100 bg-white shadow-xl mt-10 lg:mt-28 px-5 sm:px-20 py-10 sm:py-12 flex-col gap-8'>
            <h3 className='text-xl font-semibold text-start mb-6'>Create Account </h3>
            <div className='flex flex-col gap-9 items-start justify-start'>
              <div className='flex w-full justify-between gap-8'>

                <div className="wave-group">
                  <input
                    required
                    type="text"
                    className="input"
                    autoComplete="off"

                    value={firstName}
                    onChange={handleInputChange(setfirstName, validateFirstName, 'firstName')}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    {['F', 'i', 'r', 's', 't', '\u00A0', 'N', 'a', 'm', 'e'].map((char, index) => (
                      <span className="label-char" key={index} style={{ '--index': index }}>
                        {char}
                      </span>
                    ))}
                  </label>
                  {errors.firstName && <p className="error text-red-500 ">{errors.firstName}</p>}
                </div>
                <div className="wave-group">
                  <input
                    required
                    type="text"
                    className="input"
                    autoComplete="off"

                    value={lastName}
                    onChange={handleInputChange(setlastName, validateLastName, 'lastName')}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    {['L', 'a', 's', 't', '\u00A0', 'N', 'a', 'm', 'e'].map((char, index) => (
                      <span className="label-char" key={index} style={{ '--index': index }}>
                        {char}
                      </span>
                    ))}
                  </label>
                  {errors.lastName && <p className="error text-red-500 ">{errors.lastName}</p>}
                </div>
              </div>
              <div className="wave-group ">
                <input
                  required
                  type="text"
                  className="input"
                  autoComplete="off"
                  value={username}
                  onChange={handleInputChange(setusername, validateUserName, 'username')}
                />
                <span className="bar"></span>
                <label className="label">
                  {['U', 's', 'e', 'r', '\u00A0', 'N', 'a', 'm', 'e',].map((char, index) => (
                    <span className="label-char" key={index} style={{ '--index': index }}>
                      {char}
                    </span>
                  ))}
                </label>
                {errors.username && <p className="error text-red-500 ">{errors.username}</p>}
              </div>

              <div className="wave-group">
                <input
                  required
                  type="text"
                  className="input"
                  autoComplete="off"
                  value={email}
                  onChange={handleInputChange(setEmail, validateEmail, 'email')}
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
                  type="tel"
                  className="input"
                  autoComplete="off"
                  value={mobileNumber}
                  onChange={handleInputChange(setMobileNumber, validateMobileNumber, 'mobileNumber')}
                />
                <span className="bar"></span>
                <label className="label">
                  {['M', 'o', 'b', 'i', 'l', 'e', '\u00A0', 'N', 'u', 'm', 'b', 'e', 'r'].map((char, index) => (
                    <span className="label-char" key={index} style={{ '--index': index }}>
                      {char}
                    </span>
                  ))}
                </label>
                {errors.mobileNumber && <p className="error text-red-500 ">{errors.mobileNumber}</p>}
              </div>

              <div className="wave-group">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  className="input"
                  autoComplete="off"
                  value={password}
                  onChange={handleInputChange(setPassword, validatePassword, 'password')}
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
                  className="text-blue-500 hover:text-blue-800  mt-2 text-sm"
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button>
              </div>

              {/* <div className='flex gap-2 items-center'>
                <input type="checkbox" name="" id="" className='h-5 rounded-lg w-5 ' checked={istutor}  
        onChange={() => setistutor(prev => !prev)}  />
        <h3>Is Tutor</h3>
              </div> */}
              
              <button
      disabled={!buttonactive} // The button is disabled when buttonactive is false
      onClick={signup}
      className={`rounded-lg py-2 w-full border border-orange smooth3 
        ${buttonactive 
          ? 'bg-orange text-white hover:bg-white hover:scale-105 hover:text-orange hover:border-orange' 
          : 'bg-lightOrange text-orange cursor-not-allowed'}`} // Styles for disabled and active state
    >
                Create Account
                
              </button>
              <h3 className='text-base text-center font-medium text-gray-500 flex items-center w-full justify-center' >Already have an account ? <a href='/login' className='text-orange ml-2 underlineHover'>Login</a></h3>
            </div>
          </div>
        </div>
      </div>
      <FooterBanner/>
      <Footer />
    </>
  )
}

export default Signup