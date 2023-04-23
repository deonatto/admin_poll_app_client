import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import ClipLoader from "react-spinners/ClipLoader";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { colorTokens } from "theme";
import Message from "components/message/Message";
import "./Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isEditingPasswords, setIsEditingPasswords] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [credentials, setCredentials] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password: "",
    newPassword: "",
  });

  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    try {
      let res;
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, "3000");
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, "3000");
    }
  };

  const buttonIsDisabled = () => {
    const namesValidation =
      nameIsValid(credentials.firstName) &&
      nameIsValid(credentials.lastName) &&
      emailIsValid(credentials.email);
    if (isEditingPasswords) {
      return !(
        namesValidation &&
        passwordIsValid(credentials.password) &&
        credentials.password === repeatedPassword
      );
    }
    return !namesValidation;
  };

  const nameIsValid = (name) => {
    const regName = /\d/;
    const hasNumbers = regName.test(name);
    return !hasNumbers && name.length >= 2;
  };

  const emailIsValid = (email) => {
    return email.includes("@") && email.length > 8;
  };

  const passwordIsValid = (password) => {
    return password.length > 5;
  };

  return (
    <div className="profile-container">
      <div style={{ maxWidth: "515px" }}>
        {error && <Message color="red" message={error} />}
        {message && (
          <Message color={colorTokens.primary[500]} message={message} />
        )}
        {isLoading ? (
          <ClipLoader
            color={"#ffffff"}
            loading={isLoading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <form className="create-edit-form-container">
            <div className="create-edit-container">
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={
                    credentials.firstName
                      ? !nameIsValid(credentials.firstName)
                      : false
                  }
                  required
                  label="First Name"
                  value={credentials.firstName}
                  onChange={(e) => changeHandler("firstName", e)}
                  sx={{
                    flex: 1,
                  }}
                />
                <TextField
                  error={
                    credentials.lastName
                      ? !nameIsValid(credentials.lastName)
                      : false
                  }
                  required
                  label="Last Name"
                  value={credentials.lastName}
                  onChange={(e) => changeHandler("lastName", e)}
                  sx={{
                    flex: 1,
                  }}
                />
              </div>
              <TextField
                error={
                  credentials.email ? !emailIsValid(credentials.email) : false
                }
                required
                label="Email"
                value={credentials.email}
                onChange={(e) => changeHandler("email", e)}
              />
              <TextField
                disabled={true}
                required
                label="Role"
                value={credentials.role}
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
              <FormControl variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">
                  New Password
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
                  onChange={(e) => changeHandler("newPassword", e)}
                  value={credentials.newPassword}
                  error={
                    credentials.newPassword
                      ? !passwordIsValid(credentials.newPassword)
                      : false
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel
                  required
                  htmlFor="outlined-adornment-repeat-password"
                >
                  Repeat New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-repeat-password"
                  type={showRepeatPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowRepeatPassword(!showRepeatPassword)
                        }
                        edge="end"
                      >
                        {showRepeatPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  error={
                    repeatedPassword
                      ? repeatedPassword !== credentials.newPassword
                      : false
                  }
                  value={repeatedPassword}
                  required
                  label="Repeat Password"
                />
              </FormControl>
              <div>
                <Button
                  fullWidth
                  onClick={submitHandler}
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
                  Update
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
