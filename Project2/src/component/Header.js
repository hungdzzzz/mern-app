import React from 'react'
import "./Header.css"

 import { Component, useEffect, useState } from "react";
function Main() {
 const [userData, setUserData] = useState("");
 useEffect(() => {
    fetch("http://localhost:8000/api/v4/userdata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        setUserData(data.data);

               if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      });
  }, []);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };
  return (
    <div className='Header'>

<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)">Task Manager</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">
       
        
      </ul>
      <form class="d-flex">
      <li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">{userData.fname}{userData.lname}</a>
  <ul class="dropdown-menu">
    <li><a onClick={logOut} class="dropdown-item" href="#">Logout</a></li>
    </ul>
</li>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Main