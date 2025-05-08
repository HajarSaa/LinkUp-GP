import styles from "./Icon.module.css";
import PropTypes from "prop-types";

function Icon({ children, className }) {
  return <span className={`${styles.icon} ${className}`}>{children}</span>;
}

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
};

export default Icon;
