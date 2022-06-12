import React, { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const signup = () => {
    window.location.href("/register");
  };
  const validateLogin = (e) => {
    e.preventDefault();
    fetch("https://my-mern-login.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Accept': 'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA,", data);
        if (data.user) {
          localStorage.setItem("token", data.user);
          window.location.href = "/dashboard"; //changes the url pattern in the url
        } else {
          alert("Enter proper credentials");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <form onSubmit={validateLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter Username"
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
        <input
          type="password"
          placeholder="Enter Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <input type="submit" value="post" />
        <br />
        {/* <button onClick={signup}>Sign Up</button> */}
      </form>
    </div>
  );
}

export default Login;
