import React, { useState } from "react";
// import auth from '../utils/auth';
import { ReactComponent as Logo } from "./images/logo.svg";
import { useNavigate } from "react-router-dom";
import { reg } from "../ApiClient";
const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const Register = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [exists, setExists] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = state;
    const user = { email, password, firstName, lastName };
    const res = await reg(user);
    console.log({ res });
    if (res.status === 409) {
      alert(`${res.message}`);
      setState(initialState);
      setExists(true);
    } else {
      navigate("/main");
    }
  };

  const loginHandle = () => {
    navigate("/login");
  };

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  return (
    <section className="register">
      <br></br>
      <Logo />
      <h1>The Big Day</h1>
      <br></br>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="Surname"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
      <br></br>
      {exists ? <p> User already exists. Please login</p> : "Already a user?"}
      <br></br>
      <br></br>
      <button onClick={loginHandle} className="form-submit">
        Login
      </button>
    </section>
  );
};

export default Register;
