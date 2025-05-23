import styles from './ChatPreview.module.css'
function ChatPreview() {
  return (
    <div className={styles.chatMessage}>
      <div className={styles.avatarPlaceholder}></div>
      <div className={styles.messageLines}>
        <div className={styles.line}></div>
        <div className={`${styles.line} ${styles.middle}`}></div>
        <div className={`${styles.line} ${styles.short}`}></div>
      </div>
    </div>
  );
}

export default ChatPreview;
