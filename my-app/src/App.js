import React from "react";
import { Switch, Route } from "react-router-dom";

import Quizpage from "./pages/quizpage/quizpageComponent";
import "./App.css";

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
