import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./LoginForm.css";
import { colorTokens } from "theme";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    try {
      /*
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        credentials
      );
      */
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, "3000");
    }
  };

  const buttonIsDisabled = () => {
    return !(
      emailIsValid(credentials.email) && passwordIsValid(credentials.password)
    );
  };
  const emailIsValid = (email) => {
    return email.includes("@") && email.length > 8;
  };
  const passwordIsValid = (password) => {
    return password.length > 5;
  };
  return (
    <form className="register-form-container">
      {error && <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>}
      <h4 style={{ textDecoration: "none" }}>
        Login into your account and start creating poll events.
      </h4>
      <div className="login-container">
        <TextField
          error={credentials.email ? !emailIsValid(credentials.email) : false}
          required
          label="Email"
          value={credentials.email}
          onChange={(e) => changeHandler("email", e)}
        />
        <FormControl variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => changeHandler("password", e)}
            value={credentials.password}
            error={
              credentials.password
                ? !passwordIsValid(credentials.password)
                : false
            }
            label="Password"
          />
        </FormControl>
        <div>
          <Button
            fullWidth
            onClick={handleSubmit}
            sx={{
              fontWeight: "bold",
              margin: "10px 0",
              padding: "1rem",
              backgroundColor: colorTokens.primary[500],
              color: colorTokens.grey[0],
              "&:hover": {
                backgroundColor: colorTokens.primary[500],
                color: colorTokens.grey[0],
              },
            }}
            disabled={buttonIsDisabled()}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
