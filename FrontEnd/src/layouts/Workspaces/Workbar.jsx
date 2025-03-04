import PlusIcon from "../../assets/icons/plus.svg";
import WorkspaceIcon from "../../assets/icons/user.svg";
import styles from "./Workbar.module.css";
function Workbar() {
  return (
    <div className={styles.workspace_bar}>
      <img src={WorkspaceIcon} alt="workspace-icon" className={styles.works} />
      <img src={WorkspaceIcon} alt="workspace-icon" className={styles.works} />
      <img src={PlusIcon} alt="add-icon" className={styles.add_work} />
    </div>
  );
}

export default Workbar;
