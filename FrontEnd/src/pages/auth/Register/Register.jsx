import styles from "./Register.module.css";
import SocialAuth from "../SocialAuth/SocialAuth.jsx";
import Logo from "../../../assets/icons/logo.svg";
import AuthFooter from "../AuthFooter/AuthFooter.jsx";

const Register = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} alt="Link-Up Logo" className={styles.logo} />
      <div className={styles.card}>
        <h1 className={styles.title}>First, enter your email</h1>
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
        <a href="/login">Sign in to an existing workspace</a>
      </div>
      <AuthFooter />
    </div>
  );
};

export default Register;
