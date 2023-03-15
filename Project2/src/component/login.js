import React, { Component, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
export default function Login() {
  const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
 const [userData, setUserData] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
 const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
     if (email == "") {
      Swal.fire({
  icon: 'error',
  
  text: 'Email trong ',
  
})
    } else if (   password == ""){
        Swal.fire({
  icon: 'error',
  
  text: ' password trong ',
  
})
    }else if (  !regEx.test(email)){
        Swal.fire({
  icon: 'error',
  
  text: ' email khong dung kieu ',
  
})
    }

  else {
     Swal.fire({
  icon: 'error',
  
  text: 'email hoac mat khau khong dung',
  
})
        }
    console.log(email, password);
    fetch("http://localhost:8000/api/v4/signin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
         setUserData(data.data);
        if (data.status == "ok") {
            Swal.fire({
  icon: 'success',
  
  text: 'dang nhap thanh cong',
  
})
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
setTimeout(() => {
  window.location.href = "./Home";
}, 2000);
          
        }
      })

      
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
                value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
