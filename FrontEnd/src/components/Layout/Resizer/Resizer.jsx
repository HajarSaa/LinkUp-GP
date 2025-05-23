import styles from "./Resizer.module.css";
import PropTypes from 'prop-types'

function Resizer({position = {}, isResizable = true }) {
  return (
    <div
      className={`${styles.resizer} ${!isResizable ? styles.disabled : ""}`}
      style={position}
    />
  );
}

Resizer.propTypes = {
  onResizeStart: PropTypes.any,
  name: PropTypes.any,
  position: PropTypes.any,
  isResizable: PropTypes.any,
};

export default Resizer;
