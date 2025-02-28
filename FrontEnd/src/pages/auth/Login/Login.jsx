import styles from "./Login.module.css";
import SocialAuth from "../SocialAuth/SocialAuth";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo */}
        <h1 className={styles.logo}>Link-UP</h1>

        {/* Title */}
        <h2 className={styles.title}>Sign in to Link-Up</h2>

        {/* Input Fields */}
        <input type="email" className={styles.input} placeholder="Email address" />
        <input type="password" className={styles.input} placeholder="Password" />

        {/* Forgot Password */}
        <a href="#" className={styles.forgotPassword}>Forgot password?</a>

        {/* Sign In Button */}
        <button className={styles.signInBtn}>Sign In</button>

        {/* OR Divider */}
        <div className={styles.divider}>
          <span>OR</span>
        </div>

        {/* Social Login Buttons */}
        <SocialAuth/>

        {/* Don't have an account? */}
        <p className={styles.signUpText}>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <a href="#">Privacy & Terms</a>
        <a href="#">Contact Us</a>
        <a href="#">Change region</a>
      </footer>
    </div>
  );
};

export default Login;
