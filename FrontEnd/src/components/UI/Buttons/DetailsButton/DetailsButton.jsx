import PropTypes from "prop-types";
import styles from "./DetailsButton.module.css";

function DetailsButton({ icon, children }) {
  return (
    <div className={styles.actionBtn}>
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
};

export default DetailsButton;
