import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ import this
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [open, setOpen] = React.useState(true);
  const dialogRef = useRef(null);
  const navigate = useNavigate(); // ✅ initialize navigation

  const handleLogin = async () => {
    const user = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!user || !password) {
      alert("Please enter both username and password");
      return;
    }

    const success = await login({ user, password });
    if (!success) {
      alert("Invalid username or password");
    } else {
      setOpen(false);

      // ✅ Redirect to main page after login
      navigate("/");
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  return (
    <div className="dialog-backdrop">
      <dialog ref={dialogRef} className="login-module">
        <h2>Login</h2>
        <input id="username" type="text" placeholder="Username" />
        <br />
        <input id="password" type="password" placeholder="Password" />
        <br />
        <button onClick={handleLogin}>Login</button>
      </dialog>
    </div>
  );
}

export default Login;
