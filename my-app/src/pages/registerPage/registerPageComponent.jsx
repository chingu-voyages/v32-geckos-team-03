import React, { Component } from "react";

function RegisterPage() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="title">
            <h1>Create an account</h1>
          </div>
          <div className="logo">
            <img src="" alt="logo here" />
          </div>
        </div>
        <div className="main">
          <p>
            <a href="/login">Login if you already have an account.</a>
          </p>
          <form className="form-register" method="post" action="/register">
            <div className="field">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" autocomplete="off" />
            </div>
            <div className="field">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" autocomplete="off" />
            </div>
            <div className="field">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="field">
              <input type="submit" value="Register" className="btn-login" />
            </div>
          </form>
        </div>
        <div className="footer">&copy; Quiz App 2021</div>
      </div>
    </div>
  );
}

export default RegisterPage;
