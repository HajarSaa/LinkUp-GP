import styles from "./Login.module.css";
import SocialAuth from "../../../components/UI/Auth/SocialAuth/SocialAuth";
import Logo from "../../../assets/icons/logo.svg";
import AuthFooter from "../../../components/UI/Auth/AuthFooter/AuthFooter";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo */}
        <img src={Logo} alt="Link-Up Logo" className={styles.logo} />

        {/* Title */}
        <h2 className={styles.title}>Login</h2>

        {/* Social Login Buttons */}
        <SocialAuth />

        {/* OR Divider */}
        <div className={styles.orContainer}>
          <hr className={styles.line} />
          <span className={styles.orText}>OR</span>
          <hr className={styles.line} />
        </div>
        {/* Input Fields */}
        <input
          type="email"
          className={styles.input}
          placeholder="name@work-email.com"
        />

        {/* Sign In Button */}
        <button className={styles.signInBtn}>Sign In</button>

        {/* Don't have an account? */}
        <p className={styles.signUpText}>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>

      {/* Footer */}
      <AuthFooter/>
    </div>
  );
};

export default Login;
