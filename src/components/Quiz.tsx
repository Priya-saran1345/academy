'use client';

import { BASE_URL } from '@/utils/api';
import React, { useState, useEffect } from 'react';
import { useapi } from '@/helpers/apiContext';
import toast from 'react-hot-toast';

const categories = [
  {
    id: 1,
    name: 'Data Science',
    subcategories: [
      { id: 101, name: 'Python for Data Science' },
      { id: 102, name: 'Machine Learning' },
      { id: 103, name: 'Data Visualization' },
    ],
  },
  {
    id: 2,
    name: 'Web Development',
    subcategories: [
      { id: 201, name: 'Frontend Development' },
      { id: 202, name: 'Backend Development' },
      { id: 203, name: 'Full Stack Development' },
    ],
  },
  {
    id: 3,
    name: 'Digital Marketing',
    subcategories: [
      { id: 301, name: 'SEO' },
      { id: 302, name: 'Social Media Marketing' },
      { id: 303, name: 'Content Marketing' },
    ],
  },
];

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<any>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: { question_id: string; selected_answer: string } }>({});
  const [message, setMessage] = useState('');
  const [quizResults, setQuizResults] = useState<any>(null);
  const { profile } = useapi();

  useEffect(() => {
    const category = categories.find((cat) => cat.name === selectedCategory);
    setSubcategories(category ? category.subcategories : []);
    setSelectedSubcategories([]);
  }, [selectedCategory]);

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
      setMessage('Wait, your quiz is generating');

      // const token = document.cookie.split('; ').find((row) => row.startsWith('login_access_token='))?.split('=')[1];
      // if (!token) {
      //   console.error('No token found');
      //   setMessage('No token found');
      //   return;
      // }

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
      console.log('quiz is',data)
      setQuestions(data.questions);
      setMessage('Quiz generated successfully');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setMessage('Failed to submit quiz');
    } finally {
      setLoading(false);
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
      const responses = Object.values(userAnswers);
      const response = await fetch(`${BASE_URL}submit-responses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: profile.id, responses: responses }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const data = await response.json();
      console.log('quiz response-----------------------',data)
      setQuizResults(data);
      toast.success('Quiz submitted successfully!');
      setMessage('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setMessage('Failed to submit quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subcategories</label>
          {subcategories.map((subcategory: any) => (
            <label key={subcategory.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={subcategory.name}
                checked={selectedSubcategories.includes(subcategory.name)}
                onChange={() => handleCheckboxChange(subcategory.name)}
                className="w-4 h-4"
              />
              <span>{subcategory.name}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            className="w-full p-2 border rounded"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="" disabled>
              Select level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-orange text-white px-4 py-2 rounded hover:bg-darkOrange"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Generate Quiz'}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}

      {
      // /* {questions.length > 0 && ( */}
        <div className="w-full h-full p-4 mt-8">
          <form onSubmit={handleSubmitQuiz}>
            {Object.entries(questions)?.map(([topic, topicQuestions]: any) => (
              <div key={topic}>
                <h3 className="font-bold text-lg mb-4">{topic}</h3>
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
                            className="w-4 h-4"
                            disabled={!!quizResults}
                          />
                          <span>{optionLabel}:</span>
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}

            {!quizResults && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </form>
        </div>
      
          }

      {quizResults && (
        <div className="mt-8 p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Overall Results</h3>
          <p>Total Questions: {quizResults.overall_result.total_questions}</p>
          <p>Attempted Questions: {quizResults.overall_result.attempted_questions}</p>
          <p>Correct Answers: {quizResults.overall_result.correct_answers}</p>
          <p>Score: {quizResults.overall_result.overall_percentage}%</p>

          <h4 className="text-lg font-bold mt-4">Topic-wise Results</h4>
          {Object.entries(quizResults.topic_results).map(([topic, result]: any) => (
            <div key={topic} className="mt-2">
              <h5 className="font-bold">{topic}</h5>
              <p>Total Questions: {result.total_questions}</p>
              <p>Attempted Questions: {result.attempted_questions}</p>
              <p>Correct Answers: {result.correct_answers}</p>
              <p>Score: {result.score_percentage}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
