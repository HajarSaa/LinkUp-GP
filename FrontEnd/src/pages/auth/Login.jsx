import styles from "./AuthStyle.module.css";
import SocialAuth from "../../components/UI/Auth/SocialAuth/SocialAuth";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <h2 className={styles.title}>First, enter your email</h2>
      <p className={styles.subtitle}>
        You should use the <strong>email address you use in Link-UP.</strong>
      </p>
      <SocialAuth />

      <div className={styles.orContainer}>
        <hr className={styles.line} />
        <span className={styles.orText}>OR</span>
        <hr className={styles.line} />
      </div>

      <input
        type="email"
        className={styles.input}
        placeholder="name@gmail.com"
      />

      <button className={styles.authBtn}>Login In</button>

      <p className={styles.signUpText}>
        Don’t have an account? <a href="/register">Sign up</a>
      </p>
    </AuthLayout>
  );
};

export default Login;
