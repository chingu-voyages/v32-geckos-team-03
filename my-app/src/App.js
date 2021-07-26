import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepageComponent";
import Quizpage from "./pages/quizpage/quizpageComponent";
import "./App.css";

import axios from "axios";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Quizpage} />
      </Switch>
    </div>
  );
}

export default App;
