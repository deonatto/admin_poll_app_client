import React from "react";

const ErrorMessage = ({ message }) => {
  return <h2 style={{ color: "red", textAlign: "center" }}>Error: {message}</h2>;
};

export default ErrorMessage;
