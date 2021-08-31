import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import QuizTemplate from "../../components/quizTemplate/quizTemplate.component";
import QuizResults from "../../components/quizResults/quizResults.component";
import axios from "axios";
import "./quizpage.styles.css";

function Quizpage() {
  let { type } = useParams(); // type is either general question or id for for category
  let history = useHistory();
  let wasScoreSaved = false;

  const [done, setDone] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [quizData, setQuizData] = useState([]); // 10 question objects is stored here
  const [questionTracker, setQuestionTracker] = useState(0); // keepts track of question number
  const [question, setQuestion] = useState(""); // current question
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(""); // correct answer of current question
  const [score, setScore] = useState(0);

  useEffect(() => {
    function getQuizData() {
      // general is category number 9
      let category = type === "general" ? 9 : type;
      return axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple&encode=base64`, {
        withCredentials: false,
      });
    }

    if (done === false) {
      setScore(0);
      getQuizData().then((response) => {
        setQuizData(response.data.results);
      });
    }
  }, [type, done]);

  useEffect(() => {
    function setQuestionData() {
      if (quizData.length > 0 && questionTracker <= 9) {
        let currentQuestion = quizData[questionTracker];

        let question = atob(currentQuestion.question);
        let incorrectAnswers = currentQuestion.incorrect_answers.map(atob);
        let correctAnswer = atob(currentQuestion.correct_answer);

        setQuestion(question);
        setAnswers([...incorrectAnswers, correctAnswer]);
        setCorrectAnswer(correctAnswer);
      }
    }

    setQuestionData();
  }, [quizData, questionTracker]);

  function answerChecker(answer) {
    if (questionTracker === 9) {
      gameOver();
    }

    if (questionTracker > 9) return;

    if (answer === correctAnswer) {
      setScore((prevCount) => prevCount + 1);
      nextQuestion();
    } else {
      nextQuestion();
    }
  }

  function nextQuestion() {
    console.log(questionTracker);
    if (questionTracker < 9) {
      setQuestionTracker((prevCount) => prevCount + 1);
    }
  }

  function gameOver() {
    setDone(true);
    setQuestionTracker(0);
    setQuestion("");
    setQuizData([]);
    setAnswers([]);

    saveScore().then((scoreEntry) => {
      let shareLink = generateShareLink(scoreEntry?._id);
      setShareLink(shareLink);
    });

    setTimeout(() => {
      history.push(`/quizpage/${type}`);
    }, 1000);
  }

  async function saveScore() {
    console.log("wasScoreSaved", wasScoreSaved);
    if (wasScoreSaved) {
      return;
    }

    wasScoreSaved = true;
    try {
      let response = await axios.post(
        process.env.REACT_APP_BACKEND + "/save-score",
        {
          points: score,
          date: new Date(),
          topic: type === "general" ? 9 : Number(type),
        },
        { withCredentials: true }
      );
      console.log("User score saved.");
      return response.data;
    } catch (error) {
      wasScoreSaved = false;
      console.log(error);
      throw new Error("Could not save user score.");
    }
  }

  function generateShareLink(scoreId) {
    let baseURL = window.location.origin;
    let shareLink = baseURL + "/share/" + scoreId;
    return shareLink;
  }

  return (
    <div className="quiz-page">
      {done ? (
        <QuizResults score={score} shareLink={shareLink} setDone={setDone} done={done} type={type} />
      ) : (
        <QuizTemplate
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
          answerChecker={answerChecker}
          questionNumber={questionTracker + 1}
          score={score}
        />
      )}
    </div>
  );
}

export default Quizpage;
