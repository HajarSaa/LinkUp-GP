/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditModals.module.css";
import { closeEditModal } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const TopicModal = ({channelName = 'my-channel'}) => {
  const dispatch = useDispatch();
  const editTopic = useSelector(
    (state) => state.channelDetailsModal.editModal.editTopic
  );
  const [topic, setTopic] = useState('');

  function handleCloseModal(e) {
    if (e.currentTarget === e.target) dispatch(closeEditModal());
  }
  const inputChange = (e) => {
    const value = e.target.value;
    setTopic(value);
  };


  if (!editTopic) return null;
  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit topic</h3>
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
            value={topic}
            onChange={inputChange}
            placeholder="Add a topic"
          />
        </div>
        <p className={styles.hint}>
          Let people know what <strong>{channelName}</strong> is focused on
          right now (e.g. a project milestone). Topics are always visible in the
          header.
        </p>
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

export default TopicModal;
