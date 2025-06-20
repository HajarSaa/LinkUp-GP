import PropTypes from "prop-types";
import styles from "./DetailsButton.module.css";

function DetailsButton({ icon, children, onClick }) {

  function handleClick() {
    if (onClick)
      onClick()
  }
  return (
    <div className={styles.actionBtn} onClick={handleClick}>
      {icon && (
        <span className={`${styles.icon} align-items-center`}>{icon}</span>
      )}
      {children && <span>{children}</span>}
    </div>
  );
}

DetailsButton.propTypes = {
  icon: PropTypes.any,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default DetailsButton;
