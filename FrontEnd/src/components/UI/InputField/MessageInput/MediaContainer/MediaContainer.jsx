import styles from "./MediaContainer.module.css";

function MediaContainer() {
  return (
    <div className={styles.media_container}>
      <div className={styles.media_audio}></div>
      <div className={styles.media_images}></div>
      <div className={styles.media_vidios}></div>
    </div>
  );
}

export default MediaContainer;
