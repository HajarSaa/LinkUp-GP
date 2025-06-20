import { useDispatch, useSelector } from "react-redux";
import styles from "./EditModals.module.css";
import { closeEditModal } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import useUpdateChannel from "../../../../../API/hooks/channel/useUpdateChannel";
import { useParams } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";
import PropTypes from "prop-types";

const DescriptionModal = ({ defaultDescription = "" }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.channelDetailsModal.editModal.description
  );

  const { id: channel_id } = useParams();
  const { mutate: updateDescription, isPending } = useUpdateChannel();

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDescription(defaultDescription || "");
    }
  }, [isOpen, defaultDescription]);

  const handleCloseModal = (e) => {
    if (e.currentTarget === e.target) dispatch(closeEditModal());
  };

  const closeModal = () => {
    dispatch(closeEditModal());
    setDescription("");
  };

  const inputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    if (description.trim() === defaultDescription.trim()) {
      // ✅ نفس الديسكريبشن، اقفل بس من غير ريكويست
      closeModal();
      return;
    }

    updateDescription(
      {
        channelId: channel_id,
        body: { description },
      },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit description</h3>
          <button onClick={closeModal} className={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>
        <div className={styles.inputDiv}>
          <textarea
            name="edit-description"
            className={`${styles.input} ${styles.topicInput}`}
            value={description}
            onChange={inputChange}
            placeholder="Add a description"
          />
        </div>
        <p className={styles.hint}>Let people know what this channel is for.</p>
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
DescriptionModal.propTypes = {
  defaultDescription: PropTypes.string,
};

export default DescriptionModal;
