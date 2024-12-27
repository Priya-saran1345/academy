"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardSidebar from "@/components/dashboardSidebar";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL, BASE_URL_IMAGE } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { FaBook, FaCircleCheck, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import { GoDownload } from "react-icons/go";
import { useapi } from "@/helpers/apiContext";
import { GiSecretBook } from "react-icons/gi";
import Confetti from 'react-confetti';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWindowSize } from 'react-use';

export default function Page() {
  const pathname = usePathname();
  const { profile } = useapi();
  const id = pathname.split("/").pop();
  const [ApiData, setApiData] = useState<any>(null);
  const [moduleTitles, setModuleTitles] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [sidecontentindex, setsidecontentindex] = useState<number>(0);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [expandedLessonIndex, setExpandedLessonIndex] = useState<number | null>(null);
  const [expandednotesIndex, setexpandednotesIndex] = useState<any>();
  const [lessonId, setlessonId] = useState<any>();
  const [userId, setuserId] = useState<any>();
  const [playedPercentage, setPlayedPercentage] = useState(0);
  const [initialProgress, setInitialProgress] = useState(0);
  const [moduleprogress, setmoduleprogress] = useState<any>()
  const playerRef = useRef<any>(null);
  const router = useRouter();
  const [contentProgressArray , setcontentProgressArray ] = useState<any>()
  const toggleLesson = (index: number) => {
    setExpandedLessonIndex(expandedLessonIndex === index ? null : index);
  };

  const toggleNotes = (index: number) => {
    setexpandednotesIndex(expandednotesIndex === index ? null : index);
  };
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const getAllTopics = (apiData: any, index: number) => {
    return apiData?.modules?.[index]?.topics || [];
  };

  useEffect(() => {
    if (ApiData) {
      setTopics(getAllTopics(ApiData, sidecontentindex));
    }
  }, [ApiData, sidecontentindex]);

  const getModuleTitles = (apiData: any) => {
    return apiData?.modules?.map((module: any) => module?.module_title) || [];
  };

  useEffect(() => {
    if (ApiData) {
      setModuleTitles(getModuleTitles(ApiData));
    }
  }, [ApiData]);


  const fetch = async () => {
    try {
      const token = Cookies.get("login_access_token");
      if (!token) {
        alert("No token found");
        router.push("/login");
        return;
      }
      const response = await axios.get(`${BASE_URL}course/${id}/modules/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("My enrolled course data:", response.data);
      setApiData(response.data);
    } catch (error: any) {
      console.error("My courses error:", error.message);
    }
  };


   const getContentProgress = (data:any) => {
    const result:any = [];
  
    data.module_progress.forEach((module:any) => {
      module.topic_progress.forEach((topic:any) => {
        topic.content_progress.forEach((content:any) => {
          result.push({
            id: content.content_id,
            progress: content.progress,
          });
        });
      });
    });
  
    return result;
  };

  useEffect(() => {
    
    fetch();
    setuserId(profile?.id);
  }, [id, profile, playedPercentage]);



  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-orange " />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange" />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };
  const { width, height } = useWindowSize();

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const fetchPlayCount = async () => {
      try {
        const token = Cookies.get("login_access_token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get(
          `${BASE_URL}video-progress/${ApiData?.course_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setmoduleprogress(
          response.data.module_progress?.map((progress: any) => progress.module_progress || 0)
        )   
        setcontentProgressArray(getContentProgress(response.data))    
        console.log("The start video progress is", response.data);
      
        // Check if course progress is 100%
        if (Math.floor(ApiData?.course_progress) === 100) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 5000);     
        }
      } catch (error) {
        console.error("Error fetching play count:", error);
      }
    };
    if (ApiData) {
      fetchPlayCount();
    }
  }, [ApiData]);
