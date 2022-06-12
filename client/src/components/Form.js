import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = (e) => {
    e.preventDefault();
    fetch("https://my-mern-login.herokuapp.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        userName: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // console.log(response.json());
  };
  return (
    <div>
      <form onSubmit={registerUser}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
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
      </form>
    </div>
  );
}

export default Form;
