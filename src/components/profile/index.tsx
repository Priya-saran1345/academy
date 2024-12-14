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
import Image from 'next/image'
const Profile = () => {
  const { profile, fetch } = useapi();
  const [apidata, setApiData] = useState<any>()
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
    <div className='w-full relative px-2 lg:px-4 p-4'>
      <div className='flex gap-3 flex-col  justify-center items-center'>
        <p className='text-[22px]  font-semibold'>My Profile</p>
        <button className='bg-lightOrange text-[18px] flex items-center gap-2 text-orange rounded-lg px-3 py-2' onClick={()=>{
          setshowupdate(true)
        }}>Edit <BiEdit className='text-[22px]' />
        </button>
      </div>
      <div className='flex justify-center flex-wrap gap-5'>
        <div className='rounded-lg xl:w-[30%] sm:w-[47%] w-full my-10  shadow-lg border-[1px] items-center border-slate-200 flex flex-col justify-between px-5 xl:px-12 py-12 '>
          <div className='size-[122px] bg-[#F5F5F5] rounded-full flex justify-center items-center'>
            {
              apidata?.profile_image ?
            <Image src={apidata?.profile_image} width={122} alt='' height={45} className='rounded-full'>
            </Image>:
            <FaUser className='text-[53px] text-textGrey' />
            }
          </div>
          <div className='flex flex-col gap-5 w-full'>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>Name
              </label>
              <br />
              <input
                type="text"
                className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                readOnly
                placeholder='Your Name'
                value={`${apidata?.first_name ?? ''} ${apidata?.last_name ?? ''}`}
              />            </div>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>E-mail
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly value={apidata?.email} placeholder='Enter your Email' />
            </div>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>username

              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' Username' value={apidata?.username} />
            </div>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>Phone
              </label>
              <br />
              <input type="number" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your phone' value={apidata?.phone} />
            </div>
          </div>
        </div>
        {/* //second column */}
        <div className='rounded-lg xl:w-[30%] sm:w-[47%] w-full my-10  shadow-lg border-[1px] items-center border-slate-200 flex flex-col justify-between px-5 xl:px-12 py-12 '>

          <div className='flex flex-col gap-5 w-full'>
           
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>alternate phone
              </label>
              <br />
              <input type="number" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your Email' value={apidata?.alternate_phone} />
            </div>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>address
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                value={apidata?.address} readOnly placeholder=' your Address' />
            </div>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>qualification
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your Qualification' value={apidata?.qualification} />
            </div>
            <div className='w-full'>
              <label htmlFor="text" className='text[17px] font-medium text-black mb-3 uppercase'>gender
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your Gender' value={apidata?.gender} />
            </div>
            <div className='w-full'>
              <label htmlFor="text" className='text[17px] font-medium text-black mb-3 uppercase'>course interested
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                value={apidata?.course_interested
                } readOnly placeholder='your Password' />
            </div>
            {/* <div className='w-full'>
              <label htmlFor="text" className='text[17px] font-medium text-black mb-3 uppercase'>Is Tutor
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' Is tutpr' value={apidata?.is_tutor} />
            </div> */}
          </div>
        </div>
        {/* third column */}
        <div className='rounded-lg xl:w-[30%] sm:w-[47%] w-full my-10  shadow-lg border-[1px] items-center border-slate-200 flex flex-col justify-between px-5 xl:px-12 py-12 '>

          <div className='flex flex-col gap-5 w-full'>
           
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>date of birth
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your DOB' value={apidata?.date_of_birth} />
            </div>
           
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>goals
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your Goals' value={apidata?.goals} />
            </div>
            <div className='w-full'>
              <label htmlFor="email" className='text[17px] font-medium text-black mb-3 uppercase'>extracurriculars
              </label>
              <br />
              <input type="text" className='capitalize text-textGrey outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg '
                readOnly placeholder=' your extracurriculars' value={apidata?.extracurriculars} />
            </div>

          </div>
        </div>

      </div>

      {/* //editable form is here */}
      {
          showupdate&&
          <div className='w-full backdrop-blur-lg h-full flex justify-center items-center absolute top-0 left-0'>
          <div className='lg:w-[75%] p-8 gap-5 border-[1px] flex flex-wrap border-slate-200 relative shadow-xl rounded-lg bg-white'>
            <div className='absolute right-3 top-3' onClick={() => setshowupdate(false)}>
              <RxCross1 className='text-[22px]' />
            </div>
    
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
        }

    </div>
  )
}

export default Profile