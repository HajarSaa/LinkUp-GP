import styles from "./SearchComponents.module.css";
import SearchFilter from "./SearchFilter/SearchFilter";

function SearchHeader() {
  return (
    <div className={styles.searchHeader}>
      <div className={styles.searchHeader_content}>
        <div className={styles.search_query}>
          <span>Search : </span>
          <strong>“Ahmed”</strong>
        </div>
          <SearchFilter />
      </div>
    </div>
  );
}

export default SearchHeader;
