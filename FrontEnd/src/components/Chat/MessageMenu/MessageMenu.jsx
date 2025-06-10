import styles from "./MessageMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeMessageMenuModal } from "../../../API/redux_toolkit/modals/chat/messageMenu";
import { useCallback, useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import useDeleteMessage from "../../../API/hooks/messages/useDeleteMessage";

const MessageMenu = () => {
  const { isOpen, position, activeMessageId } = useSelector(
    (state) => state.messageMenu
  );
  const delete_message = useDeleteMessage();
  const dispatch = useDispatch();

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const closeModal = useCallback(() => {
    dispatch(closeMessageMenuModal());
  }, [dispatch]);

  const handleDelete = useCallback(() => {
    delete_message.mutate(activeMessageId);
  }, [delete_message, activeMessageId]);

  function handleEdit() {
    console.log("Edit");
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "e") {
        handleEdit();
      }
      if (event.key === "Delete") {
        handleDelete();
      }
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal, handleDelete]);

  if (!isOpen || !position) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            position: "absolute",
            zIndex: 1000,
          }}
        >
          <ul className={styles.list}>
            <li className={styles.item} onClick={handleEdit}>
              <span>Edit Message</span>
              <span>E</span>
            </li>
            <li
              className={`${styles.item} ${styles.delete_item}`}
              onClick={handleDelete}
            >
              {delete_message.isPending ? (
                <span className={styles.delete_loading}>
                  <Spinner width={20} height={20} color="var(--error-color)" />
                </span>
              ) : (
                <>
                  <span>Delete Message</span>
                  <span>Delete</span>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MessageMenu;
