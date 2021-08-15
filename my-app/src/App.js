import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./authContext";

import Quizpage from "./pages/quizpage/quizpageComponent";
import Homepage from "./pages/homepage/homepageComponent";
import LoginPage from "./pages/loginPage/loginPageComponent.jsx";
import SignUpPage from "./pages/signUpPage/signUpPageComponent.jsx";
import EditPage from "./pages/editPage/editPageComponent.jsx";

import "./App.css";
import LogoutPage from "./pages/logoutPage/logoutPageComponent";
import NavBar from "./components/navBar/navBar.component";
import ScoresPage from "./pages/scoresPage/scoresPageComponent";
import RankingPage from "./pages/rankingPage/rankingPageComponent";

class App extends Component {
  static contextType = AuthContext;

  isAuthenticationChecked() {
    return this.context !== undefined;
  }

  isUserAuthenticated() {
    let userInfo = this.context;
    return userInfo || false;
  }

  getDefaultPrivateRoute() {
    return <Route path="/" render={() => <Redirect to="/" />} />;
  }

  getDefaultPublicRoute() {
    return <Route path="/" render={() => <Redirect to="/login" />} />;
  }

  render() {
    if (!this.isAuthenticationChecked()) {
      // todo: redo this white screen before every page rendering
      // the first time the page renders the authentication checking
      // (which is an async call to the server) isn't done yet

      return null;
    }

    let isAuthenticated = this.isUserAuthenticated();

    return (
      <div className="container">
        <NavBar isAuthenticated={isAuthenticated} />
        {isAuthenticated ? (
          <Switch>
            <Route path="/homepage" component={Homepage} />
            <Route path="/quizpage/:type" component={Quizpage} />
            <Route path="/edit" component={EditPage} />
            <Route path="/scores" component={ScoresPage} />
            <Route path="/ranking" component={RankingPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route exact path="/" component={Homepage} />
            {this.getDefaultPrivateRoute()}
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/sign-up" component={SignUpPage} />
            {this.getDefaultPublicRoute()}
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
