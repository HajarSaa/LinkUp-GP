/* eslint-disable react/prop-types */
import styles from "./AddPeopleModal.module.css";
import { FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateChannel } from "../../../../../API/redux_toolkit/modals/createChannelmodalSlice";


const AddPeopleModal = ({ channelName }) => {
  const { addMembersOpen:isModalOpen} = useSelector((state) => state.createChannelModal);
  const dispatch = useDispatch();
  function close() {
    dispatch(closeCreateChannel());
  }
  if (!isModalOpen) return;
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>
            Add people to <FaLock className={styles.lockIcon} /> {channelName}
          </h3>
          <IoClose className={styles.closeIcon} onClick={close} />
        </div>

        {/* Subtext */}
        <p className={styles.subtext}>
          You can also add email addresses of people who aren’t members of{" "}
          <strong>Testing WorkSpace</strong>
        </p>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter a name or email address"
          className={styles.inputField}
        />

        {/* Buttons */}
        <div className={styles.modalActions}>
          <div className={styles.skipButton}
            onClick={close}>Skip for now</div>
        </div>
      </div>
    </div>
  );
};

export default AddPeopleModal;
