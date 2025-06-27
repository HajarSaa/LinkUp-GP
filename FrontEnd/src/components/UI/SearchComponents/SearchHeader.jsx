/* eslint-disable react/prop-types */
import styles from "./SearchComponents.module.css";
import SearchFilter from "./SearchFilter/SearchFilter";

function SearchHeader({ onFiltersChange }) {
  const keyword = location.search.startsWith("?")
    ? location.search.slice(1)
    : location.search;
  const decodedKeyword = decodeURIComponent(keyword);

  return (
    <div className={styles.searchHeader}>
      <div className={styles.searchHeader_content}>
        <div className={styles.search_query}>
          <span>Search : </span>
          <strong>{`“${decodedKeyword}”`}</strong>
        </div>
        <SearchFilter onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
}

export default SearchHeader;
