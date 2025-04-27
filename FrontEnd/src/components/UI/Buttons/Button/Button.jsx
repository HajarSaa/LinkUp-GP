// import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ onClick, children=null, icon=null, className="", ...props }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.any,
  children: PropTypes.any,
  icon: PropTypes.any,
  className: PropTypes.any,
};


export default Button;
