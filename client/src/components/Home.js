import React from "react";

function Home() {
  const register = () => {
    window.location.href = "/register";
  };
  const login = () => {
    window.location.href = "/login";
  };
  return (
    <>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </>
  );
}

export default Home;
