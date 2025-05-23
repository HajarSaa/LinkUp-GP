import styles from "./Icon.module.css";
import PropTypes from "prop-types";

function Icon({ children, className , onClick }) {
  return <span className={`${styles.icon} ${className}`} onClick={onClick}>{children}</span>;
}

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  onClick: PropTypes.func,
};

export default Icon;
