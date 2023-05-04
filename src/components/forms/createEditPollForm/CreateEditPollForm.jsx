import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { colorTokens } from "theme";
import Message from "components/message/Message";
import ClipLoader from "react-spinners/ClipLoader";
import { nameIsValid, descriptionIsValid } from "utils/util";
import FormWrapper from "components/UI/FormWrapper";
/**
 * CreateEditPollForm Component
 *
 * @param {bool} isEdit - Determines if the form is in edit mode.
 * @param {string} token - JWT token for authentication.
 * @param {string} pollId - Poll ID for editing poll details.
 * @param {string} btnName - Label for the form submission button.
 */

const CreateEditPollForm = ({ isEdit = false, token, pollId, btnName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    description: "",
    active: true,
  });
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  // Fetch user details from API  for editing
  useEffect(() => {
    const getPoll = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/poll/${pollId}`,
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
      getPoll();
    }
  }, [isEdit, token, pollId, headers]);

  //update the credentials state when user types in fields
  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };

  //submit the poll's credentials to the server for authentication
  const submitHandler = async () => {
    try {
      let res;
      const link = isEdit
        ? `${process.env.REACT_APP_BASE_URL}/poll/${pollId}`
        : `${process.env.REACT_APP_BASE_URL}/poll`;
      if (isEdit) {
        //check if password are empty, if they are, send credentials without passwords
        res = await axios.put(link, credentials, {
          headers,
        });
        resetCredentials(res.data.poll);
      } else {
        res = await axios.post(link, credentials, {
          headers,
        });
        resetCredentials();
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
      nameIsValid(credentials.name) &&
      descriptionIsValid(credentials.description);
    return !namesValidation;
  };

  const resetCredentials = (credentials = null) => {
    if (credentials) {
      setCredentials((prevState) => ({
        ...prevState,
        ...credentials,
      }));
      return;
    }
    setCredentials((prevState) => ({
      ...prevState,
      name: "",
      description: "",
      active: true,
    }));
  };

  return (
    <div>
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
        <FormWrapper message="Welcome, create a Poll." isEdit={isEdit}>
          <TextField
            error={credentials.name ? !nameIsValid(credentials.name) : false}
            required
            label="Poll Name"
            value={credentials.name}
            onChange={(e) => changeHandler("name", e)}
            sx={{
              flex: 1,
            }}
          />
          <TextField
            error={
              credentials.description
                ? !descriptionIsValid(credentials.description)
                : false
            }
            multiline
            rows={4}
            required
            label="Description"
            value={credentials.description}
            onChange={(e) => changeHandler("description", e)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Active</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Active"
              value={credentials.active}
              onChange={(e) => changeHandler("active", e)}
            >
              <MenuItem value={true}>YES</MenuItem>
              <MenuItem value={false}>NO</MenuItem>
            </Select>
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
              {btnName}
            </Button>
          </div>
        </FormWrapper>
      )}
    </div>
  );
};

export default CreateEditPollForm;
