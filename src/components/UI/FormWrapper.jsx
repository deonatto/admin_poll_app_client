import React from "react";
import "./FormWrapper.css";

/**
 * component that provides a wrapper around form components.
 *
 * @param {Boolean} isEdit - A boolean value indicating whether the form is being used for editing or creating.
 * @param {String} message - A string value used as a header message for the form.
 * @param {ReactNode} children - A ReactNode representing the form components.
 */

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
