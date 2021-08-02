import React, { useState } from "react";

import "./sign-up.styles.css";

function SignUp() {
  const [state, setState] = useState({ username: "", email: "", password: "" });

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setState({ email: "", password: "", username: "" });
  // };

  const handleChange = e => {
    const { value, name } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="sign-up">
      <div className="sign-up-card">
        <h1 className="sign-up-header">Sign Up</h1>
        <form method="post" className="sign-up-form">
        {/* <form method="post" onSubmit={handleSubmit} className="sign-up-form"> */}
          <input
            name="name"
            type="text"
            value={state.name}
            onChange={handleChange}
            label="name"
            placeholder="name"
            className="form-input"
          />
          <input
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            label="email"
            placeholder="email"
            className="form-input"
          />
          <input
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            label="password"
            placeholder="password"
            className="form-input"
          />        

          <button type="submit" className="sign-up-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
