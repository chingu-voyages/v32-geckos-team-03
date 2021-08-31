import React, { useState } from "react";
import "./quizAnswerBox.styles.css";

function QuizAnswerBox({ answer, answerChecker, correctAnswer }) {
  const [displayAnswer, setDisplayAnswer] = useState("");
  // const [disabled, setDisabled] = useState(false);

  function revealAnswer() {
    setDisplayAnswer(correctAnswer);
  }

  let classes = "answer-button btn";
  return (
    <button
      className={answer === displayAnswer ? `green ${classes}` : displayAnswer !== "" ? `red ${classes}` : classes}
      onClick={() => {
        revealAnswer();

        setTimeout(() => {
          answerChecker(answer);
          setDisplayAnswer("");
        }, 1000);
      }}
    >
      {answer}
    </button>
  );
}

export default QuizAnswerBox;
