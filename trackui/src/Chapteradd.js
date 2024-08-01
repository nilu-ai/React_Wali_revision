import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Chapteradd = () => {
  // Define the array of values from 1 to 10
  const standards = Array.from({ length: 10 }, (_, index) => index + 1);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [submiterr, setSubmitErr] = useState('');
  const teacherId = "6675373f4fb9256286cc5867";
  const chapterName = useRef('');

  const handleStandardChange = (event) => {
    const value = event.target.value;
    setSelectedStandard(value);
    console.log(value); // Print the selected standard to the console
  };

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSelectedSubject(value);
    console.log(value); // Print the selected subject to the console
  };

  const submitdata = () => {
    const inputData = chapterName.current?.value;

    if (!inputData) {
      setSubmitErr('Chapter name is required');
      return;
    }

    const data = {
      "name": inputData,
      "subjectId": selectedSubject,
      "teacherId": teacherId
    };
    console.log('Submitted data:', data);
    setSubmitErr('');
  };

  useEffect(() => {
    const getSubjects = async (standardId) => {
      try {
        const response = await axios.get(`https://backend-pro-learning.vercel.app/api/subjects/standard/${standardId}`);
        const subjects = response.data.data.standards[0] ? response.data.data.standards[0].subjects : [];
        setSubjects(subjects);
        setSubmitErr(subjects.length === 0 ? 'No subjects available for this standard' : '');
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setSubjects([]);
        setSubmitErr('Error fetching subjects');
      }
    };
    if (selectedStandard) {
      getSubjects(selectedStandard);
    }
  }, [selectedStandard]);

  return (
    <>
      <div className="max-w-xl mx-auto p-5">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Standard:</label>
          <select
            id="standardDropdown"
            value={selectedStandard}
            onChange={handleStandardChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value=''>Select Standard</option>
            {standards.map((standard) => (
              <option key={standard} value={standard}>
                {standard}
              </option>
            ))}
          </select>
        </div>

        {subjects.length > 0 && (
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
            <select
              id="subjectDropdown"
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="border border-gray-300 rounded p-2"
            >
              <option value=''>Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <form onSubmit={e => e.preventDefault()}>
          <input type='text' ref={chapterName} className="border border-gray-300 rounded p-2 mb-2 w-full" placeholder="Type chapter name" />
          <p className={`text-red-500 mt-2 ${submiterr ? 'animate-bounce' : ''}`}>{submiterr}</p>
          <button
            onClick={submitdata}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Add the Chapter
          </button>
        </form>
      </div>
    </>
  );
};

export default Chapteradd;
