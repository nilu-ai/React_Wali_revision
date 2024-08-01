import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Createsubject = () => {
  // Define the array of values from 1 to 10
  const standards = Array.from({ length: 10 }, (_, index) => index + 1);
  const [selectedValue, setSelectedValue] = useState('');
  const [standardata, setstandardata] = useState('');
  const [submiterr, setsubmiterr] = useState('');
  const [standardId, setstandardId] = useState('');
  const teacherId = "6675373f4fb9256286cc5867";
  const name = useRef('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    console.log(value); // Print the selected value to the console
  };

  const submitdata = () => {
    const inputData = name.current?.value;

    if (standardata.some(subject => subject.name.toLowerCase() === inputData.toLowerCase())) {
      setsubmiterr('Subject already exists');
    } else {
      const data = {
        "name": inputData,
        "standardId": standardId,
        "teacherId": teacherId
      };
      console.log('Submitted data:', data);
      setsubmiterr('');
    }
  };

  useEffect(() => {
    const getSubjects = async (standardId) => {
      try {
        const response = await axios.get(`https://backend-pro-learning.vercel.app/api/subjects/standard/${standardId}`);
        const res = response.data.data.standards[0] ? response.data.data.standards[0].subjects : 'No Data';
        setstandardata(res);
        if(!res==='No Data'){setstandardId(response.data.data.standards[0]._id);}
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setstandardata('');
      }
    };
    if (selectedValue) {
      getSubjects(selectedValue);
    }
  }, [selectedValue]);

  return (
    <>
      <div className="max-w-xl mx-auto p-5">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Standard:</label>
          <select
            id="numberDropdown"
            value={selectedValue}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value='' >Select Standard</option>
            {standards.map((standard) => (
              <option key={standard} value={standard}>
                {standard}
              </option>
            ))}
          </select>
        </div>
        {console.log(standardata)
        }
        {standardata ? (standardata == 'No Data' ? (
          <h1>No Standard. You need to add it.</h1>
        ) : (
          <>
            <form onSubmit={e => e.preventDefault()}>
              <input type='text' ref={name} className="border border-gray-300 rounded p-2 mb-2 w-full" placeholder="Type subject name" />
              <p className={`text-red-500 mt-2 ${submiterr ? 'animate-bounce' : ''}`}>{submiterr}</p>
              <button
                onClick={submitdata}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Add the Subject
              </button>
            </form>
          </>
        )):''}
      </div>
    </>
  );
};

export default Createsubject;
