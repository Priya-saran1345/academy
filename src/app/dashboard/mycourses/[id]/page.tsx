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
import { FaCircleCheck, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import { GoDownload } from "react-icons/go";
import { useapi } from "@/helpers/apiContext";

export default function Page() {
  const pathname = usePathname();
  const { profile } = useapi();
  const id = pathname.split("/").pop();
  const [ApiData, setApiData] = useState<any>(null);
  const [moduleTitles, setModuleTitles] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [sidecontentindex, setsidecontentindex] = useState<number>(0);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [expandedLessonIndex, setExpandedLessonIndex] = useState<number | null>(0);
  const [expandednotesIndex, setexpandednotesIndex] = useState<any>();
  const [lessonId, setlessonId] = useState<any>();
  const [userId, setuserId] = useState<any>();
  const [playedPercentage, setPlayedPercentage] = useState(0);
  const [initialProgress, setInitialProgress] = useState(0);
const [moduleprogress, setmoduleprogress] = useState<any>()
  const playerRef = useRef<any>(null);
  const router = useRouter();

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

  useEffect(() => {
    fetch();
    setuserId(profile?.id);
  }, [id, profile ,playedPercentage]);
  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 1; i <= fullStars; i++) 
    {
      stars.push(<FaStar key={i} className="text-orange " />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange" />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };

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
            )        // setInitialProgress(response.data.progress);
        console.log("The start video progress is", response.data.module_progress);
        // if (response.data.progress > 0 && playerRef.current) {
        //   playerRef.current.seekTo(response.data.progress / 100, "fraction");
        // }
      } catch (error) {
        console.error("Error fetching play count:", error);
      }
    };
    if (ApiData) {
      fetchPlayCount();
    }
  }, [ApiData]);

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
                <Image
                  src={ApiData?.card_image}
                  height={350}
                  width={410}
                  alt="Python Course"
                  className=" w-full rounded-lg mb-4"
                />
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
                          transition={{ duration: 0.4, ease:"easeInOut" }}
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
                                    moduleprogress[index]===100 ?
                                    <FaCircleCheck className="text-orange text-[18px] mt-1" />:
                                    <div className={`min-w-[13px] h-[13px] border-2  border-orange rounded-full`}></div>
                                  }
                                  {module}
                                  </div>
                                  <div className={`  text-orange`}>{Math.round(moduleprogress[index])}%</div>
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
                            className="w-full flex items-center justify-between p-4 border-slate-200 border-1 hover:shadow-lg mb-3 duration-250 rounded-lg"
                          >
                            <span className="font-semibold text-[18px]">{moduleIndex + 1}. {module?.title || 'Untitled Module'}</span>
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
                                                lesson.video_progress===100?
                                                <FaCircleCheck className="text-orange text-[18px] mt-1" />
                                                :
                                                <div className={`w-[13px] h-[13px]  border-2 mt-1 border-orange rounded-full`}></div>
                                              }
                                              <div className="items-center gap-2">
                                                <div className={`font-normal text-[16px] ${expandedLessonIndex === lessonIndex ? "text-orange" : "text-textGrey"}`}>{lesson?.title}</div>
                                                <div className="text-gray-500 mt-1 text-xs">Video•{lesson.video_url.duration}</div>
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
                                                  if (lesson.video_progress
                                                    > 0 && lesson.video_progress <100) {
                                                    playerRef.current.seekTo(lesson.video_progress / 100, "fraction");
                                                    console.log("Seeking to", lesson.video_progress / 100);
                                                  }
                                                }}
                                                onProgress={(state) => setPlayedPercentage(parseFloat((state.played * 100).toFixed(2)))}
                                                onPause={handlePauseOrEnd}
                                                onProgressChange={handlePauseOrEnd}
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
                                              <div className="min-w-[13px] h-[13px] mt-1 border-2 border-orange rounded-full"></div>
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
    </div>
  );
}

