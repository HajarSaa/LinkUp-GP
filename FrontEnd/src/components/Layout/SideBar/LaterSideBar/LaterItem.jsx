// LaterItem.jsx
import styles from "./LaterSideBar.module.css";
import PropTypes from "prop-types";

const LaterItem = ({ username, message, tag }) => {
  return (
    <div className={styles.item}>
      <div className={styles.tags}>
        {tag && <div className={styles.tag}>{tag}</div>}
        <div className={styles.message_source}># Generalsssssssssssssssssssssssssssssssssss</div>
      </div>
      <div className={styles.item_header}>
        <div className={styles.avatar}></div>
        <div className={styles.item_texts}>
          <span className={styles.username}>{username}</span>
          <span className={styles.message}>{message}</span>
        </div>
      </div>
    </div>
  );
};

LaterItem.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

export default LaterItem;
