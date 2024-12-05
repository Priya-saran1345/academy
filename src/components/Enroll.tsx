"use client"
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import Cookies from 'js-cookie';
import { RxCross1 } from "react-icons/rx";
import { useapi } from '@/helpers/apiContext';
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';

const Profile = () => {
  const { profile, fetch } = useapi();
  const [apidata, setApiData] = useState<any>()
  const {  setenroll } = useapi();

  const [updateddata, setupdateddata] = useState({
    username: '',
    email: '',
    address:  '',
    alternate_phone:  '',
    course_interested:  '',
    date_of_birth: '',
    extracurriculars:'',
    first_name: '',
    gender:  '',
    goals:  '',
    last_name:  '',
    phone: '',
    qualification: ''
  })
const [showupdate, setshowupdate] = useState(false)
 
  useEffect(() => { 
    setApiData(profile)
  }, [profile]);

  useEffect(() => {
    if (apidata) {
      setupdateddata({
        username: apidata.username || '',
        email: apidata.email || '',
        address: apidata.address || '',
        alternate_phone: apidata.alternate_phone || '',
        course_interested: apidata.course_interested || '',
        date_of_birth: apidata.date_of_birth || '',
        extracurriculars: apidata.extracurriculars || '',
        first_name: apidata.first_name || '',
        gender: apidata.gender || '',
        goals: apidata.goals || '',
        last_name: apidata.last_name || '',
        phone: apidata.phone || '',
        qualification: apidata.qualification || ''
      });
    }
  }, [apidata]);
const changeValue=(event:any)=>{
const newdata={...updateddata ,[event.target.name]:event.target.value}
setupdateddata(newdata)
}
const submitData=async()=>{
  try {
    const token = Cookies.get('login_access_token');
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await axios.put(`${BASE_URL}profile/`, updateddata, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setApiData(response.data)
     toast.success('updated successfully')
     setshowupdate(false)

  } catch (error: any) {
    console.log('Error fetching data :', error);
    toast.error('Try again')
  }
  finally{
    fetch();
  }
}
  console.log(apidata)
  return (
    <div className='w-full mt-[100px]    p-7'>
      <div className='flex gap-3 items-center'>
        <p className='text-[22px] text-center w-full mb-5  font-semibold'>Fill Your Details</p>
      </div>
          <div className='w-full   flex  justify-center items-center '>
          <div className='w-[75%] p-8 gap-5 border-[1px] flex flex-wrap border-slate-200  shadow-xl rounded-lg bg-white'>
            {/* <div className='absolute right-3 top-3' >
              <RxCross1 className='text-[22px]' />
            </div> */}

            {/** Form Fields **/}
            <div>
              <label htmlFor="first_name" className='text[17px] mb-3 font-medium text-black uppercase'>First Name</label>
              <br />
              <input
                type="text"
                value={updateddata.first_name}
                name='first_name'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Your Name'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="last_name" className='text[17px] mb-3 font-medium text-black uppercase'>Last Name</label>
              <br />
              <input
                type="text"
                value={updateddata.last_name}
                name='last_name'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Your Name'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="phone" className='text[17px] mb-3 font-medium text-black uppercase'>Phone</label>
              <br />
              <input
                type="number"
                value={updateddata.phone}
                name='phone'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Your phone no'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="alternate_phone" className='text[17px] mb-3 font-medium text-black uppercase'>Alternate Phone</label>
              <br />
              <input
                type="number"
                value={updateddata.alternate_phone}
                name='alternate_phone'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter alternate phone no'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="qualification" className='text[17px] mb-3 font-medium text-black uppercase'>Qualification</label>
              <br />
              <input
                type="text"
                value={updateddata.qualification}
                name='qualification'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Qualification'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="gender" className='text[17px] mb-3 font-medium text-black uppercase'>Gender</label>
              <br />
              <input
                type="text"
                value={updateddata.gender}
                name='gender'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Gender'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="course_interested" className='text[17px] mb-3 font-medium text-black uppercase'>Course Interested</label>
              <br />
              <input
                type="text"
                value={updateddata.course_interested}
                name='course_interested'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Interested Course'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="date_of_birth" className='text[17px] mb-3 font-medium text-black uppercase'>Date of Birth</label>
              <br />
              <input
                type="text"
                value={updateddata.date_of_birth}
                name='date_of_birth'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='yyyy-mm-dd'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="goals" className='text[17px] mb-3 font-medium text-black uppercase'>Goals</label>
              <br />
              <input
                type="text"
                value={updateddata.goals}
                name='goals'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Goals'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="extracurriculars" className='text[17px] mb-3 font-medium text-black uppercase'>Extracurriculars</label>
              <br />
              <input
                type="text"
                value={updateddata.extracurriculars}
                name='extracurriculars'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Extracurriculars'
                onChange={changeValue}
              />
            </div>
    
            <div>
              <label htmlFor="address" className='text[17px] mb-3 font-medium text-black uppercase'>Address</label>
              <br />
              <input
                type="text"
                value={updateddata.address}
                name='address'
                className='capitalize text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Address'
                onChange={changeValue}
              />
            </div>
    
            <div className='w-full'>
              <button
                onClick={submitData}
                className="bg-orange text-white p-2 px-5 rounded-md hover:bg-lightOrange text-[18px] font-semibold hover:text-orange duration-150"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Profile