import Resizer from "../Resizer/Resizer";
import styles from "./SideBar.module.css";
import PropTypes from 'prop-types'

function SideBar({ width, onResizeStart, isResizable }) {
  return (
    <div className={styles.side_bar} style={{ width }}>
      <Resizer
        onResizeStart={onResizeStart}
        name={"sidebar"}
        position={{ right: 0 }}
        isResizable={isResizable}
      />
    </div>
  );
}

SideBar.propTypes = {
  width: PropTypes.any,
  onResizeStart: PropTypes.any,
  isResizable: PropTypes.any,
};

export default SideBar;
