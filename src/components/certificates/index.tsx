"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { LuDownload } from "react-icons/lu";
import { VscEye } from "react-icons/vsc";
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL, BASE_URL_IMAGE } from '@/utils/api';
import useDownloader  from "react-use-downloader";

const Certificates: React.FC = () => {
  const { download } = useDownloader(); // Use the downloader hook
  const [apidata, setApidata] = useState< any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  const fetch = async () => {
    try {
        const token = Cookies.get('login_access_token');

        if (!token) {
            // setError('No token found'); // Update error state
            console.error('No token found');
            return;
        }
        const response = await axios.get(`${BASE_URL}certificates/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setApidata(response.data); // Update state with fetched data
    } catch (error: any) {
        // setError(error.message); // Update error state with the error message
        console.log("dashboard error", error.message);
    }

};
useEffect(() => {
    fetch();
}, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowCertificate(false);
      }
    };

    if (showCertificate) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCertificate]);

  const downloadCertificate = (imageUrl: string, fileName: string) => {
    download(imageUrl, fileName);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!apidata) {
    return <div>Loading...</div>;
  }

  console.log(apidata)
  return (
    <div className='w-full relative'>
      <p className='text-[22px] font-semibold'>Certificates</p>
      <div className='flex flex-wrap justify-start gap-5 mt-8'>
        {apidata.map((elem:any, index:number) => (
          <div key={index}>
            <div className='border-[1px] h-[217px] w-[493px] gap-3 rounded-lg border-slate-200 shadow-xl p-3 flex'>
              <div>
                <Image
                  src="/images/certificate.png"
                  alt="Business & Entrepreneurship"
                  width={32}
                  height={45}
                  className="transition group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <div className='w-full flex flex-col justify-between'>
                <div className='flex justify-between'>
                  <p className='text-[17px] font-semibold w-[60%]'>{elem.course_name}</p>
                  <p>Studilyft</p>
                </div>
                <div className='text-textGrey text-[14px]'>
                  <p>Completion Date: {elem.issue_date}</p>
                  <p>Instructor: {elem.instructor_name}</p>
                </div>
                <div className='flex justify-end gap-2'>
                  <div
                    className='bg-lightOrange text-orange flex justify-center items-center text-[20px] rounded-md w-[50px] h-[36px] cursor-pointer'
                    onClick={() => {
                      setShowCertificate(true);
                      setSelectedCertificate(elem.certificate_image);
                    }}
                  >
                    <VscEye />
                  </div>
                  <div
                    className='bg-orange text-white w-[50px] flex justify-center items-center text-[20px] rounded-md h-[36px] cursor-pointer'
                    onClick={() =>
                      downloadCertificate(
                        `${BASE_URL_IMAGE}${elem.certificate_image}`,
                        `${elem.course_name}-certificate.jpg` 
                      )
                    }
                  >
                    <LuDownload />
                  </div>
                </div>
              </div>
            </div>
            {showCertificate && selectedCertificate && (
              // bg-black/20
              <div
                className='flex items-center justify-center absolute top-0 left-0 right-0 w-full h-[87vh] '
              >
                <div ref={modalRef}>
                  <Image
                    src={selectedCertificate}
                    alt='Certificate'
                    height={800}
                    width={800}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
