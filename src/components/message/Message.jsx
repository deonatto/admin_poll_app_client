import React from "react";

/**
 * Message Component
 *
 * @param {string} message - The message to be displayed.
 * @param {string} color - The color of the message. Optional, default is black.
 */
const Message = ({ message, color }) => {
  return (
    <h2 style={{ color, textAlign: "center" }}>
      {color === "red" ? `Error: ${message}` : message}
    </h2>
  );
};

export default Message;
