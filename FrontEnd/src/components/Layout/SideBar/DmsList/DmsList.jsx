import { useSelector } from "react-redux";
import styles from "./DmsList.module.css";
import DmsListItem from "./DmsListItem";
function DmsList() {
  const { workspace } = useSelector((state) => state.workspace);
  return (
    <div>
      <div className={styles.list}>
        {workspace.conversations.map((user, index) => (
          <DmsListItem
            key={index}
            dmData={workspace.conversations[0]}
            workspace={workspace}
          />
        ))}
      </div>
    </div>
  );
}

export default DmsList;
