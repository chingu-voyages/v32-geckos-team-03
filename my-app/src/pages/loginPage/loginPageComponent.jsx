import React, { Component } from "react";

function LoginPage() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="title">
            <h1>Welcome to Quiz App</h1>
          </div>
          <div className="logo">
            <img src="" alt="logo here" />
          </div>
          <div className="description">
            Take a quiz, challenge yourself and share it with your friends!
          </div>
        </div>
        <div className="main">
          <p>
            Please login below to start taking quizzes or <br />
            <a href="/register">create an account by clicking here.</a>
          </p>
          <form className="form-login" method="post" action="/login">
            <div className="field">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" autocomplete="off" />
            </div>
            <div className="field">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="field">
              <input type="submit" value="Login" className="btn-login" />
            </div>
          </form>
        </div>
        <div className="footer">&copy; Quiz App 2021</div>
      </div>
    </div>
  );
}

export default LoginPage;
