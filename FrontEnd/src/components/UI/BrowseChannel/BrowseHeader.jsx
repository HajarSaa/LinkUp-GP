import { useDispatch } from "react-redux";
import { openCreateChannel } from "../../../API/redux_toolkit/modals/modalsSlice";
import styles from "./BrowseChannel.module.css";

function BrowseHeader() {
  const dispatch = useDispatch();
  return (
    <div className={styles.browseHeader}>
      <h2 className={styles.title}>All channels</h2>
      <button
        className={styles.createBtn}
        onClick={() => dispatch(openCreateChannel())}
      >
        Create Channel
      </button>
    </div>
  );
}

export default BrowseHeader;
