import { useDispatch, useSelector } from "react-redux";
import styles from "./WorkspaceMenu.module.css";
import {
  closeWorkspaceMenu,
  openRenameWorkModal,
} from "../../../../API/redux_toolkit/modals/workspace/workspaceMenu";
import { getWorkLabel } from "../../../../utils/workspaceUtils";

function WorkspaceMenu() {
  const { isOpen, data } = useSelector((state) => state.workspaceMenu);
  const work_label = getWorkLabel(data?.name || "workspace name");
  const loggin_user_id = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))._id
    : null;
  const isWorkOwner = loggin_user_id === data?.createdBy;

  const dispatch = useDispatch();

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  const closeModal = () => {
    dispatch(closeWorkspaceMenu());
  };

  // open rename modal
  function handleRename() {
    if (!isWorkOwner) return;
    closeModal();
    dispatch(openRenameWorkModal(data));
  }

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <ul className={styles.list}>
          <li className={styles.item} onClick={handleRename}>
            <span className={styles.work_label}>{work_label}</span>
            <span className={styles.work_name}>{data?.name}</span>
          </li>
          <span className={styles.divider} />
          <li className={styles.item}>
            <span>{`Invite people to ${data?.name}`}</span>
          </li>
          <span className={styles.divider} />
          <li className={`${styles.item} ${styles.danger_item}`}>
            <span>Leave</span>
          </li>
          {/* {isOwner && ( */}
          <span className={styles.divider} />
          <li className={styles.item}>
            <span>Prefernce</span>
          </li>
          <li
            className={`${styles.item} ${styles.danger_item}`}
            // onClick={handleDeleteWorkspace}
          >
            {/* {delete_work.isPending ? ( */}
            <span>Delete Workspace</span>
          </li>
          {/* )} */}
        </ul>
      </div>
    </div>
  );
}

export default WorkspaceMenu;
