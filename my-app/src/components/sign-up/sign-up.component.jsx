import React, { useState } from "react";

import "./sign-up.styles.css";
// import FormInput from "../form-input/form-input.component";

function SignUp() {
  const [state, setState] = useState({ email: "", password: "" });

  const handleSubmit = e => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          label="email"
        />

        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          label="password"
        />

        {/* <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle}>
            Sign in with goodle
          </CustomButton> */}
      </form>
    </div>
  );
}

export default SignUp;
