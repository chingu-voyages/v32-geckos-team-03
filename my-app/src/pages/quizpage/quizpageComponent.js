import React, { useState, useEffect } from "react";
import QuizTemplate from "../../components/quizTemplate/quizTemplate.component";

import axios from "axios";
function Quizpage() {
  const [quizData, setQuizData] = useState([]);
  const [questionTracker, setQuestionTracker] = useState(0);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnwsers, setCorrectAnwser] = useState("");

  function setQuestionData() {
    if (quizData.length > 0) {
      setQuestion(quizData[questionTracker].question);
      setAnswers(quizData[questionTracker].incorrect_answers);
      setAnswers(oldArray => [
        ...oldArray,
        quizData[questionTracker].correct_answer
      ]);
    }
  }

  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      )
      .then(res => {
        setQuizData(res.data.results);
      });
  }, []);
  // this useEffect is only used for the first component mounting only
  useEffect(() => {
    setQuestionData();
  }, [quizData]);

  useEffect(() => {
    if (questionTracker > 0) {
      setQuestionData();
    }
  }, [questionTracker]);
  console.log(quizData);

  return (
    <div className="App">
      <QuizTemplate question={question} answers={answers} />
    </div>
  );
}

export default Quizpage;
