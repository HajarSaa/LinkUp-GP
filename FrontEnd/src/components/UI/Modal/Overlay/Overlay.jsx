import PropTypes from "prop-types";
import styles from "./Overlay.module.css";
function Overlay({ closeOverlay }) {
  return <div className={styles.overlay} onClick={closeOverlay}></div>;
}

Overlay.propTypes = {
  closeOverlay: PropTypes.func,
};

export default Overlay;
