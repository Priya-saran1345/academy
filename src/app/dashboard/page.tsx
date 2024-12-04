"use client"
import React, { useEffect, useState } from 'react'
import  DashboardSidebar from '@/components/dashboardSidebar'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '@/utils/api'
import Dashboard from '@/components/dashboard'

const Dashboardpage = () => {
 
  return (
    <>
      <div className='flex px-4 pt-7 bg-[#F7F7F7]'>
        <div className='w-[15%]'>
         <DashboardSidebar />
        </div>
            <div className='w-[85%]'>
            <DashboardHeader />
            <div className='w-full min-h-[88vh] bg-white rounded-sm px-8 py-5 '>

            <Dashboard/>  
            </div>        
              </div>
      </div>

    </>
  )
}

export default Dashboardpage