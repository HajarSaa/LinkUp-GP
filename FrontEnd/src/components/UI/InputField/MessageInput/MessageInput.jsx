import React, { useEffect, useRef, useState } from "react";
import styles from "./MessageInput.module.css";
import { HiMiniBold } from "react-icons/hi2";
import { FiItalic } from "react-icons/fi";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { PiLinkBold } from "react-icons/pi";
import { MdOutlineFormatListNumbered, MdOutlineFormatListBulleted } from "react-icons/md";
import { RiQuoteText } from "react-icons/ri";
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { PiCodeBlockBold } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";
import LowerToolbar from "./InputComponents/LowerToolbar";
import useSendMessage from "../../../../API/hooks/messages/useSendMessage";
import MediaContainer from "./MediaContainer/MediaContainer";
import UploadMenu from "./UploadMenu/UploadMenu";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../../../API/redux_toolkit/api_data/media/fileUploadSlice";
import { clearDraft, saveDraft } from "../../../../API/redux_toolkit/api_data/messages/messageDraftSlice";
import useTypingEmitter from "../../../../API/hooks/socket/useTypingEmmiter";
import { v4 as uuidv4 } from "uuid";

const MessageInput = () => {
  const textareaRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isChannel = location.pathname.includes("/channels");
  const pageId = `${isChannel ? "channel" : "conversation"}-${id}`;
  const sendMessage = useSendMessage();
  const messageDraft = useSelector((state) => state.messageDraft[pageId] || "");
  const [message, setMessage] = useState(messageDraft);
  const { pages } = useSelector((state) => state.fileUpload);
  const files = pages[pageId]?.files || [];
  const responseData = pages[pageId]?.responseData || [];

  const hasMedia = files.length > 0;
  const hasPendingMedia = files.some((f) => f.status === "pending");
  const canSend = (message.trim() || hasMedia) && !hasPendingMedia;

  const room = `${isChannel ? "channel" : "conversation"}:${id}`;
  const emitTyping = useTypingEmitter(room);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setMessage(messageDraft);
    setTimeout(() => {
      if (textareaRef.current) {
        const el = textareaRef.current;
        el.selectionStart = el.selectionEnd = el.value.length;
      }
    }, 0);
  }, [pageId, messageDraft]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    dispatch(saveDraft({ pageId, text: e.target.value }));
    emitTyping();
  };

  const handleSend = () => {
    if (!canSend) return;

    const tempId = uuidv4();
    const messageContent = {
      content: message,
      attachmentIds: responseData || [],
    };
    const type = isChannel ? "channel" : "conversation";

    sendMessage.mutate(
      {
        type,
        id,
        messageContent,
        tempId,
      },
      {
        onSuccess: () => {
          setMessage("");
          textareaRef.current.style.height = "40px";
          dispatch(clearFiles({ pageId }));
          dispatch(clearDraft({ pageId }));
        },
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <div className={styles.messageInputContainer}>
        <div className={styles.input_field}>
          <div className={styles.upper_row_icons}>
            {renderIcons(upperIcons, [3, 6], styles.upper_icons, styles.upper_icon_style)}
          </div>
          <textarea
            name="messageBox"
            ref={textareaRef}
            className={styles.textarea}
            placeholder="write your message ..."
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onInput={handleInputHeight}
          />
          <MediaContainer />

          <div className={styles.lower_row_icons}>
            <LowerToolbar />
            <div className={`${styles.right_icons} ${canSend && styles.activeSend}`}>
              <div className={`${styles.sendBtns} ${styles.sendBtns_send}`} onClick={handleSend}>
                <IoSend />
              </div>
              <div className={styles.box11}></div>
              <div className={`${styles.sendBtns} ${styles.sendBtns_dropdown}`}>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.newLineHint} ${!canSend && styles.hidden}`}>
          <span className={`${styles.hintText} ${canSend ? styles.showHint : styles.hideHint}`}>
            Shift + Enter for new line
          </span>
        </div>
      </div>
      <UploadMenu />
    </>
  );
};

export default MessageInput;

const upperIcons = [
  { icon: HiMiniBold },
  { icon: FiItalic },
  { icon: AiOutlineStrikethrough },
  { icon: PiLinkBold },
  { icon: MdOutlineFormatListNumbered },
  { icon: MdOutlineFormatListBulleted },
  { icon: RiQuoteText },
  { icon: IoCodeSlash },
  { icon: PiCodeBlockBold },
];

const renderIcons = (icons, positions, iconClass, customClass) => {
  return icons.map(({ icon: IconComponent }, index) => (
    <React.Fragment key={index}>
      <IconComponent className={`${iconClass} ${customClass}`} />
      {positions.includes(index + 1) && <div className={styles.box11}></div>}
    </React.Fragment>
  ));
};
