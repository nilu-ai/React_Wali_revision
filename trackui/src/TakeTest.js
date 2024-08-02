import React, { useEffect, useState,useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../../../Loading/Loading';
import Header from '../../../../Navbar/header';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';

const TakeTest =()=>{
    const {id}=useParams()
    const navigate=useNavigate()
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [testdata,setTestData]=useState('')
    const studentId=useSelector(store=>store.user.data._id)
    const pdffile=useRef('')
    function submitpdf(){
        console.log(pdffile.current.files[0]);

        const body={
            studentId,
            teacherId:testdata._id,
            testId:id,
            pdf:pdffile.current.files[0]

        }
         axios.defaults.withCredentials = true;
axios.post(`${process.env.REACT_APP_API_URL}/api/physicaltest/answer-copies`).then(res=>console.log(res.data.data)).catch(err=>console.log(err))
    }
    useEffect(()=>{
        function testdata() {
            axios.defaults.withCredentials = true;
axios.get(`${process.env.REACT_APP_API_URL}/api/physicaltest/physical-tests/`).then(res=>setTestData(res.data.data[5])).catch(err=>console.log(err))
        }
        testdata()
    },[id])

    return <>
      <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
        <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
        <div className='p-2'>
       {console.log(testdata)}
     {testdata &&  <div class="bg-background rounded-lg border p-6 w-full max-w-2xl">
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold">{testdata.name}</h1>
        <div class="text-muted-foreground">{testdata?.teacher?.fullName} - {testdata.subject} - {testdata.standard}th Grade </div>
      </div>
      <div class="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5 text-muted-foreground"
        >
          <polyline points="8 18 12 22 16 18"></polyline>
          <polyline points="8 6 12 2 16 6"></polyline>
          <line x1="12" x2="12" y1="2" y2="22"></line>
        </svg>
      </div>
    </div>
  
    <div class="bg-card rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-1">
          <div class="text-lg font-medium">Questions:</div>
          <div className='flex flex-row gap-8 px-4'>
          <div>1: {testdata.questions[0].question}</div>
          <div>{testdata.questions[0].score}</div>
          </div>
        </div>
       
          
        </div>
      </div>
    </div>
   <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <input
          class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
          id="pdf-upload"
          type="file"
          ref={pdffile}
        />
      </div>
      <button onClick={submitpdf} class="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
        <span>Submit </span>
      </button>
    </div>
  </div>}
</div>
          </div>
          

    </>
}
export default TakeTest
