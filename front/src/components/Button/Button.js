import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ bgColor, text, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="actionButton"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  bgColor: "#ecf0f1",
  text: "click",
  disabled: false,
};

export default Button;
