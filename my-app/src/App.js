import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
function App() {
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      )
      .then(res => {
        console.log(res);
      });
  });
  return <div className="App"></div>;
}

export default App;
