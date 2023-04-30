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
 * CreateEditPollOptionForm Component
 *
 * @param {bool} isEdit - Determines if the form is in edit mode.
 * @param {string} token - JWT token for authentication.
 * @param {string} optionId - Poll Option ID for editing option details.
 * @param {string} btnName - Label for the form submission button.
 */

const CreateEditPollOptionForm = ({
  isEdit = false,
  token,
  optionId,
  btnName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    description: "",
    pollId: "",
  });
  const [polls, setPolls] = useState([]);
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  // Fetch options details from API for editing
  useEffect(() => {
    const getPollOption = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/pollOption/${optionId}`,
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
      getPollOption();
    }
  }, [isEdit, token, optionId, headers]);

  // Fetch all polls
  useEffect(() => {
    const getAllPolls = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/poll/all`,
          {
            headers,
          }
        );
        setPolls(res.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllPolls();
  }, [headers]);

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
        ? `${process.env.REACT_APP_BASE_URL}/pollOption/${optionId}`
        : `${process.env.REACT_APP_BASE_URL}/pollOption`;
      if (isEdit) {
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
      pollId: "",
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
            label="Name"
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
            <InputLabel id="select-label">Poll ID</InputLabel>
            <Select
              placeholder="Select a poll"
              labelId="select-label"
              id="simple-select"
              label="Poll ID"
              value={credentials.pollId}
              onChange={(e) => changeHandler("pollId", e)}
            >
              {polls.map((poll, index) => (
                <MenuItem key={index} value={poll._id}>
                  {poll.name}
                </MenuItem>
              ))}
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

export default CreateEditPollOptionForm;
