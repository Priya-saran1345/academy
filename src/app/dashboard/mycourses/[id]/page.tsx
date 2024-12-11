"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BiChevronDown, BiChevronUp, BiDownload } from "react-icons/bi"
import { PiLayout } from "react-icons/pi"
import DashboardHeader from "@/components/dashboardHeader"
import { FiMinus, FiPlus } from "react-icons/fi"


export default function Page() {
    return (
        <div>


            <DashboardHeader />
            <div className="min-h-screen w-full lg:w-[95%] 2xl:w-[77%] mx-auto  p-8">
                <div className="mx-auto flex gap-2">
                    <CourseSidebar />
                    <CourseContent />
                </div>
            </div>
        </div>
    )
}

const courseModules = [
    {
        title: "Introduction to Python",
        lessons: [
            {
                title: "Introduction to Python Programming",
                duration: "9 min",
                videoUrl: "#",
                completed: true
            },
            {
                title: "Setting up the Python Environment",
                duration: "8 min",
                videoUrl: "#",
                completed: false
            },
            {
                title: "Writing Your First Python Program",
                duration: "8 min",
                videoUrl: "#",
                completed: false
            },
            {
                title: "Overview of Python and its Features",
                duration: "10 min",
                videoUrl: "#",
                completed: false,
                resources: ["PDF-1", "PDF-2"]
            }
        ]
    },
    {
        title: "Python Basics",
        lessons: [
            {
                title: "Variables and Data Types",
                duration: "12 min",
                videoUrl: "#",
                completed: false
            },
            {
                title: "Variables and Data Types",
                duration: "12 min",
                videoUrl: "#",
                completed: false
            }
        ]
    },
    {
        title: "Data Structures",
        lessons: [
            {
                title: "Lists and Tuples",
                duration: "15 min",
                videoUrl: "#",
                completed: false
            }
        ]
    },
    {
        title: "Functions and Modules",
        lessons: [
            {
                title: "Defining Functions",
                duration: "10 min",
                videoUrl: "#",
                completed: false
            }
        ]
    },
    {
        title: "Object-Oriented Programming (OOP)",
        lessons: [
            {
                title: "Classes and Objects",
                duration: "14 min",
                videoUrl: "#",
                completed: false
            }
        ]
    }
]

function CourseSidebar() {
    const [openSection, setOpenSection] = useState(null);
  
    const toggleSection = (section:any) => {
      setOpenSection(openSection === section ? null : section);
    };
  
    const modules = [
      "Module 1",
      "Module 2",
      "Module 3",
      "Module 4",
      "Module 5"
    ];
  
    return (
        <div className="w-[350px] flex-shrink-0 rounded-lg shadow p-4">
        <Image
          src="/images/course.png"
          height={350}
          width={410}
          alt="Python Course"
          className="w-full rounded-lg mb-4"
        />
  
        {/* Course Info */}
        <div className="border-b pb-4 mb-4">
          <h3 className="font-semibold text-xl text-gray-900">Master Python Programming</h3>
          <p className="text-sm text-gray-500 mt-1">
            Learn Python from scratch to advanced concepts
          </p>
        </div>
  
        {/* Collapsible Sections */}
        <div className="space-y-4">
  
          {/* Course Material */}
          <div>
            <button
              onClick={() => toggleSection('courseMaterial')}
              className="w-full flex items-center text-lg font-semibold mb-2 focus:outline-none"
            >
              {openSection === 'courseMaterial' ? (
                <BiChevronUp className="text-[24px] text-black" />
              ) : (
                <BiChevronDown className="text-[24px] text-black" />
              )}
              <span className="ml-2">Course Material</span>
            </button>
            <AnimatePresence>
              {openSection === 'courseMaterial' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden pl-4"
                >
                  <nav className="space-y-1">
                    {modules.map((module, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <div className="flex items-center text-textGrey font-medium text-[15px] gap-4">
                          <div className="w-[13px] h-[13px] border-2  border-orange rounded-full"></div>
                          {module}
                        </div>
                      </button>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
          {/* Progress */}
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
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden pl-4 text-sm text-gray-700"
                >
                  <p>Your progress: 60%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
          {/* Course Info */}
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
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden pl-4 text-sm text-gray-700 space-y-2"
                >
                  <p><strong>Duration:</strong> 12 weeks</p>
                  <p><strong>Level:</strong> Beginner to Advanced</p>
                  <p><strong>Language:</strong> English</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
        </div>
      </div>
    );
    
  }




function CourseContent() {
    const [openModule, setOpenModule] = useState<any>(null);
    const [expandedLessonIndex, setExpandedLessonIndex] = useState(null);

    const toggleLesson = (index: any) => {
        setExpandedLessonIndex(expandedLessonIndex === index ? null : index);
    };

    return (
        <div className="flex-1  min-w-0">
            <div className=" rounded-lg shadow overflow-hidden">
                {/* Course Modules */}
                <div className="p-4">
                    {courseModules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="mb-4">
                            <button
                                onClick={() => setOpenModule(openModule === moduleIndex ? null : moduleIndex)}
                                className="w-full flex items-center justify-between p-4 border-slate-200 border-1 hover:shadow-lg  mb-3 duration-250 rounded-lg"
                            >
                                <span className="font-medium">
                                    {moduleIndex + 1}. {module.title}
                                </span>
                                {openModule === moduleIndex ? (
                                    <div className="bg-orange/10 flex justify-center items-center rounded-md p-1 h-[30px]">
                                                                    <FiMinus className="  text-[24px] text-orange" />
                                                                </div>   
                                                                                             ) : (
                                           <div className="bg-orange/10 flex justify-center items-center rounded-md p-1 h-[30px]">
                                    <FiPlus
                                        className="text-[24px] text-orange" />
                                        </div>
                                )}
                            </button>
                            <AnimatePresence>
                                {openModule === moduleIndex && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div key={lessonIndex} className="flex flex-col gap-2 mt-2">
                                                <div
                                                    className="flex border-1 border-slate-200 p-3 rounded-lg items-start gap-3 text-sm cursor-pointer"
                                                    onClick={() => toggleLesson(lessonIndex)}
                                                >
                                                    {/* <PiLayout className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" /> */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between">

                                                            <div className=" items-center gap-2">
                                                                <div className="font-medium text-[18px] text-textGrey">{lesson.title}</div>
                                                                <div className="text-gray-500 mt-1 text-xs">Video • {lesson.duration}</div>
                                                            </div>
                                                            {expandedLessonIndex === lessonIndex ? (
                                                                    <BiChevronUp className="  text-[28px] text-orange" />
                                                              


                                                            ) : (
                                                                <BiChevronDown
                                                                    className="text-[28px] text-orange" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Collapsible Video Section with Animation */}
                                                <AnimatePresence>
                                                    {expandedLessonIndex === lessonIndex && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="  rounded-md">
                                                                <video controls className="w-full rounded-md">
                                                                    <source src={lesson.videoUrl} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


// export default CourseContent;
