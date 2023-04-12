import React, { useEffect, useState } from "react";
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
import "./CreateEditUserForm.css";
import { colorTokens } from "theme";

const CreateEditUserForm = ({
  isEdit = false,
  isRegister = false,
  token,
  userId,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditingPasswords, setIsEditingPasswords] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
    password: "",
    repeatPassword: "",
  });
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          ...res.data,
        }));
      } catch (err) {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, "3000");
      }
    };
    if (isEdit) {
      getUser();
    }
  }, [isEdit, token, userId]);

  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      let res;
      if (isRegister) {
        console.log("im register");
        res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/register`,
          credentials
        );
      } else {
        console.log("im create - edit");
      }
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
    return !(
      nameIsValid(credentials.firstName) &&
      nameIsValid(credentials.lastName) &&
      emailIsValid(credentials.email) &&
      passwordIsValid(credentials.password) &&
      credentials.password === credentials.repeatPassword
    );
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
    <form className="create-edit-form-container">
      {error && <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>}
      {message && (
        <h3 style={{ color: colorTokens.primary[500], textAlign: "center" }}>
          {message}
        </h3>
      )}
      {!isEdit && (
        <h4 style={{ textDecoration: "none" }}>
          Welcome, create your admin account and start creating polls.
        </h4>
      )}
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
              credentials.lastName ? !nameIsValid(credentials.lastName) : false
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
          error={credentials.email ? !emailIsValid(credentials.email) : false}
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
        {(isRegister || isEditingPasswords) && (
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
        )}
        {(isRegister || isEditingPasswords) && (
          <FormControl variant="outlined">
            <InputLabel required htmlFor="outlined-adornment-repeat-password">
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
              onChange={(e) => changeHandler("repeatPassword", e)}
              error={
                credentials.repeatPassword
                  ? credentials.repeatPassword !== credentials.password
                  : false
              }
              value={credentials.repeatPassword}
              required
              label="Repeat Password"
            />
          </FormControl>
        )}
        {!isRegister && (
          <p
            className="edit-passwords-msg"
            onClick={() => setIsEditingPasswords(!isEditingPasswords)}
          >
            Edit password ?
          </p>
        )}
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
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateEditUserForm;
