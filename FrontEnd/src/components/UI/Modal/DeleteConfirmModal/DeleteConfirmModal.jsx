import Modal from "../Modal";
import styles from "./DeleteConfirmModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MdGroups } from "react-icons/md";
import { IoIosApps } from "react-icons/io";
import Spinner from "../../Spinner/Spinner";
import { BsPeopleFill } from "react-icons/bs";

import { useState } from "react";
import useDeleteWorkspace from "../../../../API/hooks/workspace/useDeleteWorkspace";
import { useNavigate } from "react-router-dom";
import { closeWorkspaceMenu } from "../../../../API/redux_toolkit/modals/workspace/workspaceMenu";

const DeleteConfirmModal = () => {
  const { isOpen, data } = useSelector(
    (state) => state.workspaceMenu.deleteModal
  );
  const [confirmWord, setConfirmWord] = useState("");
  const [error, setError] = useState("");
  const delete_workspace = useDeleteWorkspace();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const channelNums = data?.channels?.length || 0;
  const conversNums = data?.conversations?.length || 0;
  const intergrsNums = data?.integration?.length || 0;

  function handleInputChange(e) {
    setConfirmWord(e.target.value);
  }

  function handleClose() {
    dispatch(closeWorkspaceMenu());
    setError("");
    setConfirmWord("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (confirmWord === "Delete") {
      delete_workspace.mutate(data?._id, {
        onSuccess: () => {
          handleClose();
          navigateTo("/workspaces-landing");
        },
        onError: (error) => {
          setError(error);
        },
      });
    } else {
      setError("Type the right word");
    }
  }

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.contactModal}
      zIndex={1002}
      title="Delete workspace"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_container}>
          <div className={styles.details}>
            <div className={styles.details_item}>
              <span className={styles.details_icon}>
                <MdGroups />
              </span>
              <span
                className={styles.details_info}
              >{`${channelNums} Channels`}</span>
            </div>
            <span className={styles.divider} />
            <div className={styles.details_item}>
              <span className={styles.details_icon}>
                <BsPeopleFill />
              </span>
              <span
                className={styles.details_info}
              >{`${conversNums} Conversations`}</span>
            </div>
            <span className={styles.divider} />
            <div className={styles.details_item}>
              <span className={styles.details_icon}>
                <IoIosApps />
              </span>
              <span
                className={styles.details_info}
              >{`${intergrsNums} Integrations`}</span>
            </div>
          </div>
          <p className={styles.description}>
            This will delete the Channels, Conversations and integrations
          </p>
          <label htmlFor="rename">
            To confirm, type &quot;Delete&quot; in the box below
          </label>
          <input
            id="rename"
            type="text"
            value={confirmWord}
            onChange={handleInputChange}
            className={styles.input}
            maxLength={50}
          />
        </div>
        {error && <p className={styles.error_message}>{error}</p>}
        <div className={styles.buttons}>
          <button
            className={styles.cancel_btn}
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className={styles.submit_btn} type="submit">
            {delete_workspace.isPending ? (
              <span>
                <Spinner color="var(--error-color)" width={20} height={20} />
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteConfirmModal;
