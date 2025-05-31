import { useState } from "react";
import AuthInput from "../AuthInput/AuthInput";
import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../../../routes/Spinner/Spinner";
import { validateSignupForm } from "../../../utils/validation";
import useSignup from "../../../API/hooks/useSignup"; // ✅

function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigateTo = useNavigate();

  const signupMutation = useSignup(); // ✅

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setMessage("");

    signupMutation.mutate(formData, {
      onSuccess: () => {
        navigateTo("/create-workspace/step-1");
      },
      onError: (err) => {
        setMessage(err?.response?.data?.message || "Signup failed.");
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <AuthInput
          type="text"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="off"
        />
        <AuthInput
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />
        <AuthInput
          type="password"
          label="Confirm Password"
          name="passwordConfirm"
          placeholder="name@gmail.com"
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
          autoComplete="new-password"
        />
        <button
          className={styles.authBtn}
          type="submit"
          disabled={signupMutation.isLoading}
        >
          {signupMutation.isPending ? (
            <Spinner secondaryColor="#4A90E2" color="#E6F0FA" />
          ) : (
            "Sign Up"
          )}
        </button>
        {message && <ErrorMessage message={message} />}
      </form>
    </div>
  );
}

export default SignupForm;
