import styles from "./Register.module.css";
import SocialAuth from "../../../components/UI/Auth/SocialAuth/SocialAuth";
import AuthFooter from "../../../components/UI/Auth/AuthFooter/AuthFooter";
import Logo from "../../../assets/icons/logo.svg";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={Logo} alt="Link-Up Logo" className={styles.logo} />
        <h1 className={styles.title}>Register</h1>
        <h2 className={styles.title}>First, enter your email</h2>
        <p className={styles.subtitle}>
          We suggest using the <strong>email address you use at work.</strong>
        </p>
        <input
          type="email"
          placeholder="name@work-email.com"
          className={styles.input}
        />
        <button className={styles.continueBtn}>Continue</button>
        <div className={styles.orContainer}>
          <hr className={styles.line} />
          <span className={styles.orText}>OR</span>
          <hr className={styles.line} />
        </div>
        <SocialAuth />
        <p className={styles.signInText}>Already using Link-Up? </p>
        <a className={styles.signInLink} href="/login">Sign in to an existing workspace</a>
      </div>
      <AuthFooter />
    </div>
  );
};

export default Register;
