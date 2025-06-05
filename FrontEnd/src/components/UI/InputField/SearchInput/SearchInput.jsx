import { GoSearch } from "react-icons/go";
import styles from "./SearchInput.module.css";
import PropTypes from "prop-types";

function SearchInput({placeholder = "Search"}) {
  return (
    <div className={styles.searchBox}>
      <GoSearch className={styles.searchIcon} />
      <input id="search_input" type="text" placeholder={placeholder} />
    </div>
  );
}

export default SearchInput;
SearchInput.propTypes = {
  placeholder: PropTypes.string,
};
