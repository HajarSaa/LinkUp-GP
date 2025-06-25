import styles from "./MessageMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeMessageMenuModal } from "../../../API/redux_toolkit/modals/chat/messageMenu";
import { useCallback, useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import useDeleteMessage from "../../../API/hooks/messages/useDeleteMessage";
import { showEditMessageInput } from "../../../API/redux_toolkit/api_data/messages/editMessageSlice";
import PropTypes from "prop-types";

const MessageMenu = () => {
  const { isOpen, position, activeMessageId, isSender, isInThread } =
  useSelector((state) => state.messageMenu);
  
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

  const handleCopy = useCallback(() => {
    if (!activeMessageId) return;

    const messageElement = document.getElementById(`message-${activeMessageId}`);
    if (!messageElement) {
      closeModal();
      return;
    }

    const messageTextEl = messageElement.querySelector(
      `#message-content-${activeMessageId}`
    );
    const text = messageTextEl?.innerText || "";
    if (text) {
      navigator.clipboard.writeText(text);
    }
    closeModal();
  }, [activeMessageId, closeModal]);

  
  const handleDelete = useCallback(() => {
    if (!isSender) return;

    delete_message.mutate(activeMessageId, {
      onSuccess: () => {
        closeModal();
      },
      onError: (err) => {
        console.error("❌ Delete failed:", err);
      },
    });
  }, [delete_message, activeMessageId, isSender, closeModal]);

  const handleEdit = useCallback(() => {
    if (isSender) {
      dispatch(closeMessageMenuModal());
      const messageElement = document.getElementById(`message-${activeMessageId}`);

      const messageText = messageElement
        ? messageElement.querySelector(`#message-content-${activeMessageId}`)?.textContent
        : "";

      dispatch(
        showEditMessageInput({
          messageId: activeMessageId,
          messageText,
          isInThread,
        })
      );
      closeModal();
    }
  }, [isSender, activeMessageId, closeModal, dispatch, isInThread]);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "c") handleCopy();
      if (event.key.toLowerCase() === "e") handleEdit();
      if (event.key === "Delete") handleDelete();
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal, handleDelete, handleEdit, handleCopy]);
  
  if (!isOpen || !position) return null;
  if (!isOpen || !position || !activeMessageId) return null;

  return (
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
          <li className={styles.item} onClick={handleCopy}>
            <span>Copy Message</span>
            <span>C</span>
          </li>
          {isSender && (
            <>
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

MessageMenu.propTypes = {
  isInThread: PropTypes.bool,
};

export default MessageMenu;
