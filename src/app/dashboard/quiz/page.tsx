"use client"
import React, { useEffect, useState } from 'react'
import DashboardSidebar from '@/components/dashboardSidebar'
import DashboardHeader from '@/components/dashboardHeader'
import Dashboard from '@/components/dashboard'
import Quiz from '@/components/Quiz'

const Dashboardpage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#F7F7F7]">
        <DashboardHeader />
        <div className="w-full flex  relative">
          <div className="w-fit z-50 hidden lg:block absolute top-0 left-0 h-full">
            <DashboardSidebar />
          </div>
          <div className="flex-1 lg:pl-[85px]"> {/* Adjust `pl` based on the sidebar width */}
            <div className="w-full min-h-[88vh] bg-white rounded-sm  py-5">
              {/* <Dashboard /> */}
              <Quiz/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboardpage
