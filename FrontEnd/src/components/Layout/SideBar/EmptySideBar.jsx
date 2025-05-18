import styles from "./SideBar.module.css";
import PropTypes from 'prop-types'

function SideBar() {
  return (
    <div className={styles.side_bar} style={{width:250}}>
    </div>
  );
}

SideBar.propTypes = {
  width: PropTypes.any,
  onResizeStart: PropTypes.any,
  isResizable: PropTypes.any,
};

export default SideBar;
