import styles from "./SmallAvatar.module.css";
import PropTypes from "prop-types";

function SmallAvatar({ avatrData, index }) {
  return (
    <div className={styles.avatar} style={{ zIndex: `${100 - index}` }}>
      <img src={avatrData.avatar} alt={avatrData.name} />
    </div>
  );
}

SmallAvatar.propTypes = {
  avatrData: PropTypes.any,
  index: PropTypes.number,
};

export default SmallAvatar;
