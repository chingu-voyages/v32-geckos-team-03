import React, { useEffect, useState } from "react";
import QuizAnswerBox from "../quizAnswerBox/quizAnswerBox.component";

function QuizTemplate({ question, answers, correctAnswer }) {
  // shuffles anwsers
  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  return (
    <div className="quiz-template">
      <div className="question-container">
        <h1 className="question">{question}</h1>
      </div>
      {shuffle(answers).map((ans, i) => {
        return <QuizAnswerBox answers={ans} key={i} />;
      })}
    </div>
  );
}

export default QuizTemplate;
