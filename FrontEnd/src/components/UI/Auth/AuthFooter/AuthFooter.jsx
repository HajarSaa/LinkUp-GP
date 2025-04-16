import styles from './AuthFooter.module.css';

function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <a href="/privacy">Privacy & Terms</a>
      <a href="/contact">Contact Us</a>
      <div className={styles.regionSelector}>Change region ▼</div>
    </footer>
  );
}

export default AuthFooter;
