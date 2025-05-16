import styles from "./Panel.module.css";
import Resizer from "../Resizer/Resizer";
import PropTypes from "prop-types";

function Panel({ width, onResizeStart, isResizable }) {
  return (
    <div className={styles.panel} style={{ width }}>
      <div>Panel</div>
      <Resizer
        onResizeStart={onResizeStart}
        name={"panel"}
        position={{ left: 0 }}
        isResizable={isResizable}
      />
    </div>
  );
}

Panel.propTypes = {
  width: PropTypes.any,
  onResizeStart: PropTypes.any,
  isResizable: PropTypes.any,
};

export default Panel;
