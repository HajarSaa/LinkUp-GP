import { GoSearch } from "react-icons/go";
import styles from "./SearchInput.module.css";
import PropTypes from "prop-types";

function SearchInput({ placeholder = "Search", value, onChange }) {
  return (
    <div className={styles.searchBox}>
      <GoSearch className={styles.searchIcon} />
      <input
        id="search_input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}


export default SearchInput;
SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

