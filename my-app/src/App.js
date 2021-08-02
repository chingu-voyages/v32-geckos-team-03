import React from "react";
import { Switch, Route } from "react-router-dom";

import Quizpage from "./pages/quizpage/quizpageComponent";
import LoginPage from "./pages/loginPage/loginPageComponent.jsx";
import RegisterPage from "./pages/registerPage/registerPageComponent.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Quizpage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
