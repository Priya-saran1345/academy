"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";

const Faq = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null); // No question is open initially

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked question
  };

  return (
    <div className="xl:px-60 bg-lightGrey flex py-10 lg:py-[80px] center">
      <div className="center flex-col bg-white py-8 md:py-[69px] mx-3 md:w-5/6 gap-8 rounded-lg shadow-md">
        <h3 className="text-[24px] md:text-4xl text-center md:text-left font-bold">
          Got <span className="text-orange">Questions</span>? We&apos;ve Got{" "}
          <span className="text-orange">Answers</span>!
        </h3>

        <div className="flex flex-col w-full px-4 md:px-10">
          {faqs.map((question, index) => (
            <motion.div
              key={index}
              layout
              className="flex flex-col mb-5 border-b pb-5"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-center">
                <span className="text-4xl md:text-5xl text-gray-400 mr-3 font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center justify-start w-3/4">
                  <span className="text-md md:text-xl font-semibold">{question.title}</span>
                </div>
                {openIndex === index ? (
                  <div
                    className="bg-orange h-10 w-10 rounded-full flex items-center justify-center cursor-pointer button-transition button-visible"
                    onClick={() => toggleAnswer(index)}
                  >
                    <RxCross2 className="text-white text-xl md:text-2xl" />
                  </div>
                ) : (
                  <div
                    className="cursor-pointer button-transition button-visible"
                    onClick={() => toggleAnswer(index)}
                  >
                    <GoPlus className="text-orange text-xl md:text-2xl" />
                  </div>
                )}
              </div>
              <motion.div
                layout
                initial={false}
                animate={{
                  maxHeight: openIndex === index ? 500 : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`overflow-hidden mt-4 text-gray-600 ml-12 md:ml-36`}
              >
                <p>{question.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
