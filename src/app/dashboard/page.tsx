"use client"
import React, { useEffect, useState } from 'react'
import DashboardSidebar from '@/components/dashboardSidebar'
import DashboardHeader from '@/components/dashboardHeader'
import DashboardMain from '@/components/dashboardMain'
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '@/utils/api'
import Dashboard from '@/components/dashboard'

const Dashboardpage = () => {

  return (
    <>
      <div className=' min-h-screen bg-[#F7F7F7]'>
        <DashboardHeader />
        <div className='w-full flex '>

          <div className='w-fit'>
            <DashboardSidebar />
          </div>
          <div className='flex-1 '>
            <div className='w-full min-h-[88vh] bg-white  rounded-sm px-8 py-5 '>
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboardpage