import styles from "./Tabs.module.css";
import PropTypes from "prop-types";

function TabItem({ children, onClick ,className}) {
  return (
    <div
      className={`${styles.tab_item} ${className}`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
}

TabItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.any,
};

export default TabItem;
