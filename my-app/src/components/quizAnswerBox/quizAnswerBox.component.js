import React from "react";
import "./quizAnswerBox.styles.css";

function QuizAnswerBox({ answer, answerChecker }) {
  return (
    <button
      onClick={() => {
        answerChecker(answer);
      }}
    >
      {answer}
    </button>
  );
}

export default QuizAnswerBox;
