import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';

const QA = (props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/questions?productId=${props.productId}`)
      .then((res) => setQuestions(res.data.results))
      .catch(err => {
        // console.log(err);
      });
  }, []);
  return (
    <QuestionList questions={questions} />
  );
};

export default QA;