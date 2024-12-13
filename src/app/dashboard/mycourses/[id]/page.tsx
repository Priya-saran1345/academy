"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardSidebar from "@/components/dashboardSidebar";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL, BASE_URL_IMAGE } from "@/utils/api";
import { usePathname } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import { GoDownload } from "react-icons/go";

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [ApiData, setApiData] = useState<any>(null);
  const [moduleTitles, setModuleTitles] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [sidecontentindex, setsidecontentindex] = useState<number>(0);

  const [openModule, setOpenModule] = useState<number | null>(0);
  const [expandedLessonIndex, setExpandedLessonIndex] = useState<number | null>(0);
const [expandednotesIndex, setexpandednotesIndex] = useState<any>()
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

  console.log('topics', topics)
  const fetch = async () => {
    try {
      const token = Cookies.get("login_access_token");
      if (!token) {
        console.error("No token found");
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
  }, [id]);
  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
    // Add full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-orange " />);
    }
    // Add half star if there's a fractional part
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange " />);
    }
    return <div className="flex gap-1">{stars}</div>;
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
            <div className="mx-auto flex gap-2">
              <div className="w-[350px] sticky top-24 h-[90vh] flex-shrink-0 rounded-lg shadow p-4">
                <Image
                  src="/images/course.png"
                  height={350}
                  width={410}
                  alt="Python Course"
                  className="w-full rounded-lg mb-4"
                />
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-xl text-gray-900">{ApiData?.course_title}</h3>
                  <p
                    className="text-sm text-gray-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: `${ApiData?.course_description
                        ?.split(' ')
                        .slice(0, 8)
                        .join(' ')}...`,
                    }}
                  />
                  <p className="flex items-center mt-3  gap-1">
                    Rating: {renderStars(ApiData?.rating)}
                  </p>
                  <p className="flex items-center mt-1  gap-1">
                    Reviews: {ApiData?.review_count}
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
                                className="w-full items-center text-left px-4 border-none py-3 rounded-lg text-sm hover:bg-gray-100 focus:outline-none"
                              >
                                <div className="flex cursor-pointer text-textGrey font-medium text-[15px] gap-4">
                                  <div className="min-w-[13px] h-[13px] border-2 border-orange rounded-full"></div>
                                  {module}
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
                        <p>Your progress: 60%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <button
                    onClick={() => toggleSection('courseInfo')}
                    className="w-full flex items-center border-t border-slate-200 pt-4 text-lg font-semibold mb-2 focus:outline-none"
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
                        <p><strong>Duration:</strong> {ApiData?.duration} Weeks</p>
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
                            <span className="font-medium">{moduleIndex + 1}. {module?.title || 'Untitled Module'}</span>
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
                                  <>

                                    <div key={lessonIndex} className="flex flex-col gap-2 mt-2">
                                      <div
                                        className={`flex border-1 ${expandedLessonIndex === lessonIndex ? "border-orange" : "border-slate-200"} p-3 rounded-lg items-start gap-3 text-sm cursor-pointer`}
                                        onClick={() => toggleLesson(lessonIndex)}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between">
                                            <div className="flex items-start gap-2">
                                              <div className="w-[13px] h-[13px] border-2 mt-1 border-orange rounded-full"></div>
                                              <div className="items-center gap-2">
                                                <div className={`font-medium text-[18px] ${expandedLessonIndex === lessonIndex ? "text-orange" : "text-textGrey"}`}>{lesson?.title}</div>
                                                <div className="text-gray-500 mt-1 text-xs">Video • {lesson.duration}</div>
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
                                          >
                                            <div className="h-[500px] rounded-md">
                                              <ReactPlayer url={lesson?.video_url} controls width="100%" height="100%" />
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    {/* pdf content here */}

                                    <div key={lessonIndex} className={`flex  ${expandednotesIndex === lessonIndex ? "border-orange" : "border-slate-200"} rounded-lg border-1 flex-col gap-2 mt-2`}>
                                      <div
                                        className={`flex p-3 rounded-lg items-start gap-3 text-sm cursor-pointer`}
                                        onClick={() => toggleNotes(lessonIndex)}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between">
                                            <div className="flex items-start gap-2">
                                              <div className="w-[13px] h-[13px]  mt-1 border-2 border-orange  rounded-full"></div>
                                              <div className="items-center gap-2">
                                                <div className={`font-medium text-[18px] ${expandednotesIndex === lessonIndex ? "text-orange" : "text-textGrey"}`}>{lesson?.title} Notes</div>
                                                <div className="text-gray-500 mt-1 text-xs">Video • {lesson.duration}</div>
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
                                              <button className="px-4 py-3 rounded-md bg-orange  text-white  hover:bg-orange/30 hover:text-orange transition duration-200">
                                              <Link
                                                href={`${BASE_URL_IMAGE}${lesson.notes}`}
                                               className="flex gap-2 items-center"
                                                download
                                                >
                                                Download PDF-1  <GoDownload className="text-[22px]" />

                                              </Link>
                                                </button>
                                                
                                              {/* <a href="#" className="px-4 py-2 bg-orange-600  rounded-lg hover:bg-orange-500 transition duration-200">Download PDF-2</a> */}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </>

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
