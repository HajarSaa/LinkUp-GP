import styles from "./AuthInput.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const AuthInput = ({ label, name, value, onChange, type = "text", error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const status = error ? "error" : "";
  const shouldFloat = isFocused || value;

  const isPassword = type === "password";

  return (
    <div className={styles.auth_input}>
      <div className={styles.input_container}>
        <label className={shouldFloat ? styles.floating : ""} htmlFor={name}>
          {label}
        </label>

        <input
          id={name}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="on"
          className={`${styles.input} ${status && styles[status]}`}
        />

        {isPassword && (
          <div className={styles.eyeBox}>
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

AuthInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
};

export default AuthInput;
