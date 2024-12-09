import Support from '@/components/assignments'
import Footer from '@/components/footer'
import Header from '@/components/header'
import FooterBanner from "@/components/footerBanner"

import React from 'react'
const contact = () => {
  return (
    <div className='w-full '>
        <Header/>
        <div className='w-full mt-32 lg:w-[95%] 2xl:w-[75%] mx-auto px-4'>
            <Support/>

        </div>
        <FooterBanner/>
        <Footer/>
    </div>
  )
}
export default contact