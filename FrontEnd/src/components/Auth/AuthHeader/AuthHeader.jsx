import Logo from "/logo.svg";
import styles from "./AuthHeader.module.css";

function AuthHeader() {
  return (
    <div>
      <img src={Logo} alt="Link-Up Logo" className={styles.logo} />
      <h2 className={styles.title}>First, enter your email</h2>
    </div>
  );
}

export default AuthHeader;
