"use client"
import React, { useContext } from 'react';
import Dashboard from '@/components/dashboard';
import {useDashboard} from '@/helpers/dashboardContext';
import Mycourses from '@/components/mycourses';
import Profile from '@/components/profile';
import Updates from '@/components/updates';
import Certificates from '@/components/certificates'; // Ensure spelling is consistent
import OtherCourses from '@/components/otherCourses';
import Support from '@/components/assignments';

const DashboardMain = () => {
  const {profileState} = useDashboard();

  return (
    <div className='w-full min-h-[88vh] bg-white rounded-sm px-8 py-5 '>
      {/* <Dashboard /> */}
      {profileState === 'dashboard' && <Dashboard />}
      {profileState === 'myCourses' && <Mycourses />}
      {profileState === 'help' && <Support />}
      {profileState === 'updates' && <Updates />}
      {profileState === 'other-courses' && <OtherCourses />}
      {profileState === 'profile' && <Profile />}
      {profileState === 'certificate' && <Certificates />}
    </div>
  );
};

export default DashboardMain;


