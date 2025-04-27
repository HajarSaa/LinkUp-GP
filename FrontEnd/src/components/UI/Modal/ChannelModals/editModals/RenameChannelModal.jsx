/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditModals.module.css";
import { closeEditModal } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const RenameChannelModal = ({ channelName = "#channel-name" }) => {
  const dispatch = useDispatch();
  const renameModal = useSelector(
    (state) => state.channelDetailsModal.editModal.renameChannel
  );
  const [name, setName] = useState(channelName.slice(1));
  const [nameLength, setNameLength] = useState(80 - name.length);

  function handleCloseModal(e) {
    if (e.currentTarget === e.target) dispatch(closeEditModal());
  }
  const inputChange = (e) => {
    const value = e.target.value;
    setName(value.split(" ").join("-").toLowerCase());
    setNameLength(80 - value.length);
  };

  if (!renameModal) return null;
  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Rename this channel</h3>
          <button
            onClick={() => dispatch(closeEditModal())}
            className={styles.closeBtn}
          >
            <IoMdClose />
          </button>
        </div>
        <div className={styles.inputDiv}>
          <span className={styles.type}>{channelName.at(0)}</span>
          <input
            type="text"
            name="rename-channel"
            className={styles.input}
            value={name}
            onChange={inputChange}
            placeholder="e.g. Marketing"
            maxLength={80}
          />
          <span className={styles.nameLength}>{nameLength}</span>
        </div>
        <p className={styles.hint}>
          Names must be lower case, without spaces or full stops, and can’t be
          longer than 80 characters.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={() => dispatch(closeEditModal())}
          >
            Cancel
          </button>
          <button className={styles.saveBtn}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default RenameChannelModal;
