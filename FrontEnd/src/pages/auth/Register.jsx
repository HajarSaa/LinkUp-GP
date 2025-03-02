import styles from "./AuthStyle.module.css";
import SocialAuth from "../../components/UI/Auth/SocialAuth/SocialAuth";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      <h2 className={styles.title}>First, enter your email</h2>
      <p className={styles.subtitle}>
        We suggest using the <strong>email address you use at work.</strong>
      </p>
      <input
        type="email"
        placeholder="name@gmail.com"
        className={styles.input}
      />
      <button className={styles.authBtn}>Continue</button>
      <div className={styles.orContainer}>
        <hr className={styles.line} />
        <span className={styles.orText}>OR</span>
        <hr className={styles.line} />
      </div>
      <SocialAuth />
      <p className={styles.signInText}>Already using Link-Up? </p>
      <a className={styles.signInLink} href="/login">
        Sign in to an existing workspace
      </a>
    </AuthLayout>
  );
};

export default Register;
