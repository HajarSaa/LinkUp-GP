import { useDispatch, useSelector } from "react-redux";
import styles from "./WorkspaceMenu.module.css";
import {
  closeWorkspaceMenu,
  openDeleteModal,
  openRenameWorkModal,
} from "../../../../API/redux_toolkit/modals/workspace/workspaceMenu";
import { getWorkLabel } from "../../../../utils/workspaceUtils";
import { openInviteWork } from "../../../../API/redux_toolkit/modals/modalsSlice";
import useLeaveWorkspace from "../../../../API/hooks/workspace/useLeaveWorkspace";
import { useNavigate } from "react-router-dom";
import Spinner from '../../Spinner/Spinner'

function WorkspaceMenu() {
  const { isOpen, data } = useSelector((state) => state.workspaceMenu);
  const work_label = getWorkLabel(data?.name || "workspace name");
  const loggin_user_id = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))._id
    : null;
  const isWorkOwner = loggin_user_id === data?.createdBy;
  const leave_work = useLeaveWorkspace();
  const navigateTo = useNavigate();
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
  // handle invitation
  function handleInvitaion() {
    closeModal();
    dispatch(openInviteWork(data));
  }
  // handle leaving workspace
  function handleLeaving() {
    leave_work.mutate(data?._id, {
      onSuccess: () => {
        closeModal();
        navigateTo("/workspaces-landing");
      },
      onError: (error) => {
        console.error("Error leaving workspace:", error);
      },
    });
  }
  // handle delete workspace
  function handleDeleteWorkspace() {
    if (!isWorkOwner) return;
    dispatch(openDeleteModal(data));
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
          <li className={styles.item} onClick={handleInvitaion}>
            <span>{`Invite people to ${data?.name}`}</span>
          </li>
          <span className={styles.divider} />
          <li
            className={`${styles.item} ${styles.danger_item}`}
            onClick={handleLeaving}
          >
            <span>
              {leave_work.isPending ? (
                <span>
                  <Spinner color="var(--error-color)" width={25} height={25} />
                </span>
              ) : (
                "Leave"
              )}
            </span>
          </li>
          {isWorkOwner && (
            <>
              <span className={styles.divider} />
              <li className={styles.item}>
                <span>Prefernce</span>
              </li>
              <li
                className={`${styles.item} ${styles.danger_item}`}
                onClick={handleDeleteWorkspace}
              >
                <span>Delete Workspace</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default WorkspaceMenu;
