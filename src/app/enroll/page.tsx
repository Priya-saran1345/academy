import React from 'react'
import Enroll from '@/components/Enroll'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FooterBanner from '@/components/footerBanner'
import Script from 'next/script';


const Page = () => {
  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive" // Ensures the script is loaded before the component renders
        
      />
        <Header/>
        <Enroll/>
        <FooterBanner />
        <Footer/>
    </div>  
  )
}

export default Page