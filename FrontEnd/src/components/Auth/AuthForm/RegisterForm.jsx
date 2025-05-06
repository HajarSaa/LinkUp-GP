import { useState } from "react";
import AuthInput from "../AuthInput/AuthInput";
import styles from "./AuthForm.module.css";
import {signupService } from "../../../API/services/authService";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigateTo = useNavigate();

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

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "The passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setMessage("");
      await signupService(formData);
      navigateTo("/create-workspace");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {errors.email && <div className={styles.toast}>{errors.email}</div>}
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
          name="passwordConfirm"
          placeholder="name@gmail.com"
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />
        <button className={styles.authBtn} type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {message && (
        <p
        style={{ color:"red" }}
        >
        {message}
        </p>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
