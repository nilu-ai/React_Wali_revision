import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestComponent = () => {
  const standards = Array.from({ length: 10 }, (_, i) => i + 1); // Fixed standards 1 to 10
  const [subjects, setSubjects] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([]);
  const [teacherId, setTeacherId] = useState('');

  const getSubjects = async (standardId) => {
    try {
      const response = await axios.get(`https://backend-pro-learning.vercel.app/api/subjects/standard/${standardId}`);
      return response.data.data.standards[0] ? response.data.data.standards[0].subjects : [];
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return [];
    }
  };

  const getChapters = async (subjectId) => {
    try {
      const response = await axios.get(`https://backend-pro-learning.vercel.app/api/subjects/${subjectId}`);
      return response.data.data.chapters;
    } catch (error) {
      console.error('Error fetching chapters:', error);
      return [];
    }
  };

  const getTopics = async (chapterId) => {
    try {
      const response = await axios.get(`https://backend-pro-learning.vercel.app/api/chapters/${chapterId}`);
      return response.data.data.topics;
    } catch (error) {
      console.error('Error fetching topics:', error);
      return [];
    }
  };

  useEffect(() => {
    if (selectedStandard) {
      const fetchSubjects = async () => {
        const subjectsData = await getSubjects(selectedStandard);
        setSubjects(subjectsData);
      };
      fetchSubjects();
    }
  }, [selectedStandard]);

  const handleScoreChange = (index, newScore) => {
    const newScores = [...scores];
    newScores[index] = newScore;
    setScores(newScores);
  };

  const handleTopicChange = (questionIndex, topicId) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].topicId = topicId;
    setQuestions(newQuestions);
  };

  const handleChapterChange = async (questionIndex, chapterId) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].chapterId = chapterId;

    const topicsData = await getTopics(chapterId);
    newQuestions[questionIndex].topics = topicsData;
    setQuestions(newQuestions);
  };

  const handleSubjectChange = async (subjectId) => {
    setSelectedSubject(subjectId);
    setQuestions([]);
    const chaptersData = await getChapters(subjectId);
    setQuestions([{ chapterId: '', topics: [], question: '', topicId: '', score: 0, availableChapters: chaptersData }]);
    setScores([0]);
  };

  const handleQuestionChange = (index, question) => {
    const newQuestions = [...questions];
    newQuestions[index].question = question;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = async () => {
    const chaptersData = await getChapters(selectedSubject);
    setQuestions([...questions, { chapterId: '', topics: [], question: '', topicId: '', score: 0, availableChapters: chaptersData }]);
    setScores([...scores, 0]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    const newScores = [...scores];
    newScores.splice(index, 1);
    setScores(newScores);
  };

  const handleSubmit = () => {
    const formattedData = {
      teacherId,
      questions: questions.map((q, index) => ({
        question: q.question,
        topicId: q.topicId,
        score: scores[index] || 0
      })),
      totalScore: scores.reduce((acc, score) => acc + score, 0)
    };
    console.log(formattedData);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Test</h1>

      <div className="mb-5">
        <label className="block">Standard:</label>
        <select
          value={selectedStandard}
          onChange={(e) => {
            setSelectedStandard(e.target.value);
            setSubjects([]);
            setSelectedSubject('');
            setQuestions([]);
          }}
          className="block w-full mt-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Standard</option>
          {standards.map((standard) => (
            <option key={standard} value={standard}>
              {standard}
            </option>
          ))}
        </select>
      </div>

      {subjects.length > 0 && (
        <div className="mb-5">
          <label className="block">Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="block w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {questions.map((q, index) => (
        <div key={index} className="p-5 border-b border-gray-300">
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder="Enter question"
            className="block w-full mt-2 p-2 border border-gray-300 rounded"
          />
          <select
            value={q.chapterId}
            onChange={(e) => handleChapterChange(index, e.target.value)}
            className="block w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Chapter</option>
            {q.availableChapters &&
              q.availableChapters.map((chapter) => (
                <option key={chapter._id} value={chapter._id}>
                  {chapter.name}
                </option>
              ))}
          </select>
          <select
            value={q.topicId}
            onChange={(e) => handleTopicChange(index, e.target.value)}
            className="block w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Topic</option>
            {q.topics &&
              q.topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
          </select>
          <input
            type="number"
            value={scores[index]}
            onChange={(e) => handleScoreChange(index, parseInt(e.target.value, 10) || 0)}
            placeholder="Enter score"
            className="block w-full mt-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => handleRemoveQuestion(index)}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            X
          </button>
        </div>
      ))}
      <button
        onClick={handleAddQuestion}
        className="mt-5 p-2 bg-blue-500 text-white rounded"
      >
        + Add Question
      </button>

      <div className="mt-5 p-5 bg-gray-100 rounded">
        <p className="text-lg font-bold">Total Score: {scores.reduce((acc, score) => acc + score, 0)}</p>
      </div>
      <button
        className="mt-5 p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default TestComponent;
