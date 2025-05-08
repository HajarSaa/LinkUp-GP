import styles from "./Resizer.module.css";
import PropTypes from 'prop-types'

function Resizer({ onResizeStart, name, position = {}, isResizable = true }) {
  return (
    <div
      className={`${styles.resizer} ${!isResizable ? styles.disabled : ""}`}
      style={position}
      onMouseDown={(e) => isResizable && onResizeStart(e, name)}
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
