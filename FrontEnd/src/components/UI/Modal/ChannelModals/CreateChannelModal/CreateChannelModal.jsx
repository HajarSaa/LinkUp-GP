import { useState } from "react";
import styles from "./CreateChannelModal.module.css";
import { FaTimes, FaLink, FaPlus } from "react-icons/fa";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { LuMessageCircle } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import ChatPreview from "./ChatPreview/ChatPreview";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateChannel,
  openInviteChannel,
} from "../../../../../API/redux_toolkit/modals/modalsSlice";
import Overlay from "../Overlay/Overlay";
import useCreateChannel from "../../../../../API/hooks/channel/useCreateChannel";
import Spinner from "../../../Spinner/Spinner";
import ChannelType from "../../../Channel/ChannelType/ChannelType";
import { useNavigate } from "react-router-dom";

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [error_message, setErrorMessage] = useState(null);
  const { workspace } = useSelector((state) => state.workspace);
  const [channelName, setChannelName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { isOpen } = useSelector((state) => state.modals.createChannel);
  const { mutate: create_channel, isPending } = useCreateChannel();

  function handleClose(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  function closeModal() {
    dispatch(closeCreateChannel());
    setIsPublic(true);
    setChannelName("");
  }

  function handleCreation() {
    setErrorMessage(null);
    create_channel(
      {
        name: channelName,
        type: isPublic ? "public" : "private",
      },
      {
        onSuccess: (data) => {
          dispatch(closeCreateChannel());
          navigateTo(`/channels/${data.channel.id}`);
          dispatch(openInviteChannel(data?.channel));
          setIsPublic(true);
          setChannelName("");
        },
        onError: (error) => {
          setErrorMessage(error.response.data.message);
        },
      }
    );
  }

  if (!isOpen) return null;

  return (
    <Overlay closeOverlay={handleClose} className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.config}>
          <h2 className={styles.header_title}>Channel details</h2>
          <div className={styles.details}>
            <p className={styles.label}>Channel name</p>
            <input
              className={`${styles.name_input} ${
                error_message && styles.error_name_input
              }`}
              type="text"
              id="channelName"
              placeholder="# e.g. FrontEnd"
              value={channelName}
              onChange={(e) => {
                setErrorMessage(null);
                setChannelName(e.target.value.split(" ").join("-"));
              }}
            />
            {error_message ? (
              <p className={styles.error_message}>{error_message}</p>
            ) : (
              <>
                <p className={styles.description}>
                  Channels are where conversations happen around a topic. Use a
                  name that is easy to find and understand.
                </p>
              </>
            )}
            <div className={styles.visibility}>
              <p className={styles.label}>Visibility</p>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <div className={styles.visbText}>
                  Public – Anyone in{" "}
                  <span className={styles.workName}>{workspace?.name}</span>
                </div>
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                />
                <div className={styles.visbText}>
                  Private – Only specific people
                  <span>Can only be viewed or joined by invitation</span>
                </div>
              </label>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.createButton}
              disabled={!channelName.trim() || isPending}
              onClick={handleCreation}
            >
              {isPending ? (
                <Spinner width={30} height={30} color="var(--link-color)" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.prevHeader}>
            <div>
              <FaLink className={styles.headerIcon} />
              <FaTimes className={styles.headerIcon} onClick={closeModal} />
            </div>
          </div>
          <div className={styles.chatPreviewContainer}>
            <div className={styles.previewHeader}>
              <div className={styles.prevName}>
                <ChannelType type={isPublic ? "public" : "private"} />
                <span>{channelName || "channel-name"}</span>
              </div>
            </div>
            <div className={styles.previewTabs}>
              <span className={`${styles.tab} ${styles.activeTab}`}>
                <LuMessageCircle
                  style={{ transform: "rotateY(180deg)" }}
                  className={styles.icon}
                />{" "}
                Messages
              </span>
              <span className={styles.tab}>
                <RiStickyNoteAddLine className={styles.icon} /> Canvas
              </span>
            </div>
            <div className={styles.chatPreview}>
              <div className={styles.messages}>
                {[...Array(8)].map((_, i) => (
                  <ChatPreview key={i} />
                ))}
              </div>
              <div className={styles.inputContainer}>
                <button className={styles.plusButton}>
                  <FaPlus />
                </button>
                <input
                  type="text"
                  className={styles.inputField}
                  disabled
                  placeholder=""
                />
                <button className={styles.sendButton} disabled>
                  <IoMdSend className={styles.icon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default CreateChannelModal;
