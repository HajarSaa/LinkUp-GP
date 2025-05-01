import { useState } from 'react';
import styles from './AuthForm.module.css';
import AuthInput from '../AuthInput/AuthInput';
import { loginService } from '../../../../API/services/authService';
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await loginService(formData);
      setSuccessMessage("Login successful!");
      setApiError(null);

      // TODO: Navigate to home/dashboard or fetch user data
      console.log("Logged In:", res);
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong.");
      setSuccessMessage(null);
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
      <button className={styles.authBtn} type="submit">
        Login in
      </button>
      {apiError && (
        <p style={{ color: "red", marginTop: "10px" }}>{apiError}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}
    </form>
  );
}

export default LoginForm