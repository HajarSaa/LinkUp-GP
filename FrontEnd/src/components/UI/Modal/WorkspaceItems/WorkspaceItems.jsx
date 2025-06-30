import { useDispatch, useSelector } from "react-redux";
import styles from "./WorkspaceItems.module.css";
import { closeWorkspaceItemsModal } from "../../../../API/redux_toolkit/modals/workspace/workspacesItems";
import useGetMe from "../../../../API/hooks/auth/useGetMe";
import WorkspaceItem from "./WorkspaceItem";

function WorkspaceItems() {
  const { isOpen, position } = useSelector((state) => state.workspaceItems);
  const dispatch = useDispatch();
  const { data } = useGetMe();

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeWorkspaceItemsModal());
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div
        className={styles.workspace_item_modal}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
      >
        {data.workspaces.map((workspace, index) => (
          <WorkspaceItem key={index} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}

export default WorkspaceItems;
