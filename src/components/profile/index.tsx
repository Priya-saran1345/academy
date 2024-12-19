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
import Link from 'next/link';
const Profile = () => {
  const { profile, fetch } = useapi();
  const [apidata, setApiData] = useState<any>()
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [updateddata, setupdateddata] = useState({
    username: '',
    email: '',
    address: '',
    alternate_phone: '',
    course_interested: '',
    date_of_birth: '',
    extracurriculars: '',
    first_name: '',
    gender: '',
    goals: '',
    last_name: '',
    phone: '',
    qualification: '',
    // profile_image: '',
    city:'',
    current_job_title:'',
    company_name:'',
    industry:'',
    linkedin_profile_url:'',
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
        qualification: apidata.qualification || '',
        // profile_image: apidata.profile_image ||'',
        city:apidata.city || '',
        current_job_title:apidata.current_job_title || '',
        company_name:apidata.company_name || '',
        industry:apidata.industry || '',
        linkedin_profile_url:apidata.linkedin_profile_url || '',
      });
    }
  }, [apidata]);

  const changeValue = (event: any) => {
    let newdata;
    if (event.target.name == 'profile_image') {
      const file = event.target.files[0];
      newdata = { ...updateddata, [event.target.name]: file };

      // Generate a preview URL for the selected image
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }// Use files[0] for the selected file

    }
    else {
      newdata = { ...updateddata, [event.target.name]: event.target.value }
    }
    console.log('new data is', newdata)
    setupdateddata(newdata)
  }
  const submitData = async () => {
    try {
      const token = Cookies.get('login_access_token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.put(`${BASE_URL}profile/`, updateddata, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setApiData(response.data)
      toast.success('updated successfully')
      setshowupdate(false)
    } catch (error: any) {
      console.log('Error fetching data :', error);
      toast.error('Try again')
    }
    finally {
      fetch();
    }
  }
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // console.log(apidata)
  return (
    <div className='w-full flex flex-wrap md:flex-nowrap  gap-5 justify-between relative px-2 lg:px-4 p-4'>
      <div className=" w-full md:w-[275px] flex flex-col justify-between  lg:w-[457px] md:sticky  md:top-24 md:h-[87vh] flex-shrink rounded-lg shadow ">
        <div>
          <div className="bg-orange rounded-t-lg h-28 relative">
          {
              apidata?.profile_image ?

            <img
              className="w-24 h-24 rounded-full absolute bottom-[-40px] left-20 transform -translate-x-1/2 border-4 border-white"
              src={apidata?.profile_image}
              alt="Profile"
            
            />:
            <div className='w-24 h-24 rounded-full flex bg-[#F5F5F5] justify-center items-center absolute bottom-[-40px] left-10'>

            <FaUser className='text-[53px] text-textGrey'></FaUser>
            </div> 
          }
          </div>

          <div className="pt-12 pb-8  h-fulljustify-between px-6 ">
          
            <h2 className="text-lg font-semibold">{apidata?.username}</h2>
            <p className="text-gray-500 text-sm">{apidata?.email}</p>
            <div className="">
              <div className="flex justify-end text-sm font-medium text-orange mb-1">
                <span>{apidata?.profile_completion_percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
  className="bg-orange h-3 rounded-full"
  style={{ width: `${apidata?.profile_completion_percentage}%` }}
></div>
                  
               
              </div>
            </div>
            {
              apidata?.profile_completion_percentage!=100 &&
            <p className="text-textGrey text-[12px] mt-4">
              <strong>NOTE:</strong> Complete Your Profile to Avail Amazing Offers.
            </p>
            }
            {
              apidata?.profile_completion_percentage==100 &&
            <p className="text-textGrey text-[12px] mt-4">
              Congratulations  Your Profile is complete
            </p>
            }

            {/* <div className="mt-6 text-left">
              <h3 className="text-lg w-full border-b-1 border-slate-200  font-semibold mb-2">Courses Status:</h3>
              <p>Enrolled Courses</p>
              <p className="font-semibold">
                Total Count: <span className="text-orange">5</span>
              </p>
              <p className="mt-2">Certificates Earned</p>
              <p className="font-semibold">
                Certificates: <span className="text-orange">2</span>
              </p>
            </div> */}
          </div>
          </div>
            {/* Links */}
            <div className="my-6 mx-6 pt-2 border-t-1  ">
              <Link href="/dashboard/mycourses" className="text-orange font-semibold block mb-2 hover:underline">
                View Enrolled Courses &rarr;
              </Link>
              <Link href="/dashboard/certificate" className="text-orange font-semibold block hover:underline">
                Download Certificates &rarr;
              </Link>
            </div>
    
      </div>
      <div className='w-full shadow p-2  lg:p-6 rounded-lg'>
        <div className='flex gap-3 border-b-1 border-slate-200  justify-between items-center'>
          <p className='text-[20px] px-6  font-medium'>1. Personal Information</p>
          <button className=' text-[18px] flex items-center gap-2 text-orange rounded-lg px-3 py-2' onClick={() => {
            setshowupdate(true)
          }}>Edit <BiEdit className='text-[22px]' />
          </button>
        </div>
        <div className='flex w-full p-2 lg:p-6 justify-between flex-wrap  gap-2 lg:gap-5'>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Name
            </label>
            <br />
            <input
              type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              readOnly
              placeholder='Your Name'
              value={`${apidata?.first_name ?? ''} ${apidata?.last_name ?? ''}`}
            />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>E-mail
            </label>
            <br />
            <input type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              readOnly value={apidata?.email} placeholder='Enter Your Email' />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email"
              className='text[16px] font-medium text-textGrey mb-3 Capitalize'
            >Username
            </label>
            <br />
            <input type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              readOnly placeholder=' Username' value={apidata?.username} />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Phone
            </label>
            <br />
            <input type="number"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              readOnly placeholder=' Your phone' value={apidata?.phone} />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="text" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Gender
            </label>
            <br />
            <input type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              readOnly placeholder=' Your gender' value={apidata?.gender} />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Date Of Birth
            </label>
            <br />
            <input type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              readOnly placeholder=' Your DOB' value={apidata?.date_of_birth} />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Address
            </label>
            <br />
            <input type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              value={apidata?.address} readOnly placeholder=' Your Address' />
          </div>
          <div className='w-full sm:w-[48%]'>
            <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>City
            </label>
            <br />
            <input type="text"
              className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
              value={apidata?.city} readOnly placeholder=' Your City' />
          </div>
          
        </div>
        <div className='w-full  rounded-lg'>

          <div className='flex gap-3 border-b-1 border-slate-200  justify-between items-center'>
            <p className='text-[20px] px-6  font-medium pb-2'>2. Professional Information</p>
            {/* <button className=' text-[18px] flex items-center gap-2 text-orange rounded-lg px-3 py-2' onClick={() => {
    setshowupdate(true)
  }}>Edit <BiEdit className='text-[22px]' />
  </button> */}
          </div>
          <div className='flex w-full p-2 lg:p-6 justify-between flex-wrap gap-2 lg:gap-5'>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Alternate phone
              </label>
              <br />
              <input type="number"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your Email' value={apidata?.alternate_phone} />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Qualification
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your Qualification' value={apidata?.qualification} />
            </div>

            <div className='w-full sm:w-[48%]'>
              <label htmlFor="text" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Course Interested
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                value={apidata?.course_interested
                } readOnly placeholder='Your Interested Course' />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Goals
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your Goals' value={apidata?.goals} />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Extracurriculars
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Enter extracurriculars' value={apidata?.extracurriculars} />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Current Job Title
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your Current Job Title' value={apidata?.current_job_title} />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Industry
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your Industry' value={apidata?.industry} />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>Company/Organization Name
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your Company Name' value={apidata?.company_name} />
            </div>
            <div className='w-full sm:w-[48%]'>
              <label htmlFor="email" className='text[16px] font-medium text-textGrey mb-3 Capitalize'>LinkedIn Profile URL
              </label>
              <br />
              <input type="text"
                className=' text-textGrey outline-none w-full border-[2px] px-3 py-2 border-slate-200 rounded-md'
                readOnly placeholder=' Your LinkedIn Profile' value={apidata?.linkedin_profile_url} />
            </div>

          </div>
        </div>
      </div>




      {/* //editable form is here */}
      {
        showupdate &&
        <div className='w-full backdrop-blur-lg h-full flex justify-center items-center absolute top-0 left-0'>
          <div className='lg:w-[75%] p-8 gap-5 border-[1px] flex flex-wrap border-slate-200 relative shadow-xl rounded-lg bg-white'>
            <div className='absolute right-3 top-3' onClick={() => setshowupdate(false)}>
              <RxCross1 className='text-[22px]' />
            </div>

            {/** Form Fields **/}
            <div className='w-full flex justify-center flex-col items-center'>
              <label htmlFor="first_name" className='text-[16px] mb-3 font-medium textGreyblack Capitalize'>Profile Image</label>

              <div className="size-[122px] bg-[#F5F5F5] rounded-full flex justify-center items-center relative">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    width={122}
                    height={122}  
                    alt="Selected Profile Image"
                    className="rounded-full h-full"
                  />
                ) : apidata?.profile_image ? (
                  <Image
                    src={apidata.profile_image}
                    width={122}
                    height={122}
                    alt="Profile Image"
                    className="rounded-full h-full"
                  />
                ) : (
                  <FaUser className="text-[53px] text-textGrey" />
                )}

                {/* Hidden file input for uploading the profile image */}
                <input
                  type="file"
                  name="profile_image"
                  accept="image/*"
                  onChange={changeValue}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label htmlFor="first_name" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>First Name</label>
              <br />
              <input
                type="text"
                value={updateddata.first_name}
                name='first_name'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Your Name'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="last_name" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Last Name</label>
              <br />
              <input
                type="text"
                value={updateddata.last_name}
                name='last_name'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Your Name'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="phone" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Phone</label>
              <br />
              <input
                type="number"
                value={updateddata.phone}
                name='phone'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Your phone no'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="alternate_phone" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Alternate Phone</label>
              <br />
              <input
                type="number"
                value={updateddata.alternate_phone}
                name='alternate_phone'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter alternate phone no'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="qualification" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Qualification</label>
              <br />
              <input
                type="text"
                value={updateddata.qualification}
                name='qualification'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Qualification'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="gender" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Gender</label>
              <br />
              <input
                type="text"
                value={updateddata.gender}
                name='gender'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Gender'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="course_interested" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Course Interested</label>
              <br />
              <input
                type="text"
                value={updateddata.course_interested}
                name='course_interested'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Interested Course'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="date_of_birth" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Date of Birth</label>
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
              <label htmlFor="goals" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Goals</label>
              <br />
              <input
                type="text"
                value={updateddata.goals}
                name='goals'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Goals'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="extracurriculars" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Extracurriculars</label>
              <br />
              <input
                type="text"
                value={updateddata.extracurriculars}
                name='extracurriculars'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Extracurriculars'
                onChange={changeValue}
              />
            </div>

            <div>
              <label htmlFor="address" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Address</label>
              <br />
              <input
                type="text"
                value={updateddata.address}
                name='address'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Address'
                onChange={changeValue}
              />
            </div>
            <div>
              <label htmlFor="address" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Industry</label>
              <br />
              <input
                type="text"
                value={updateddata.industry}
                name='industry'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Industry'
                onChange={changeValue}
              />
            </div>
            <div>
              <label htmlFor="address" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Company Name</label>
              <br />
              <input
                type="text"
                value={updateddata.company_name}
                name='company_name'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter Company Name'
                onChange={changeValue}
              />
            </div>
            <div>
              <label htmlFor="address" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Linkedin Profile Url</label>
              <br />
              <input
                type="text"
                value={updateddata.linkedin_profile_url}
                name='linkedin_profile_url'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter LinkedIn Profile URL'
                onChange={changeValue}
              />
            </div>
            <div>
              <label htmlFor="address" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>Current Job Title</label>
              <br />
              <input
                type="text"
                value={updateddata.current_job_title}
                name='current_job_title'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter current Job Title'
                onChange={changeValue}
              />
            </div>
            <div>
              <label htmlFor="address" className='text[16px] mb-3 font-medium textGreyblack Capitalize'>City</label>
              <br />
              <input
                type="text"
                value={updateddata.city}
                name='city'
                className=' text-textGrey mt-2 outline-none w-full border-[2px] px-8 py-3 border-slate-200 rounded-lg'
                placeholder='Enter City'
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
    // </div>
  )
}

export default Profile