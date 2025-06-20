import { useDispatch, useSelector } from "react-redux";
import styles from "./EditModals.module.css";
import { closeEditModal } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import ChannelType from "../../../Channel/ChannelType/ChannelType";
import useUpdateChannel from "../../../../../API/hooks/channel/useUpdateChannel";
import { useParams } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";
import PropTypes from "prop-types";

const RenameChannelModal = ({ channelName = "#channel-name", type }) => {
  const dispatch = useDispatch();
  const renameModal = useSelector(
    (state) => state.channelDetailsModal.editModal.renameChannel
  );
  const { mutate: updateChannelName, isPending } = useUpdateChannel();
  const { id: channel_id } = useParams();
  const [name, setName] = useState(channelName);
  const [nameLength, setNameLength] = useState(80 - channelName.length);

  useEffect(() => {
    if (renameModal) {
      setName(channelName);
      setNameLength(80 - channelName.length);
    }
  }, [renameModal, channelName]);


  const closeModal = () => {
    dispatch(closeEditModal());
    // setName("");
    // setNameLength(80);
  };

  const handleCloseModal = (e) => {
    if (e.currentTarget === e.target) closeModal();
  };

  const inputChange = (e) => {
    const value = e.target.value;
    setName(value.split(" ").join("-"));
    setNameLength(80 - value.length);
  };

  const handleRename = (newName) => {
    updateChannelName(
      {
        channelId: channel_id,
        body: { name: newName },
      },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  if (!renameModal) return null;

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Rename this channel</h3>
          <button onClick={closeModal} className={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        <div className={styles.inputDiv}>
          <ChannelType type={type} className={styles.type} />
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={inputChange}
            placeholder="e.g. marketing"
            maxLength={80}
          />
          <span className={styles.nameLength}>{nameLength}</span>
        </div>

        <p className={styles.hint}>
          Names must be lower case, without spaces or full stops, and can’t be
          longer than 80 characters.
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={() => handleRename(name)}>
            {isPending ? (
              <Spinner width={25} height={25} color="var(--primary-color)" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
RenameChannelModal.propTypes = {
  channelName: PropTypes.string,
  type: PropTypes.string,
};

export default RenameChannelModal;
