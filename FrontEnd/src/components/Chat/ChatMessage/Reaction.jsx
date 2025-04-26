/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import styles from "./ChatMessage.module.css";

function Reaction({ reactions }) {
  return (
    <div className={styles.react}>
      <div className={styles.react_emoji}>🤔</div>
      <div className={styles.react_count}>1</div>
    </div>
  );
}
Reaction.propTypes = {
  reactions: PropTypes.any,
};

export default Reaction;
