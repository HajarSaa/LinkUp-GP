import styles from "./ProtectedLoading.module.css";
import Spinner from "../Spinner/Spinner";

const ProtectedLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>

        <Spinner width={70} height={70} color="#2d5878" border={4} />
        <div>
          <h2 className={styles.loadingTitle}>Verifying your credentials...</h2>
          <p className={styles.loadingMessage}>
            Just a moment, we&apos;re getting things ready 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLoading;
