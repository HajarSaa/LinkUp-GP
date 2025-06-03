import PropTypes from "prop-types";
import styles from "./Overlay.module.css";
function Overlay({ closeOverlay, children , className }) {
  return (
    <div className={`${styles.overlay} ${className}`} onClick={closeOverlay}>
      {children}
    </div>
  );
}

Overlay.propTypes = {
  closeOverlay: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Overlay;
