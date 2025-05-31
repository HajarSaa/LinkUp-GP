import { useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import AuthInput from "../AuthInput/AuthInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../../../routes/Spinner/Spinner";
import useLogin from "../../../API/hooks/useLogin";
import { validateLoginForm } from "../../../utils/validation";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const loginMutation = useLogin();

  useEffect(() => {
    console.log("loginMutation:", loginMutation);
  }, [loginMutation]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    loginMutation.mutate(formData);
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
      <button
        className={styles.authBtn}
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <Spinner secondaryColor="#4A90E2" color="#E6F0FA" />
        ) : (
          "Login"
        )}
      </button>
      {loginMutation.isError && (
        <ErrorMessage
          message={
            loginMutation.error.response?.data?.message ||
            "Something went wrong."
          }
        />
      )}
    </form>
  );
}

export default LoginForm;
