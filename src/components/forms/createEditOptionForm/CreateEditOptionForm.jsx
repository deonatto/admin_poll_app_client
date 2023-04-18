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

/**
 * CreateEditPollForm Component
 *
 * @param {bool} isEdit - Determines if the form is in edit mode.
 * @param {string} token - JWT token for authentication.
 * @param {string} optionId - option ID for editing option details.
 * @param {string} btnName - Label for the form submission button.
 */

const CreateEditOptionForm = ({ isEdit = false, token, optionId, btnName }) => {
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

  // Fetch options details from API  for editing
  useEffect(() => {
    const getPollOption = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/option/${optionId}`,
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
      }
    };
    if (isEdit) {
        getPollOption();
    }
  }, [isEdit, token, optionId, headers]);

  const changeHandler = (credentialName, e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credentialName]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    try {
      let res;
      const link = isEdit
        ? `${process.env.REACT_APP_BASE_URL}/option/${optionId}`
        : `${process.env.REACT_APP_BASE_URL}/option`;
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

  const buttonIsDisabled = () => {
    const namesValidation =
      nameIsValid(credentials.name) &&
      descriptionIsValid(credentials.description);
    return !namesValidation;
  };

  const nameIsValid = (name) => {
    return name.length >= 2;
  };

  const descriptionIsValid = (description) => {
    return description.length >= 5;
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
    <form className="create-edit-form-container">
      {error && <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>}
      {message && (
        <h3 style={{ color: colorTokens.primary[500], textAlign: "center" }}>
          {message}
        </h3>
      )}
      {!isEdit && (
        <h3 style={{ textDecoration: "none", textAlign: "center" }}>
          Welcome, create a Poll Option.
        </h3>
      )}
      <div className="create-edit-container">
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
          <InputLabel id="select-label">Active</InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
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
      </div>
    </form>
  );
};

export default CreateEditOptionForm;