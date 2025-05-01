import { useState } from "react";
import AuthInput from "../AuthInput/AuthInput";
import styles from "./AuthForm.module.css";

function RegisterForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid Email. please provide a valide email";
    }

    if (formData.password.length < 8) {
      newErrors.password = "password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "The passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Correct Data:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        type="text"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <AuthInput
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <AuthInput
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        placeholder="name@gmail.com"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <button className={styles.authBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default RegisterForm;
