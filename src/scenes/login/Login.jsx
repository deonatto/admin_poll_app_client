import React, { useState } from "react";
import "./Login.css";
import RegisterForm from "components/forms/registerForm/RegisterForm";
import LoginForm from "components/forms/loginForm/LoginForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <h1>Admin Votin App</h1>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <h4 onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don´t have an account? Click here."
          : "Already have an account? Login here."}
      </h4>
    </div>
  );
};

export default Login;
