import styles from "./Rect.module.css";

function Rec() {
  return (
    <div className={styles.toolTip}>
      <div className={styles.react_image}>
        <img
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/1f979.png"
          alt=""
        />
      </div>
      <div className={styles.names}>Ahhmed,Alaa</div>
    </div>
  );
}

export default Rec;
