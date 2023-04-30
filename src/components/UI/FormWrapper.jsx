import React from "react";
import "./FormWrapper.css";

const FormWrapper = ({ isEdit, message, children }) => {
  return (
    <form className="create-edit-form-container">
      {!isEdit && (
        <h3 style={{ textDecoration: "none", textAlign: "center" }}>
          {message}
        </h3>
      )}
      <div className="create-edit-container">{children}</div>
    </form>
  );
};

export default FormWrapper;
