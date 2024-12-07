import React from 'react'
import Enroll from '@/components/Enroll'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FooterBanner from '@/components/footerBanner'


const Page = () => {
  return (
    <div>
     
        <Header/>
        <Enroll/>
        <FooterBanner />
        <Footer/>
    </div>  
  )
}

export default Page