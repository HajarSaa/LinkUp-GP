import { useDispatch, useSelector } from "react-redux";
import styles from "./EditModals.module.css";
import { closeEditModal } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useUpdateChannel from "../../../../../API/hooks/channel/useUpdateChannel";
import { useParams } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";

const TopicModal = ({ channelName = "my-channel" , defaultTopic='' }) => {
  const dispatch = useDispatch();
  const editTopic = useSelector(
    (state) => state.channelDetailsModal.editModal.editTopic
  );
  const { mutate: updateTopic, isPending } = useUpdateChannel();
  const { id: channel_id } = useParams();
  const [topic, setTopic] = useState("");

  useEffect(() => {
    if (editTopic) {
      setTopic(defaultTopic || "");
    }
  }, [editTopic, defaultTopic]);

  const handleCloseModal = (e) => {
    if (e.currentTarget === e.target) dispatch(closeEditModal());
  };

  const closeModal = () => {
    dispatch(closeEditModal());
    setTopic("");
  };

  const inputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSave = () => {
    updateTopic(
      {
        channelId: channel_id,
        body: { topic },
      },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  if (!editTopic) return null;

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit topic</h3>
          <button onClick={closeModal} className={styles.closeBtn}>
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
          <button className={styles.cancelBtn} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            {isPending ? (
              <Spinner width={25} height={25} color="var(--primary-color)" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
TopicModal.propTypes = {
  channelName: PropTypes.string,
  defaultTopic: PropTypes.string,
};

export default TopicModal;
