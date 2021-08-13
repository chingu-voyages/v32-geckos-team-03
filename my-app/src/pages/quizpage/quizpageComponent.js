import React, { useState, useEffect } from "react";
import "./quizpage.styles.css";
import { useParams } from "react-router-dom";
import QuizTemplate from "../../components/quizTemplate/quizTemplate.component";

import axios from "axios";
function Quizpage() {
  let { type } = useParams(); // type is either general question or id for for catigory
  console.log(type);

  const [quizData, setQuizData] = useState([]); // 10 question objects is stored here
  const [questionTracker, setQuestionTracker] = useState(0); // keepts track of question number
  const [question, setQuestion] = useState(""); // current question
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(""); // correct answer of current question
  const [score, SetScore] = useState(0);

  // sets state from quizData
  function setQuestionData() {
    if (quizData.length > 0 && questionTracker <= 9) {
      setQuestion(atob(quizData[questionTracker].question));

      let answers = quizData[questionTracker].incorrect_answers;
      //  atob function is used to encode api string
      let newArray = answers.map((anw) => {
        return atob(anw);
      });

      setAnswers(newArray);

      setAnswers((oldArray) => [...oldArray, atob(quizData[questionTracker].correct_answer)]);
      setCorrectAnswer(atob(quizData[questionTracker].correct_answer));
    }
  }

  // function to go to next question
  function nextQuestion() {
    if (questionTracker < 9) {
      //    increments to next question
      setQuestionTracker((prevCount) => prevCount + 1);

      console.log(questionTracker);
    } else alert("your done");
  }

  // function checks if answer is right or wrong
  function answerChecker(answer) {
    if (answer === correctAnswer) {
      alert("correct");
      SetScore((prevCount) => prevCount + 1);
      nextQuestion();
    } else {
      nextQuestion();
    }
  }
  // useffect is only ran once to fetch and store data from the api
  useEffect(() => {
    if (type === "general") {
      axios
        .get("https://opentdb.com/api.php?amount=10&type=multiple&encode=base64", { withCredentials: false })
        .then((res) => {
          setQuizData(res.data.results);
        });
    } else if (type !== "general") {
      axios
        .get(`https://opentdb.com/api.php?amount=10&category=${type}&type=multiple&encode=base64`, {
          withCredentials: false,
        })
        .then((res) => {
          setQuizData(res.data.results);
          console.log(res);
        });
    }
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
    <div className="quiz-page">
      <QuizTemplate
        question={question}
        answers={answers}
        correctAnswer={correctAnswer}
        answerChecker={answerChecker}
        questionNumber={questionTracker + 1}
        score={score}
      />
    </div>
  );
}

export default Quizpage;
