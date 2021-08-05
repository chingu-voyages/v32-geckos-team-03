import React from "react";
import { Switch, Route } from "react-router-dom";

import Quizpage from "./pages/quizpage/quizpageComponent";
import Homepage from "./pages/homepage/homepageComponent";
import LoginPage from "./pages/loginPage/loginPageComponent.jsx";
import RegisterPage from "./pages/registerPage/registerPageComponent.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Quizpage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/homepage" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
