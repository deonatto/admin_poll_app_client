import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Alert,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./CreateEditUserForm.css";
import { colorTokens } from "theme";
import Message from "components/message/Message";
import { nameIsValid, emailIsValid, passwordIsValid } from "utils/util";
import FormWrapper from "components/UI/FormWrapper";

/**
 * CreateEditUserForm Component
 *
 * @param {bool} isEdit - Determines if the form is in edit mode.
 * @param {bool} isRegister - Determines if the form is in registration mode.
 * @param {string} token - JWT token for authentication.
 * @param {string} userId - User ID for editing user details.
 * @param {string} btnName - Label for the form submission button.
 */

const CreateEditUserForm = ({
  isEdit = false,
  isRegister = false,
  token,
  userId,
  btnName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditingPasswords, setIsEditingPasswords] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: isRegister ? "admin" : "user",
    password: "",
  });
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  // Fetch user details from API  for editing
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/${userId}`,
          {
            headers,
          }
        );
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          ...res.data,
        }));
      } catch (err) {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, "3000");
      } finally {
        setIsLoading(false);
      }
    };
    if (isEdit) {
      getUser();
    }
  }, [isEdit, token, userId, headers]);

  //update the credentials state when user types in fields
  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };

  //submit the user's credentials to the server for authentication
  const submitHandler = async () => {
    try {
      let res;
      if (isRegister) {
        res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/register`,
          credentials
        );
      } else {
        const link = isEdit
          ? `${process.env.REACT_APP_BASE_URL}/user/${userId}`
          : `${process.env.REACT_APP_BASE_URL}/user`;
        if (isEdit) {
          //check if password are empty, if they are, send credentials without passwords
          res = await axios.put(link, credentials, {
            headers,
          });
          resetCredentials(res.data.user);
        } else {
          res = await axios.post(link, credentials, {
            headers,
          });
          resetCredentials();
        }
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

  //determine if the button should be disabled or not
  const buttonIsDisabled = () => {
    const namesValidation =
      nameIsValid(credentials.firstName) &&
      nameIsValid(credentials.lastName) &&
      emailIsValid(credentials.email);
    if (isEditingPasswords || isRegister || !isEdit) {
      return !(
        namesValidation &&
        passwordIsValid(credentials.password) &&
        credentials.password === repeatedPassword
      );
    }
    return !namesValidation;
  };

  const resetCredentials = (credentials = null) => {
    if (credentials) {
      setCredentials((prevState) => ({
        ...prevState,
        ...credentials,
        password: "",
      }));
      setRepeatedPassword("");
      isEditingPasswords && setIsEditingPasswords(!isEditingPasswords);
      return;
    }
    setCredentials((prevState) => ({
      ...prevState,
      firstName: "",
      lastName: "",
      email: "",
      role: "user",
      password: "",
    }));
    setRepeatedPassword("");
  };

  return (
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
        <FormWrapper message="Welcome, create an account." isEdit={isEdit}>
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
          {repeatedPassword && repeatedPassword !== credentials.password && (
            <Alert severity="error">Passwords do not match...</Alert>
          )}
          {(!isEdit || isEditingPasswords) && (
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
          {(!isEdit || isEditingPasswords) && (
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
                onChange={(e) => setRepeatedPassword(e.target.value)}
                error={
                  repeatedPassword
                    ? repeatedPassword !== credentials.password
                    : false
                }
                value={repeatedPassword}
                required
                label="Repeat Password"
              />
            </FormControl>
          )}
          {isEdit && (
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
              {btnName}
            </Button>
          </div>
        </FormWrapper>
      )}
    </div>
  );
};

export default CreateEditUserForm;
