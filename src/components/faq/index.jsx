"use client";
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { GoPlus } from 'react-icons/go';

const questions = [
  "Alright, but what exactly do you do?",
  "How does the process work?",
  "What are your rates?",
  "Can I get a refund?"
];

const answers = [
  "This is the answer to the first question!",
  "Here's how our process works.",
  "Our rates are competitive and vary based on the service.",
  "Yes, we offer refunds under certain conditions."
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // Set the first question as open

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked question
  };
  return (
<div className="flex flex-col w-full px-4 md:px-10">
  {questions.map((question, index) => (
    <div key={index} className="flex flex-col mb-10 border-b pb-5">
      <div className="flex justify-between items-center">
        <span className="text-4xl md:text-5xl text-gray-400 font-bold">{String(index + 1).padStart(2, '0')}</span>
        <div className='flex items-center justify-start w-3/4'>
          <span className="text-lg md:text-xl font-semibold">{question}</span>
        </div>
        {openIndex === index ? (
          <div className="bg-orange h-10 w-10 rounded-full flex items-center justify-center cursor-pointer button-transition button-visible " onClick={() => toggleAnswer(index)}>
            <RxCross2 className='text-white text-xl md:text-2xl' />
          </div>
        ) : (
          <div className="cursor-pointer button-transition button-visible " onClick={() => toggleAnswer(index)}>
            <GoPlus className='text-orange text-xl md:text-2xl' />
          </div>
        )}
      </div>
      {openIndex === index && (
        <div className="mt-4 text-gray-600 ml-4 md:ml-36">
          <p>{answers[index]}</p>
        </div>
      )}
    </div>
  ))}
</div>

  );
};
export default Faq;
