import React, { useState, useEffect } from "react";

import axios from "axios";
function Quizpage() {
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      )
      .then(res => {
        console.log(res);
      });
  });
  return <div className="App">Quiz Page</div>;
}

export default Quizpage;
