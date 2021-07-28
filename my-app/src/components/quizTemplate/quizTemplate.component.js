import React from "react";
import QuizAnswerBox from "../quizAnswerBox/quizAnswerBox.component";

function QuizTemplate({
  question,
  answers,
  correctAnswer,
  answerChecker,
  questionNumber
}) {
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
        return (
          <QuizAnswerBox answer={ans} answerChecker={answerChecker} key={i} />
        );
      })}

      <div>
        <p> question {questionNumber}</p>
      </div>
    </div>
  );
}

export default QuizTemplate;
