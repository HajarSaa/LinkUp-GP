import styles from "./AuthStyle.module.css";
import SocialAuth from "../../components/UI/Auth/SocialAuth/SocialAuth";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import GmailAuthForm from "../../components/UI/Auth/GmailAuthForm/GmailAuthForm";
import OrDivider from "../../components/UI/Auth/OrDivider/OrDivider";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout>
      <h2 className={styles.title}>First, enter your email</h2>
      <p className={styles.subtitle}>
        We suggest using the <strong>email address you use at work.</strong>
      </p>
      <GmailAuthForm btnName={'Register'} />
      <OrDivider/>
      <SocialAuth />
      <p className={styles.signInText}>Already using Link-Up? </p>
      <Link to="/login" className={styles.signInLink}>
        Sign in to an existing workspace
      </Link>
    </AuthLayout>
  );
};

export default Register;
