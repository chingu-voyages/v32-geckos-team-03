import React, { useState, useEffect } from "react";
import "./quizpage.styles.css";
import { useParams, Link, useHistory } from "react-router-dom";
import QuizTemplate from "../../components/quizTemplate/quizTemplate.component";

import axios from "axios";
import QuizResults from "../../components/quizResults/quizResults.component";

function Quizpage() {
  let { type } = useParams(); // type is either general question or id for for catigory
  let history = useHistory();
  let wasScoreSaved = false;

  // const userInfo = useContext(AuthContext);
  const [done, setDone] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [quizData, setQuizData] = useState([]); // 10 question objects is stored here
  const [questionTracker, setQuestionTracker] = useState(0); // keepts track of question number
  const [question, setQuestion] = useState(""); // current question
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnwser] = useState(""); // correct answer of current question
  const [score, SetScore] = useState(0);

  // function to go to next question
  function nextQuestion() {
    if (questionTracker < 9) {
      //    increments to next question
      setQuestionTracker(prevCount => prevCount + 1);

      // console.log(questionTracker);
    } else {
      gameOver();
      alert("your done");
      console.log("You're done.");
      if (!wasScoreSaved) {
        wasScoreSaved = true;
        saveScore()
          .then(() => {
            console.log("User score saved.");
          })
          .catch(error => {
            wasScoreSaved = false;
            console.log(error);
          });
      }
      endQuiz();
    }
  }

  function endQuiz() {
    setDone(true);
    saveScore().then(scoreEntry => {
      let shareLink = generateShareLink(scoreEntry?._id);
      console.log(shareLink);
      setShareLink(shareLink);
    });
  }

  function generateShareLink(scoreId) {
    let baseURL = window.location.origin;
    let shareLink = baseURL + "/share/" + scoreId;
    return shareLink;
  }

  async function saveScore() {
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
          topic: type,
          topic: type === "general" ? 9 : Number(type)
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

  // function checks if answer is right or wrong
  function answerChecker(answer) {
    if (answer === correctAnswer) {
      // alert("correct");
      SetScore(prevCount => prevCount + 1);
      console.log("correct");

      nextQuestion();
    } else {
      nextQuestion();
    }
  }

  // function displays new page when quiz is over
  function gameOver() {
    setTimeout(() => {
      history.push("/homepage");
    }, 1000);
  }
  // useffect is only ran once to fetch and store data from the api
  useEffect(() => {
    if (type === "general") {
      axios
        .get(
          "https://opentdb.com/api.php?amount=10&type=multiple&encode=base64",
          { withCredentials: false }
        )
        .then(res => {
          setQuizData(res.data.results);
        });
    } else if (type !== "general") {
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=${type}&type=multiple&encode=base64`,
          {
            withCredentials: false
          }
        )
        .then(res => {
          setQuizData(res.data.results);
          console.log(res);
        });
    }
  }, [type]);

  // axios
  //   .get(
  //     `https://opentdb.com/api.php?amount=10&category=${type}&type=multiple&encode=base64`,
  //     {
  //       withCredentials: false
  //     }
  //   )
  //   .then(res => {
  //     setQuizData(res.data.results);
  //     console.log(res);
  //   });
  // // }
  // // } else if (type !== "general") {
  // axios
  //   .get(
  //     `https://opentdb.com/api.php?amount=10&category=${type}&type=multiple&encode=base64`,
  //     {
  //       withCredentials: false
  //     }
  //   )
  //   .then(res => {
  //     setQuizData(res.data.results);
  //     // console.log(res);
  //   });
  // // }

  // this useEffect is only used for the first component mount only
  useEffect(() => {
    // sets state from quizData
    function setQuestionData() {
      if (quizData.length > 0 && questionTracker <= 9) {
        setQuestion(atob(quizData[questionTracker].question));

        let anwsers = quizData[questionTracker].incorrect_answers;
        //  atob function is used to encode api string
        let newArray = anwsers.map(anw => {
          return atob(anw);
        });

        setAnswers(newArray);

        setAnswers(oldArray => [
          ...oldArray,
          atob(quizData[questionTracker].correct_answer)
        ]);
        setCorrectAnwser(atob(quizData[questionTracker].correct_answer));
      }
    }

    setQuestionData();
  }, [quizData, questionTracker]);

  return (
    <div className="quiz-page">
      {/* <button type="button" className="submit-btn" onClick={submitRandomQuiz}>
        Random Quiz Result (Dev)
      </button> */}
      {done ? (
        <QuizResults score={score} shareLink={shareLink} />
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
