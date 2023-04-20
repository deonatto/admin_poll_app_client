import React from "react";

const Message = ({ message, color }) => {
  return (
    <h2 style={{ color, textAlign: "center" }}>
      {color === "red" ? `Error: ${message}` : message}
    </h2>
  );
};

export default Message;
