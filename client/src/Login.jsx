import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // ✅ must match your export
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [open, setOpen] = React.useState(true);

  const handleLogin = async () => {
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const success = await login({ user, password });
    if (!success) {
      alert("Invalid username or password");
    } else {
      alert("Login successful!");
      setOpen(false);
    }
  };

  const dialogRef = useRef(null);

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
