import { useDispatch, useSelector } from "react-redux";
import styles from "./EditModals.module.css";
import { closeEditModal } from "../../../../../API/redux/modals/channelDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const DescriptionModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.channelDetailsModal.editModal.description
  );

  const [description, setDescription] = useState("");

  function handleCloseModal(e) {
    if (e.currentTarget === e.target) dispatch(closeEditModal());
  }
  const inputChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit description</h3>
          <button
            onClick={() => dispatch(closeEditModal())}
            className={styles.closeBtn}
          >
            <IoMdClose />
          </button>
        </div>
        <div className={styles.inputDiv}>
          <textarea
            name="edit-topic"
            className={`${styles.input} ${styles.topicInput}`}
            value={description}
            onChange={inputChange}
            placeholder="Add a desciption"
          />
        </div>
        <p className={styles.hint}>Let people know what this channel is for.</p>
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={() => dispatch(closeEditModal())}
          >
            Cancel
          </button>
          <button className={styles.saveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