console.log('content progress is ----------------',contentProgressArray)
  // console.log('modules progress are ',moduleprogress)
  const handleStart = async () => {
    try {
      const token = Cookies.get("login_access_token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        `${BASE_URL}video-progress/`,
        { content: lessonId, progress: initialProgress, is_complete: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Video started from progress:", initialProgress);
    } catch (error) {
      console.error("Error updating play count:", error);
    }
  };

  const handlePauseOrEnd = async () => {
    try {
      const token = Cookies.get("login_access_token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        `${BASE_URL}video-progress/`,
        { content: lessonId, progress: playedPercentage, is_complete: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Progress updated to", playedPercentage);
    } catch (error) {
      console.error("Error sending progress:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <DashboardHeader />
      <div className="w-full flex relative">
        <div className="w-fit z-50 hidden lg:block absolute top-0 left-0 h-full">
          <DashboardSidebar />
        </div>
        <div className="flex-1 lg:pl-[85px]">
          <div className="w-full min-h-[88vh] bg-white rounded-sm py-5">
            <div className="mx-auto p-3 flex flex-col md:flex-row gap-2">
              <div className=" md:w-[275px] lg:w-[350px] md:sticky  md:top-24 md:h-[90vh] flex-shrink-0 rounded-lg shadow p-4">
                {
ApiData?.card_image?
                  <Image
                  src={ApiData?.card_image}
                  height={350}
                  width={410}
                  alt="Python Course"
                  className=" w-full rounded-lg mb-4"
                  />:
                  <div className="w-full h-[350px]  flex justify-center items-center">
                  

              
                  <div className="loader_img">
                    </div>
                    </div>
                }
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-xl text-gray-900">{ApiData?.course_title}</h3>
                  <p
                    className="text-sm text-gray-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: `${ApiData?.course_description
                        ?.split(' ')
                        .slice(0, 14)
                        .join(' ')}...`,
                    }}
                  />
                  <div className="flex items-center mt-3  gap-1">
                    Rating: {renderStars(ApiData?.rating)}
                  </div>
                  <p className="flex text-textGrey text-[14px] items-center mt-1  gap-1">
                    ({ApiData?.review_count} reviews)
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <button
                      onClick={() => toggleSection("courseMaterial")}
                      className="w-full flex items-center text-lg font-semibold mb-2 focus:outline-none"
                    >
                      {openSection === "courseMaterial" ? (
                        <BiChevronUp className="text-[24px] text-black" />
                      ) : (
                        <BiChevronDown className="text-[24px] text-black" />
                      )}
                      <span className="ml-2 ">Course Material</span>
                    </button>
                    <AnimatePresence>
                      {openSection === "courseMaterial" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden pl-4 pb-3"
                        >
                          <nav className="space-y-1">
                            {moduleTitles?.map((module: string, index: number) => (
                              <div
                                key={index}
                                onClick={() => setsidecontentindex(index)}
                                className={`w-full items-center ${sidecontentindex == index ? 'bg-gray-100' : 'bg-white'} text-left 
                                px-4 border-none py-3 rounded-lg text-sm hover:bg-gray-100 focus:outline-none`}
                              >
                                <div className="flex justify-between cursor-pointer text-textGrey font-medium text-[15px] gap-4">
                                  <div className="flex gap-2 items-center">
                                    {
                                      moduleprogress[index] === 100 ?
                                        <FaCircleCheck className="text-orange text-[18px] mt-1" /> :
                                        // <div className={`min-w-[13px] h-[13px] border-2  border-orange rounded-full`}></div>
                                        <div className="relative border-orange border-2 flex justify-center items-center rounded-full p-[3px] " style={{
                                          background: `conic-gradient(#F24A25 ${moduleprogress[index]}%, #F5F5F5 ${moduleprogress[index]}%)`,
                                        }}>
                                          <div className="w-[10px]  h-[10px] bg-white border-orange border-2  rounded-full flex items-center justify-center overflow-hidden z-50">
                                            {/* Content inside the rounded block can be left empty or customized */}
                                          </div>
                                        </div>
                                    }
                                    {/* {
                                 moduleprogress[index]===0 &&<div className={`min-w-[13px] h-[13px] border-2  border-orange rounded-full`}></div>

                                  } */}
                                    {module}
                                  </div>
                                  {/* <div className={`  text-orange`}>{Math.round(moduleprogress[index])}%</div> */}
                                </div>
                              </div>
                            ))}
                          </nav>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => toggleSection('progress')}
                    className="w-full flex items-center border-t border-slate-200 pt-4 text-lg font-semibold mb-2 focus:outline-none"
                  >
                    {openSection === 'progress' ? (
                      <BiChevronUp className="text-[24px] text-black" />
                    ) : (
                      <BiChevronDown className="text-[24px] text-black" />
                    )}
                    <span className="ml-2">Progress</span>
                  </button>
                  <AnimatePresence>
                    {openSection === 'progress' && (
                      <motion.div
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 500, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden pb-4 pl-4 text-sm text-gray-700"
                      >
                        <p>Your progress: {Math.floor(ApiData?.course_progress)}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div className="bg-orange h-2.5 rounded-full" style={{ width: `${ApiData?.course_progress}%` }}></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <button
                    onClick={() => toggleSection('courseInfo')}
                    className="w-full flex items-center border-t  border-slate-200 pt-4 text-lg font-semibold mb-2 focus:outline-none"
                  >
                    {openSection === 'courseInfo' ? (
                      <BiChevronUp className="text-[24px] text-black" />
                    ) : (
                      <BiChevronDown className="text-[24px] text-black" />
                    )}
                    <span className="ml-2">Course Info</span>
                  </button>
                  <AnimatePresence>
                    {openSection === 'courseInfo' && (
                      <motion.div
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 500, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden pl-4 text-sm text-gray-700 space-y-2"
                      >
                        <p><strong>Duration:</strong> {ApiData?.duration} </p>
                        <p><strong>Level:</strong> {ApiData?.level}</p>
                        <p><strong>Language:</strong> English</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="rounded-lg shadow overflow-hidden">
                  {
                    topics.length > 0 &&
                    <div className="p-4">
                      {topics?.map((module: any, moduleIndex: number) => (
                        <div key={moduleIndex} className="mb-4">
                          <button
                            onClick={() => setOpenModule(openModule === moduleIndex ? null : moduleIndex)}
                            className="w-full flex items-center justify-between  p-4 border-slate-200 border-1 hover:shadow-lg mb-3 duration-250 rounded-lg"
                          >
                            <span className="font-semibold text-left text-[18px]">{moduleIndex + 1}. {module?.title || 'Untitled Module'}</span>
                            {openModule === moduleIndex ? <FiMinus className="text-[24px] text-orange" /> : <FiPlus className="text-[24px] text-orange" />}
                          </button>
                          <AnimatePresence>
                            {openModule === moduleIndex && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                {module?.content?.map((lesson: any, lessonIndex: number) => (
                                  <div key={lessonIndex}>
                                    <div className="flex flex-col gap-2 mt-2">
                                      <div
                                        className={`flex border-1 ${expandedLessonIndex === lessonIndex ? "border-orange"
                                          : "border-slate-200"} p-3 rounded-lg items-start gap-3 text-sm cursor-pointer`}
                                        onClick={() => toggleLesson(lessonIndex)}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between">
                                            <div className="flex items-start gap-2">
                                            
                                              {
                                                contentProgressArray?.find((elem: any) => elem.id === lesson.id)?.progress === 100 ? (
                                                  <FaCircleCheck className="text-orange h-4 min-w-4 mt-1" />
                                                ) : (
                                                  <div className={`w-[13px] h-[13px] border-2 mt-1 border-orange rounded-full`}></div>
                                                )
                                              }
                                              <div className="items-center gap-2">
                                                <div className={`font-normal text-[16px] ${expandedLessonIndex === lessonIndex ? "text-orange" : "text-textGrey"}`}>{lesson?.title}</div>
                                                <div className="text-gray-500 mt-1 text-xs">
                                                Video • 
                                                                                              </div>
                                              </div>
                                            </div>
                                            {expandedLessonIndex === lessonIndex ? <BiChevronUp className="text-[28px] text-orange" />
                                              : <BiChevronDown className="text-[28px] text-orange" />}
                                          </div>
                                        </div>
                                      </div>
                                      <AnimatePresence>
                                        {expandedLessonIndex === lessonIndex && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                            onAnimationComplete={() => {
                                              setlessonId(lesson.id);
                                              // handleStart();
                                            }}
                                          >
                                            <div className="h-[500px] rounded-md">
                                              <ReactPlayer
                                                ref={playerRef}
                                                url={lesson?.video_url}
                                                controls
                                                width="100%"
                                                height="100%"
                                                playing={true}
                                                onReady={() => {
                                                  if (contentProgressArray?.find((elem: any) => elem.id === lesson.id)?.progress 
                                                    > 0 && contentProgressArray?.find((elem: any) => elem.id === lesson.id)?.progress  < 100) {
                                                    playerRef.current.seekTo(contentProgressArray?.find((elem: any) => elem.id === lesson.id)?.progress  / 100, "fraction");
                                                    console.log("Seeking to", contentProgressArray?.find((elem: any) => elem.id === lesson.id)?.progress  / 100);
                                                  }
                                                }}
                                                onProgress={(state) => {
                                                  if (ApiData?.course_progress < 100) {
                                                    const playedPercentage = parseFloat((state.played * 100).toFixed(2));
                                                    setPlayedPercentage(playedPercentage);
                                                  }
                                                }}
                                                onPause={handlePauseOrEnd}
                                                // onProgressChange={handlePauseOrEnd}
                                                onEnded={handlePauseOrEnd}
                                              />
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                    <div key={lessonIndex} className={`flex ${expandednotesIndex === lessonIndex
                                      ? "border-orange" : "border-slate-200"} rounded-lg border-1 flex-col gap-2 mt-2`}>
                                      <div
                                        className={`flex p-3 rounded-lg items-start gap-3 text-sm cursor-pointer`}
                                        onClick={() => toggleNotes(lessonIndex)}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between">
                                            <div className="flex items-start gap-2">
                                              <div className="min-w-[13px] h-[13px] mt-1 ">
                                              <FaBook  className="text-orange text-[16px]"/>
                                              </div>
                                              <div className="items-center gap-2">
                                                <div className={`font-normal text-[16px] ${expandednotesIndex === lessonIndex ? "text-orange" : "text-textGrey"}`}>{lesson?.title} Notes</div>
                                              </div>
                                            </div>
                                            {expandednotesIndex === lessonIndex ? <BiChevronUp className="text-[28px] text-orange" />
                                              : <BiChevronDown className="text-[28px] text-orange" />}
                                          </div>
                                        </div>
                                      </div>
                                      <AnimatePresence>
                                        {expandednotesIndex === lessonIndex && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                          >
                                            <div className="rounded-md mx-8 pb-3">
                                              <button className="px-4 py-[9px] rounded-md bg-orange text-white hover:bg-orange/30 hover:text-orange transition duration-200">
                                                <Link
                                                  href={`${BASE_URL_IMAGE}${lesson.notes}`}
                                                  className="flex gap-2 items-center"
                                                  download
                                                >
                                                  Download PDF-1 <GoDownload className="text-[20px]" />
                                                </Link>
                                              </button>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  }
                  {
                    topics.length === 0 &&
                    <div className="p-4 text-center">No topics found</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCelebration && (
        <>
          {/* Confetti Effect */}
          <Confetti width={width} height={height} />
          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
              <div className="p-4">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-xl font-bold">Congratulations!</h2>
                </div>
                {/* Body */}
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange mb-4">
                    You've completed the course!
                  </h3>
                  <p className="text-lg text-gray-700">
                    Well done on finishing all the modules. Your dedication and
                    hard work have paid off!
                  </p>
                  <div className="flex gap-3 justify-center">
                  <button
                    
                    className="mt-6 px-4 py-2 bg-orange text-white rounded-md hover:bg-orange/80 transition-colors"
                  >
                    <Link href={'/dashboard/certificate'}>
                    Get Certificate
                    </Link>
                  </button>
                  <button
                    
                    className="mt-6 px-4 py-2 bg-orange text-white rounded-md hover:bg-orange/80 transition-colors"
                    onClick={()=>setShowCelebration(false)}
                  >
                    
                    close
                   
                  </button>
                
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

