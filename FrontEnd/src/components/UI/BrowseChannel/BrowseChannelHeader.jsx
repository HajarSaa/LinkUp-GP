import SearchInput from "../InputField/SearchInput/SearchInput";
import styles from "./BrowseChannel.module.css";
import BrowseFilter from "./BrowseFilter";
import BrowseHeader from "./BrowseHeader";

function BrowseChannelHeader() {
  return (
    // <div className={styles.browse_channel_header}>
      <div className={styles.browse_channel_header}>
        <BrowseHeader />
        <SearchInput placeholder="Search for all channels" />
        <BrowseFilter />
      </div>
    // </div>
  );
}

export default BrowseChannelHeader;
