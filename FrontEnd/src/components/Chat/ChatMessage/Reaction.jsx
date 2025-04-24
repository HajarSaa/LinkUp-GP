import styles from "./ChatMessage.module.css";

function Reaction() {
  return (
    <div className={styles.react}>
      <div className={styles.react_emoji}>
        💙
      </div>
      <div className={styles.react_count}>1</div>
    </div>
  );
}

export default Reaction;
