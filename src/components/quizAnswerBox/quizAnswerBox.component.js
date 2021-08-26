import React, { useState } from "react";
import "./quizAnswerBox.styles.css";

function QuizAnswerBox({ answer, answerChecker, correctAnswer }) {
  const [displayAnswer, setDisplayAnswer] = useState("");
  // const [disabled, setDisabled] = useState(false);

  function revealAnswer() {
    setDisplayAnswer(correctAnswer);
  }

  return (
    <button
      className={
        answer == displayAnswer ? `green answer-button` : `answer-button`
      }
      onClick={() => {
        revealAnswer();

        setTimeout(() => {
          answerChecker(answer);
        }, 300);
      }}
    >
      {answer}
    </button>
  );
}

export default QuizAnswerBox;
