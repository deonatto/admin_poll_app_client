import React, { useState } from "react";
import "./Login.css";
import CreateEditUserForm from "components/forms/createEditForm/CreateEditUserForm";
import LoginForm from "components/forms/loginForm/LoginForm";
import { colorTokens } from "theme";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div
        className="login-title-container"
        style={{ backgroundColor: colorTokens.primary[300] }}
      >
        <h1 style={{ color: colorTokens.grey[0] }}>Admin Votin App</h1>
      </div>
      <div className="form-container">
        {isLogin ? <LoginForm /> : <CreateEditUserForm isRegister={true}/>}
        <h4 onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don´t have an account? Click here."
            : "Already have an account? Login here."}
        </h4>
      </div>
    </div>
  );
};

export default Login;
