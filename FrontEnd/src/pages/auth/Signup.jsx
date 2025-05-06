import styles from "./AuthStyle.module.css";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/Auth/AuthForm/RegisterForm";

const Signup = () => {
  return (
    <AuthLayout>
      <p className={styles.subtitle}>
        We suggest using the <strong>email address you use at work.</strong>
      </p>
      <RegisterForm/>
      <p className={styles.signInText}>Already using Link-Up? </p>
      <Link to="/login" className={styles.signInLink}>
        Sign in to an existing workspace
      </Link>
    </AuthLayout>
  );
};

export default Signup;
