import PropTypes from "prop-types";
import styles from "./Overlay.module.css";
function Overlay({ closeOverlay, children }) {
  return (
    <div className={styles.overlay} onClick={closeOverlay}>
      {children}
    </div>
  );
}

Overlay.propTypes = {
  closeOverlay: PropTypes.func,
  children: PropTypes.node,
};

export default Overlay;
