import Support from '@/components/assignments'
import Footer from '@/components/footer'
import Header from '@/components/header'
import React from 'react'
const contact = () => {
  return (
    <div className='w-full'>
        <Header/>
        <div className='w-full mt-32 xl:w-[75%] mx-auto px-4'>
            <Support/>
        </div>
        <Footer/>
    </div>
  )
}
export default contact