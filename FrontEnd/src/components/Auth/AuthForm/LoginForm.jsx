import { useState } from "react";
import styles from "./AuthForm.module.css";
import AuthInput from "../AuthInput/AuthInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../../UI/Spinner/Spinner"
import useLogin from "../../../API/hooks/auth/useLogin";
import { validateLoginForm } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";
import useGetMe from "../../../API/hooks/auth/useGetMe";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigateTo = useNavigate();
  const { refetch } = useGetMe({ enabled: false });
  const [isLoading, setIsLoading] = useState(false);


  const loginMutation = useLogin();

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setMessage("");
    setIsLoading(true)
    loginMutation.mutate(formData, {
      onSuccess: async () => {
        await refetch();
        navigateTo("/workspaces-landing");
      },
      onError: (error) => {
        setMessage(
          error?.response?.data?.message || "Login failed, please try again."
        );
      }, onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
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
        {loginMutation.isPending || isLoading ? (
          <Spinner secondaryColor="#4A90E2" color="#E6F0FA" />
        ) : (
          "Login"
        )}
      </button>
      {message && <ErrorMessage message={message} />}
    </form>
  );
}

export default LoginForm;
