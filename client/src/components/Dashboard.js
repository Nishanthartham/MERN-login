import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const changeQuote = () => {
    //to get the exisiting quote from db
    fetch("https://my-mern-login.herokuapp.com/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data);
          setMyQuote(data.quote);
        } else {
          alert("new_error");
        }
      });

    // .then((res) => res.json()) //if this step is not done then all the useless info will also be displayed
    // .then((data) => {
    //   console.log("Data", data);
    // });
  };

  const updateQuote = (e) => {
    e.preventDefault();
    fetch("https://my-mern-login.herokuapp.com/quote", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    })
      .then((req) => req.json())
      .then((data) => {
        if (data.status === "ok") {
          setMyQuote(tempQuote);
          setTempQuote("");
        } else {
          alert("there is an error in dashboard", data.error);
        }
      });
  };
  const logout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
  };
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwt.decode(token);
    if (!user) {
      localStorage.removeItem("token");
      // history.replace("/login");
      window.location.href = "/login";
    } else {
      changeQuote();
    }
  }, []);
  const [myQuote, setMyQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  return (
    <>
      <div>You are signed in succesfully </div>
      <button onClick={logout}>Log Out</button>
      <h1>Your quote for today is {myQuote}</h1>
      <form onSubmit={updateQuote}>
        <label htmlFor="">Enter your quote</label>
        <input
          type="text"
          onChange={(e) => setTempQuote(e.target.value)}
          value={tempQuote}
        />
        <input type="submit" value="Update Quote" />
      </form>
    </>
  );
}

export default Dashboard;
