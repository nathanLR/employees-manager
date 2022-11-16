import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import "./Layout.scss";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page">
      <header>
        <h1>my employee management</h1>
        <Button
          bgColor="#3498db"
          text="add"
          onClick={() => {
            navigate("add-employee", { relative: "path" });
          }}
          disabled={location.pathname === "/add-employee"}
        />
      </header>
      <main>{children}</main>
      <footer>2022 - nathan LE ROUX</footer>
    </div>
  );
};

export default Layout;
