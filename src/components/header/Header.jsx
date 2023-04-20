import React from "react";
import { colorTokens } from "theme";
import "./Header.css";

const Header = ({ title, subTitle }) => {
  return (
    <div>
      <h2 className="header-title" style={{ color: colorTokens.primary[600] }}>
        {title}
      </h2>
      <h4 style={{ color: colorTokens.primary[600] }}>{subTitle}</h4>
    </div>
  );
};

export default Header;