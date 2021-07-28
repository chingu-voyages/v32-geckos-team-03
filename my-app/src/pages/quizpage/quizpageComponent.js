import React, { useState, useEffect } from "react";
import QuizTemplate from "../../components/quizTemplate/quizTemplate.component";

import axios from "axios";
function Quizpage() {
  const [quizData, setQuizData] = useState([]); // 10 question objects is stored here
  const [questionTracker, setQuestionTracker] = useState(0); // keepts track of question number
  const [question, setQuestion] = useState(""); // current question
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnwser] = useState(""); // correct anwser of current question

  // sets state from quizData
  function setQuestionData() {
    if (quizData.length > 0 && questionTracker <= 9) {
      setQuestion(quizData[questionTracker].question);
      setAnswers(quizData[questionTracker].incorrect_answers);
      setAnswers(oldArray => [
        ...oldArray,
        quizData[questionTracker].correct_answer
      ]);
      setCorrectAnwser(quizData[questionTracker].correct_answer);
    }
  }
  // function to go to next question
  function nextQuestion() {
    if (questionTracker < 9) {
      //    increments to next question
      setQuestionTracker(prevCount => prevCount + 1);

      console.log(questionTracker);
    } else alert("your done");
  }

  // function checks if answer is right or wrong
  function answerChecker(answer) {
    if (answer == correctAnswer) {
      alert("correct");

      nextQuestion();
    } else {
      console.log("wrong");
    }
  }
  // useffect is only ran once to fetch and store data from the api
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      )
      .then(res => {
        setQuizData(res.data.results);
      });
  }, []);
  // this useEffect is only used for the first component mount only
  useEffect(() => {
    setQuestionData();
  }, [quizData]);

  // useeffect sets new question data when thier is a new question
  useEffect(() => {
    if (questionTracker > 0) {
      setQuestionData();
    }
  }, [questionTracker]);

  return (
    <div className="App">
      <QuizTemplate
        question={question}
        answers={answers}
        correctAnswer={correctAnswer}
        answerChecker={answerChecker}
        questionNumber={questionTracker + 1}
      />
    </div>
  );
}

export default Quizpage;
