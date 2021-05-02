import React, { useState, useEffect } from "react";

import auth0 from "auth0-js";

export default function signup() {
  const [userName, setUserName] = useState("user");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");

  // console.log(webAuth, "webAuth");

  const webAuth = new auth0.WebAuth({
    domain: "weblobby.us.auth0.com",
    clientID: "LuiCjOWUizDXRKMrZKzTpPtC9aXkzuEZ",
    redirectUri: "http://localhost:3000/posts",
    responseType: "token",
  });

  // if (window) {
  //   console.log("window is degined");
  //   webAuth.popup.callback();
  // }
  return (
    <div className="m-5">
      <div className="flex flex-col">
        <label>User Name </label>
        <input
          style={{ border: "1px solid black" }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Email </label>
        <input
          style={{ border: "1px solid black" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Password </label>
        <input
          style={{ border: "1px solid black" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="mt-5"
        type="submit"
        onClick={() => {
          webAuth.authorize({
            connection: "github",
          });
        }}
      >
        signup
      </button>
    </div>
  );
}
