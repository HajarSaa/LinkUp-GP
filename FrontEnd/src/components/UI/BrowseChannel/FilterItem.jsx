import { FaChevronDown } from "react-icons/fa";
import styles from "./BrowseChannel.module.css";
import PropTypes from "prop-types";

function FilterItem({text}) {
  return (
    <div className={styles.filter_item}>
      <span>{text}</span>
      <span className={styles.filterIcon}>
        <FaChevronDown />
      </span>
    </div>
  );
}

FilterItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FilterItem;
