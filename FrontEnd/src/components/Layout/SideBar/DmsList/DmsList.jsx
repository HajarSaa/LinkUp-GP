import { useSelector } from "react-redux";
import styles from "./DmsList.module.css";
import DmsListItem from "./DmsListItem";
import { useParams } from "react-router-dom";

function DmsList() {
  const { workspace } = useSelector((state) => state.workspace);
  const { id } = useParams();

  return (
    <div>
      <div className={styles.list}>
        {workspace.conversations.map((conversation, index) => (
          <DmsListItem
            key={index}
            dmData={conversation}
            workspace={workspace}
            isActive={String(conversation.id) === String(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DmsList;
