/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import GoogleButton from 'react-google-button'
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useAuth } from "../../context/AuthContext";

// import cookies from 'js-cookie';
import './Style.scss'

function Login(props) {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  
  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.email === "" && value.password === "") {
      setError("Please enter an email address and password");
      return;
    } 
    if (value.email === "" && !value.email.includes("@") && !value.email.includes(".com")) {
      setError("Please enter a valid email address");
      
      return;
    } else if (value.password === "") {
      setError("Please enter a password");
      return;
    } else if (value.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    } else {
      setError("");
    }

    // cookies.setItem('email', value.email)
    localStorage.setItem('email', value.email)

    setSubmitButtonDisabled(true);

    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((error) => {
        setSubmitButtonDisabled(false);
        setError(error.message);
      });
  };

  // const {googleSignIn} = useAuth();
  // const handleGoogleSignIn = async () => {
  //   try{
  //     await googleSignIn();
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="text-center">
            <p>
              <Link to="/signup">New User?</Link>
            </p>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(event) => setValue((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(event) => setValue((prev) => ({ ...prev, password: event.target.value }))}
            />
          </div>
          <b id="e1">{error}</b>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary" id="b1" disabled={submitButtonDisabled}>
              Submit
            </button>
          </div>
        </div>
      </form>
      {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
    </div>
  );
}

export default Login;