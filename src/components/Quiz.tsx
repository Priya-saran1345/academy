'use client';

import { BASE_URL } from '@/utils/api';
import React, { useState, useEffect } from 'react';
import { useapi } from '@/helpers/apiContext';
import toast from 'react-hot-toast';
import { Select } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

import { MdOutlineKeyboardDoubleArrowRight, MdTopic } from 'react-icons/md';
const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: { question_id: string; selected_answer: string } }>({});
  const [message, setMessage] = useState('');
  const [quizResults, setQuizResults] = useState<any>(null);
  const { profile } = useapi();
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
  const [showquizsection, setshowquizsection] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const subcategories = categories && selectedCategory ? categories[selectedCategory] : [];
    setSubcategories(subcategories);
    setSelectedSubcategories([]);
  }, [selectedCategory, categories]);
  const handleCheckboxChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || selectedSubcategories.length === 0 || !level) {
      setMessage('Please fill in all fields');
      return;
    }

    const payload = {
      category: selectedCategory,
      topics: selectedSubcategories,
      level,
    };

    try {
      setLoading(true);
      setIsGenerating(true);
      setMessage('Wait, your quiz is generating');
      const response = await fetch(`${BASE_URL}generate-questions-live-multiple/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      console.log('quiz is', data)
      setQuestions(data.questions);
      setshowquizsection(true)
      setMessage('Quiz generated successfully');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setMessage('Failed to submit quiz');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };
  const handleChange = (questionId: string, option: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        question_id: questionId,
        selected_answer: option,
      },
    }));
  };

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responses = Object.values(userAnswers) || [];
      const response = await fetch(`${BASE_URL}submit-responses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: profile.id, responses: responses, topics: selectedSubcategories }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
      const data = await response.json();
      console.log('quiz response-----------------------', data)
      setQuizResults(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz.');
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}quizcategories/`);
      const data = await response.json();
      console.log("Fetched categories:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const overallData = {
    labels: ['Total Questions', 'Attempted Questions', 'Correct Answers'],
    datasets: [
      {
        label: 'Overall Results',
        data: [
          quizResults?.overall_result?.total_questions || 0,
          quizResults?.overall_result?.attempted_questions || 0,
          quizResults?.overall_result?.correct_answers || 0,
        ],
        backgroundColor: ['#F24A23', '#F24A2540', '#616162'],
      },
    ],
  };
  const handleChange1 = (value: any) => {
    setSelectedCategory(value);
  };

  const handleChange2 = (values: any) => {
    setSelectedSubcategories(values);
  };
  const handleChange3 = (values: any) => {
    setLevel(values);
  };

  const handleStartAgain = () => {
    setSelectedCategory('');
    setSelectedSubcategories([]);
    setLevel('');
    setQuestions([]);
    setUserAnswers({});
    setQuizResults(null);
    setshowquizsection(false);
    setMessage('');
    setIsGenerating(false);
  };
  return (
    <div className="w-full h-full p-4">
      <h2 className=" mb-4 font-medium text-[20px] text-black">  <span className='text-orange  text-2xl font-bold   '> Welcome:</span>  Create a Quiz</h2>
      <div className='flex justify-between gap-5'>
        <div className='w-[25%] sticky top-24 h-fit rounded-xl shadow p-4'>
          <div className='w-full'>
            {quizResults && (
              <div className=" p-4 rounded">
                <h4 className="text-lg font-bold  border-slate-200 pt-3">Topic-wise Results</h4>
                {Object.entries(quizResults.topic_results).map(([topic, result]: any) => {
                  const topicData = {
                    labels: ['Total Questions', 'Attempted Questions', 'Correct Answers'],
                    datasets: [
                      {
                        label: `${topic} Results`,
                        data: [result.total_questions, result.attempted_questions, result.correct_answers],
                        backgroundColor: ['#F24A23', '#F24A2540', '#616162'],
                      },
                    ],
                  };
                  return (
                    <div key={topic} className="mt-6 border-b-1 pb-4">
                      <h5 className="font-bold text-center">{topic}</h5>
                      <Bar className='mb-6' data={topicData} options={{ plugins: { legend: { display: false } } }} />
                      <div className='p-4 rounded-lg bg-lightGrey'>
                        <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Total Questions: {result.total_questions}</p>
                        <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Attempted Questions: {result.attempted_questions}</p>
                        <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Correct Answers: {result.correct_answers}</p>
                        <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Score: {result.score_percentage}%</p>
                      </div>
                    </div>
                  );
                })}
                <h3 className="text-xl mt-4  font-bold mb-2">Overall Result</h3>
                <Pie className='mb-4' data={overallData} />
                <div className='p-4 rounded-lg bg-lightGrey'>


                  <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />
                    Total Questions:<span>{quizResults.overall_result.total_questions}</span></p>
                  <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Attempted Questions: <span>{quizResults.overall_result.attempted_questions}</span></p>
                  <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Correct Answers: <span>{quizResults.overall_result.correct_answers}</span></p>
                  <p className='flex items-center'><MdOutlineKeyboardDoubleArrowRight />Score: <span>{quizResults.overall_result.overall_percentage}%</span></p>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex border-t-1 pt-4 flex-col gap-4">
            <div className='  flex-col   '>
              <h5 className="font-medium text-[20px] mb-3 ">Quiz Details:</h5>

              <div className=' mb-3'>
                <label className="block text-[16px] font-medium mb-1">Category</label>
                <Select
                  className="w-full border-none "
                  value={selectedCategory}
                  onChange={handleChange1}
                >
                  <Select.Option value="" disabled>
                    Select a category
                  </Select.Option>
                  {Object.keys(categories)?.map((key: any) => (
                    <Select.Option key={key} value={key}>
                      {key}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              {subcategories.length > 0 && (
                <div className="mb-3">
                  <label className="block text-[16px] font-medium mb-1">
                    Subcategories
                  </label>
                  <Select
                    mode="multiple"
                    className="w-full"
                    placeholder="Select subcategories"
                    value={selectedSubcategories}
                    onChange={handleChange2}
                    allowClear
                  >
                    {subcategories.map((subcategory) => (
                      <Select.Option key={subcategory} value={subcategory} clasName="py-2 bg-none">
                        {subcategory}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              <div className=''>
                <label className="block text-[16px] font-medium mb-1">Level</label>
                <Select
                  className="w-full "
                  value={level}
                  onChange={handleChange3}
                >
                  <Select.Option value="" disabled>
                    Select level
                  </Select.Option>
                  <Select.Option value="Beginner">Beginner</Select.Option>
                  <Select.Option value="Intermediate">Intermediate</Select.Option>
                  <Select.Option value="Advanced">Advanced</Select.Option>
                </Select>
              </div>
              <div className="flex gap-4 mt-4">
                {!showquizsection &&
                  <div>


                    {isGenerating ? <div className="ml-2 flex border-1 text-orange gap-5 border-orange p-2 rounded-lg ">Generating..
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange"></div>
                    </div> :
                      <button
                        type="submit"
                        className="bg-orange hover:cursor-pointer hover:bg-orange/30 hover:text-orange text-white px-4 py-2 rounded hover:bg-darkOrange disabled:opacity-50"
                        disabled={loading || isGenerating}
                      >
                        Generate Quiz
                      </button>
                    }
                  </div>}
                {showquizsection &&
                  <button
                    type="button"
                    onClick={handleStartAgain}
                    className="bg-orange text-white px-4 py-2 rounded hover:text-orange hover:bg-orange/30"
                  >
                    Start Again
                  </button>}
              </div>
            </div>

          </form>
        </div>
        {
          showquizsection &&
          <div className='w-[73%] shadow h-full rounded-lg p-4 '>
            {
              <div className="w-full h-full p-4 mt-8">
                <form onSubmit={handleSubmitQuiz}>
                  {Object.entries(questions)?.map(([topic, topicQuestions]: any) => (
                    <div key={topic}>
                      <h3 className="font-bold text-lg mb-4 flex items-center"> <MdTopic className='text-orange text-[24px]' />
                        Topic: &nbsp;<span>{topic}</span> </h3>
                      {topicQuestions.map((question: any, index: number) => (
                        <div key={question.id} className="mb-6">
                          <h4 className="font-bold text-md mb-2">
                            {index + 1}. {question.question_text}
                          </h4>
                          {question.options.map((option: string, idx: number) => {
                            const optionLabel = String.fromCharCode(65 + idx);
                            const userSelected = userAnswers[question.id]?.selected_answer === optionLabel;
                            return (
                              <label key={idx} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={optionLabel}
                                  checked={userSelected}
                                  onChange={() => handleChange(question.id, optionLabel)}
                                  className="w-4  h-4"
                                  disabled={!!quizResults}
                                />
                                <span className=''>{optionLabel}:</span>
                                <span className=''>{option}</span>
                              </label>
                            );
                          })}
                            {quizResults && question.correct_answer && (
                          <div className="mt-2 text-[18px] text-orangce">
                              <div>
                              Your Answer: <span className='text-orange'>{userAnswers[question.id]?.selected_answer || 'Not selected'}</span>
                            </div>
                              <div>
                                Correct Answer: <span className='text-orange'>{question.correct_answer}</span>
                              </div>
                          </div>
                            )}
                        </div>

                      ))}
                    </div>
                  ))}
                  {!quizResults &&
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                  }
                </form>
              </div>
            }

          </div>
        }
      </div>

    </div>
  );
};

export default Quiz;

