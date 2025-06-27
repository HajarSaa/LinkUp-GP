import styles from "./SearchFilter.module.css";
import FilterItem from "./FilterItem";

function SearchFilter() {
  const btns_filter = [
    "All",
    "From",
    "Start Date",
    "End Date",
  ];
  return (
    <div className={styles.filters}>
      {btns_filter.map((text, key) => (
        <FilterItem key={key} text={text} isFirst={key===0} />
      ))}
    </div>
  );
}

export default SearchFilter;
