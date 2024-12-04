"use client"
import Footer from '@/components/footer'
import Header from '@/components/header'
import OtherCourses from '@/components/otherCourses'
import React from 'react'
import FooterBanner from "@/components/footerBanner"

const courses = () => {
  return (
    <div className='w-full'>
        <Header/>
        <div className='w-full xl:w-[75%] mt-40 mx-auto px-4 flex justify-center items-center'>
        <OtherCourses/>
        </div>
        <FooterBanner/>
        <Footer/>
    </div>
  )
}

export default courses