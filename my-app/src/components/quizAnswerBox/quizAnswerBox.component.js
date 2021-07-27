import React from "react";
import "./quizAnswerBox.styles.css";

function QuizAnswerBox({ answers }) {
  return <button>{answers}</button>;
}

export default QuizAnswerBox;
