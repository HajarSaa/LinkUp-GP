import styles from './OrDivider.module.css'
function OrDivider() {
  return (
    <div className={styles.orContainer}>
    <hr className={styles.line} />
    <span className={styles.orText}>OR</span>
    <hr className={styles.line} />
  </div>
  )
}

export default OrDivider