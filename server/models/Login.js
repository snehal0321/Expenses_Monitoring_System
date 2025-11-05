import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
});

const Login = mongoose.models.Login || mongoose.model("Login", loginSchema);
export default Login;
