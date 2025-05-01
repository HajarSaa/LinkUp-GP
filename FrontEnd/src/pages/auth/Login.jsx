import styles from "./AuthStyle.module.css";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";
import LoginForm from "../../components/UI/Auth/AuthForm/LoginForm";

const Login = () => {
  return (
    <AuthLayout>
      <p className={styles.subtitle}>
        You should use the <strong>email address you use in Link-UP.</strong>
      </p>
      <LoginForm />
      <p className={styles.signUpText}>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
