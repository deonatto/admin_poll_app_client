import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./RegisterForm.css";

const RegisterForm = () => {
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="register-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField label="First Name" />
            <TextField label="Last Name" />
            <TextField label="Role" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
