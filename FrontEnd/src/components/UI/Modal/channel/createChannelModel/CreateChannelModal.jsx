import { useState } from "react";
import styles from "./CreateChannelModal.module.css";
import { FaTimes, FaLink, FaPlus, FaLock } from "react-icons/fa";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { LuMessageCircle } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import ChatPreview from "./chatPreview/ChatPreview";
import { FiHash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateChannel,
  openAddMembers,
} from "../../../../../API/redux/modals/createChannelmodalSlice";

const CreateChannelModal = () => {
  const [channelName, setChannelName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { createChannelOpen: isOpen } = useSelector(
    (state) => state.createChannelModal
  );
  const dispatch = useDispatch();
  if (!isOpen) return;
  return (
    <div className="overlay">
      <div className={styles.modal}>
        <div className={styles.config}>
          <h2>Channel details</h2>
          <div className={styles.details}>
            <p className={styles.label}>Channel name</p>
            <input
              type="text"
              id="channelName"
              placeholder="# e.g. subscription-budget"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value.split(' ').join('-'))}
            />
            <p className={styles.description}>
              Channels are where conversations happen around a topic. Use a name
              that is easy to find and understand.
            </p>

            {/* Visibility Options */}
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
                  <span className={styles.workName}>Testing WorkSpace</span>
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
              onClick={() => dispatch(openAddMembers())}
            >
              Create
            </button>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.prevHeader}>
            <div>
              <FaLink className={styles.headerIcon} />
              <FaTimes
                className={styles.headerIcon}
                onClick={() => dispatch(closeCreateChannel())}
              />
            </div>
          </div>
          <div className={styles.chatPreviewContainer}>
            {/* Preview Header */}
            <div className={styles.previewHeader}>
              <h3 className={styles.prevName}>
                {isPublic ? (
                  <FiHash className={styles.icon} />
                ) : (
                  <FaLock className={styles.icon} />
                )}
                {channelName || "channel-name"}
              </h3>
            </div>

            {/* Tabs */}
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

            {/* Chat Preview */}
            <div className={styles.chatPreview}>
              <div className={styles.messages}>
                <ChatPreview />
                <ChatPreview />
                <ChatPreview />
                <ChatPreview />
                <ChatPreview />
                <ChatPreview />
                <ChatPreview />
                <ChatPreview />
              </div>
              {/* Input Field */}
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
    </div>
  );
};

export default CreateChannelModal;
