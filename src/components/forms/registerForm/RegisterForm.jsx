import React, { useState } from "react";
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
import "./RegisterForm.css";
import { colorTokens } from "theme";
import { ColorizeSharp } from "@mui/icons-material";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
    password: "",
  });
  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };
  return (
    <form className="register-form-container" onSubmit={handleSubmit}>
      <h4 style={{ textDecoration: "none" }}>
        Welcome, create your admin account and start creating polls.
      </h4>
      <div className="register-container">
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="First Name"
            onChange={(e) => changeHandler("firstName", e)}
            sx={{
              flex: 1,
            }}
          />
          <TextField
            label="Last Name"
            onChange={(e) => changeHandler("lastName", e)}
            sx={{
              flex: 1,
            }}
          />
        </div>
        <TextField label="Email" onChange={(e) => changeHandler("email", e)} />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
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
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-repeat-password">
            Repeat Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-repeat-password"
            type={showRepeatPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  edge="end"
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setRepeatPassword(e.target.value)}
            error={
              repeatPassword ? repeatPassword !== credentials.password : false
            }
            label="Repeat Password"
          />
        </FormControl>
        <div>
          <Button
            fullWidth
            type="submit"
            sx={{
              fontWeight: 'bold',
              margin: "10px 0",
              padding: "1rem",
              backgroundColor: colorTokens.primary[500],
              color: colorTokens.grey[0],
              "&:hover": {
                backgroundColor: colorTokens.primary[500],
                color: colorTokens.grey[0],
              },
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
