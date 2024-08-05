import React, { useState, useEffect } from 'react';

const TestCheck = () => {
  const [data, setData] = useState(null);
  const [responses, setResponses] = useState({});
  const [feedback, setFeedback] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const response = {
        "statusCode": 200,
        "data": {
          "_id": "667a6e9ff32db31fd377c42a",
          "student": {
            "_id": "667537a74fb9256286cc586e",
            "fullName": "TestStudent"
          },
          "teacher": {
            "_id": "6675373f4fb9256286cc5867",
            "fullName": "Test Teacher"
          },
          "test": {
            "_id": "66ad0d601ca3576e87da43ec",
            "name": "The First Science Test",
            "teacher": {
              "_id": "6675373f4fb9256286cc5867",
              "fullName": "Test Teacher"
            },
            "standard": 10,
            "subject": "Science",
            "questions": [
              {
                "question": "What is Newton First Law with formulas?",
                "topicId": "66ad0d321ca3576e87da43de",
                "score": 2,
                "_id": "66ad0d601ca3576e87da43ed"
              },
              {
                "question": "What is Newtoasdn First Law with formulas?",
                "topicId": "66ad0d32asd1ca3576e87da43de",
                "score": 3,
                "_id": "66ad0d601casda3576e87da43ed"
              }
              // Add more questions here
            ],
            "score": 2,
            "createdAt": "2024-08-02T16:46:24.263Z",
            "updatedAt": "2024-08-02T16:46:24.263Z",
            "__v": 0
          },
          "pdfPath": "http://res.cloudinary.com/diat8d1ft/image/upload/v1719299743/vp7vbe8q6uihkn1eizyi.pdf",
          "grade": "B+",
          "feedback": "Improve the specific topic",
          "createdAt": "2024-06-25T07:15:43.792Z",
          "updatedAt": "2024-08-05T17:12:22.796Z",
          "__v": 0
        },
        "message": "Answer copy fetched successfully",
        "success": true
      };

      setData(response.data);
    };

    fetchData();
  }, []);

  const handleScoreChange = (questionId, value) => {
    const question = data.test.questions.find(q => q._id === questionId);
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: Math.max(0, Math.min(value, question.score))
    }));
  };

  const handleMarkAsRight = (questionId) => {
    const question = data.test.questions.find(q => q._id === questionId);
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: question.score
    }));
    setRecommendations(prevRecommendations =>
      prevRecommendations.filter(rec => rec.questionId !== questionId)
    );
  };

  const handleMarkAsWrong = (questionId) => {
    const question = data.test.questions.find(q => q._id === questionId);
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: 0
    }));
    setRecommendations(prevRecommendations => [
      ...prevRecommendations,
      {
        questionId: question._id,
        topicId: question.topicId,
        score: question.score
      }
    ]);
  };

  const handleSubmit = () => {
    let newTotalScore = 0;
    
    data.test.questions.forEach(question => {
      const userScore = responses[question._id] || 0;
      if (userScore === question.score) {
        newTotalScore += question.score;
      }
    });

    setTotalScore(newTotalScore);

    const body = {
      answerid: data._id,
      score: newTotalScore,
      recommendations,
      feedback: feedback || data.feedback
    };

    console.log(body);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const { test, pdfPath, grade } = data;

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="flex-1">
        <div className="h-[600px] bg-muted rounded-lg overflow-hidden">
          <iframe src={pdfPath} title="Test PDF" className="w-full h-full"></iframe>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Assessment Questions for {test.name}</h2>
          <div className="grid gap-4">
            {test.questions.map((question) => (
              <div key={question._id} className="grid grid-cols-[1fr_80px_80px] items-center gap-4">
                <p>{question.question}</p>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-right"
                  placeholder="Score"
                  type="number"
                  min="0"
                  max={question.score}
                  value={responses[question._id] || ''}
                  onChange={(e) => handleScoreChange(question._id, parseInt(e.target.value, 10))}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkAsRight(question._id)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-500 hover:bg-green-600 text-white w-8 h-8"
                  >
                    Right
                  </button>
                  <button
                    onClick={() => handleMarkAsWrong(question._id)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-500 hover:bg-red-600 text-white w-8 h-8"
                  >
                    Wrong
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Grade: {grade}</div>
            <div className="text-md mt-2">
              Feedback:
              <textarea
                className="w-full h-20 mt-2 p-2 border border-input rounded-md"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Add your feedback here"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCheck;
