import { GoSearch } from "react-icons/go";
import styles from "./SearchInput.module.css";

function SearchInput() {
  return (
    <div className={styles.searchBox}>
      <GoSearch className={styles.searchIcon} />
      <input type="text" placeholder="Search for channels" />
    </div>
  );
}

export default SearchInput;
