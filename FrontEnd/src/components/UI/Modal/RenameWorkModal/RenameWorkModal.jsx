import Modal from "../Modal";
import styles from "./RenameWorkModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeWorkspaceMenu } from "../../../../API/redux_toolkit/modals/workspace/workspaceMenu";
import { useState, useEffect } from "react";
import useUpdateWorkspace from "../../../../API/hooks/workspace/useUpdateWorkspace";
import Spinner from "../../Spinner/Spinner";

const RenameWorkModal = () => {
  const { isOpen, data } = useSelector(
    (state) => state.workspaceMenu.renameModal
  );
  const [teamName, setTeamName] = useState("");
  const rename_workspace = useUpdateWorkspace();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTeamName(data?.name);
    }
  }, [data, isOpen]);

  function handleInputChange(e) {
    setTeamName(e.target.value);
  }

  function handleClose() {
    dispatch(closeWorkspaceMenu());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (teamName.trim() !== "" && data?.name !== teamName) {
      if (!data?._id) return;
      rename_workspace.mutate(
        { work_id: data?._id, data: { name: teamName } },
        {
          onSuccess: () => {
            handleClose();
          },
          onError: (error) => {
            console.error("Error renaming workspace:", error);
          },
        }
      );
    } else {
      handleClose();
    }
    // submit logic
  }

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.contactModal}
      zIndex={1002}
      title="Edit workspace details"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_container}>
          <p className={styles.description}>
            Add a name to represent your company or organization. This name will
            also be shown to other organizations that you work with using{" "}
            <strong>Linkup</strong>.
          </p>
          <label htmlFor="rename">Workspace name</label>
          <input
            id="rename"
            type="text"
            value={teamName}
            onChange={handleInputChange}
            placeholder="Ex: Acme Marketing or Acme Co"
            className={styles.input}
            maxLength={50}
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.cancel_btn}
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className={styles.submit_btn} type="submit">
            {rename_workspace.isPending ? (
              <span>
                <Spinner color="#007a5a" width={25} height={25} />
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RenameWorkModal;
