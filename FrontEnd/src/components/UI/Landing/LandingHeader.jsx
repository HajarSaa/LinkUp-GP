import styles from "./Landing.module.css";
import Logo from "/logo.svg";
function LandingHeader() {
  return (
    <div className={styles.landing_header}>
      <img src={Logo} alt="Link-Up Logo" className={styles.logo} />
      <h1 className={styles.header}>
        Welcome back! <span>You look nice today.</span>
      </h1>
      <p className={styles.subtext}>
        Choose a workspace below to get back to working with your team.
      </p>
    </div>
  );
}

export default LandingHeader;
