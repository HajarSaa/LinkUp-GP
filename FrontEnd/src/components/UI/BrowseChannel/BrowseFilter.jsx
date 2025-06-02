import styles from "./BrowseChannel.module.css";
import FilterItem from "./FilterItem";

function BrowseFilter() {
  const btns_filter = [
    "All channels",
    "Any channel type",
    "Workspaces",
    "Organisations",
    "A to Z",
  ];
  return (
    <div className={styles.filters}>
      {btns_filter.map((text, key) => (
        <FilterItem key={key} text={text} />
      ))}
    </div>
  );
}

export default BrowseFilter;
