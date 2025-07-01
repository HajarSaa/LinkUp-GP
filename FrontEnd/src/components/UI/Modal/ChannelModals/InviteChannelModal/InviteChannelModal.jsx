import styles from "./InviteChannelModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../Overlay/Overlay";
import { closeInviteChannel } from "../../../../../API/redux_toolkit/modals/modalsSlice";
import CloseIcon from "../../../Icons/CloseIcon/CloseIcon";
import ChannelType from "../../../Channel/ChannelType/ChannelType";
import { useAddMember } from "../../../../../API/hooks/channel/useAddMembers";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../Spinner/Spinner";

const InviteChannelModal = () => {
  const { workspace } = useSelector((state) => state.workspace);
  const { isOpen, channelData } = useSelector(
    (state) => state.modals.inviteToChannel
  );
  const dispatch = useDispatch();
  const addMember = useAddMember();
  const { id } = useParams();
  const [email, setEmail] = useState("");

  function handleClose(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  function closeModal() {
    dispatch(closeInviteChannel());
  }

  function handleAddMember() {
    if (email.length === 0) dispatch(closeInviteChannel());
    addMember.mutate(
      { channel_id: id, email: email },
      {
        onSuccess: () => {
          setEmail("");
          dispatch(closeInviteChannel());
        },
      }
    );
  }

  if (!isOpen) return;
  return (
    <Overlay closeOverlay={handleClose} className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalHeader_name}>
            <span>Add people to </span>
            <div className={styles.channel_part}>
              <ChannelType type={channelData?.type} />
              <span>{channelData?.name}</span>
            </div>
          </h3>
          <CloseIcon closeEvent={closeModal} />
        </div>
        <p className={styles.subtext}>
          You can also add email addresses of people who aren’t members of{" "}
          <strong>{workspace?.name}</strong>
        </p>
        <input
          type="text"
          placeholder="Enter a name or email address"
          className={styles.inputField}
          onInput={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className={styles.modalActions}>
          <div className={styles.skipButton} onClick={closeModal}>
            Skip for now
          </div>
          <div
            className={`${styles.skipButton} ${styles.send_invite} ${
              email.length===0 ? styles.disable_invite : ""
            }`}
            onClick={handleAddMember}
          >
            {addMember.isPending ? (
              <Spinner width={20} height={20} color="var(--primary-color)" />
            ) : (
              "Add Member"
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default InviteChannelModal;
