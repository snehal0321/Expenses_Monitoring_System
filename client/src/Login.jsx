import React, { useContext } from "react";
import { AuthContext } from "./AuthContext"; // ✅ must match your export
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const success = await login({ user, password });
    if (!success) {
      alert("Invalid username or password");
    } else {
      alert("Login successful!");
    }
  };

  return (
    <div className="dialog-backdrop">
      <div className="login-module">
        <h2>Login</h2>
        <input id="username" type="text" placeholder="Username" />
        <br />
        <input id="password" type="password" placeholder="Password" />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
