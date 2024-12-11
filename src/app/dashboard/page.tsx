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
      <div className="min-h-screen bg-[#F7F7F7]">
        <DashboardHeader />
        <div className="w-full flex  relative">
          {/* Sidebar with absolute positioning */}
          <div className="w-fit z-50 hidden lg:block absolute top-0 left-0 h-full">
            <DashboardSidebar />
          </div>
          {/* Main content area with appropriate padding to avoid overlap */}
          <div className="flex-1 lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
            <div className="w-full min-h-[88vh] bg-white rounded-sm  py-5">
              <Dashboard />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboardpage