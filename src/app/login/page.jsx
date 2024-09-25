"use client"
import Footer from '@/components/footer';
import Header from '@/components/header';
import Image from 'next/image';
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

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
            <div className='flex h-screen px-4 md:px-60'>
                <div className='flex-1 center flex-col gap-4 mt-28'>
                    <Image src="/images/Browk Shop.svg" alt="logo" width={180} height={180} className='' />
                    <h3 className='text-base text-center text-gray-500 '>Sign in now and dive into a world of endless <br /> learning opportunities.</h3>
                    <Image src="/images/Group 1000004450.svg" alt="logo" width={480} height={480} className='' />
                </div>
                <div className='flex-1 center'>
                    <div className='h-[536px] rounded-lg w-[663px] bg-white shadow-xl mt-28 p-20 flex-col gap-8'>
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
                            <button className='rounded-lg bg-orange text-white py-2 w-full hover:bg-white hover:scale-105 hover:text-orange border border-orange hover:border-orange smooth3'>
  Log In
</button>
<h3 className='text-base text-center font-medium text-gray-500 flex items-center w-full justify-center ' >Don&apos;t have an account ? <a href='/signup' className='text-orange ml-2 underlineHover'>Signup</a></h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="xl:px-60 h-[499px] banner2 w-full">
                <div className="flex gap-[20%] items-center h-full">
                    <div className="max-w-[30%]">
                        <h3 className="text-[53px] text-white font-semibold">Studilyft</h3>
                        <h3 className="text-sm text-white text-[16px] font-medium ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt earum eveniet delectusnde accusantium blanditiis magni iure natus. </h3>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <button className="w-fit bg-white center px-4 py-2 rounded-lg text-[20px] font-semibold text-orange">Start Your Free Trial by $0</button>
                        <h3 className="text-sm font-semibold text-white">Join today! Pay after 7 days</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
