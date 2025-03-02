import styles from "./AuthStyle.module.css";
import SocialAuth from "../../components/UI/Auth/SocialAuth/SocialAuth";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import GmailAuthForm from "../../components/UI/Auth/GmailAuthForm/GmailAuthForm";
import OrDivider from "../../components/UI/Auth/OrDivider/OrDivider";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <AuthLayout>
      <h2 className={styles.title}>First, enter your email</h2>
      <p className={styles.subtitle}>
        You should use the <strong>email address you use in Link-UP.</strong>
      </p>
      <SocialAuth />
      <OrDivider/>
      <GmailAuthForm btnName="Login In" />
      <p className={styles.signUpText}>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
