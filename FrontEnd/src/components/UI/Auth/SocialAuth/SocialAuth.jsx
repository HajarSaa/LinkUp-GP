import styles from "./SocialAuth.module.css";
import GoogleIcon from "../../../../assets/icons/google.svg";
import AppleIcon from "../../../../assets/icons/apple.svg";

const SocialAuth = () => {
  return (
    <div className={styles.socialAuth}>
      <button className={styles.socialBtn}>
        <img src={GoogleIcon} alt="Google" className={styles.icon} />
        Continue With Google
      </button>
      <button className={styles.socialBtn}>
        <img src={AppleIcon} alt="Apple" className={styles.icon} />
        Continue With Apple
      </button>
    </div>
  );
};

export default SocialAuth;
