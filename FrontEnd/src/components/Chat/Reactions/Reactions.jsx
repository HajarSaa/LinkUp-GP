import PropTypes from "prop-types";
import styles from "./Reactions.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import useGetMessageReactions from "../../../API/hooks/reactions/useGetMessageReactions";

function Reactions({ messageId }) {
  const dispatch = useDispatch();
  const add_react_ref = useRef(null);
  const {data,isLoading,isError} = useGetMessageReactions(messageId);

  function openEmojies() {
    dispatch(openEmojiPicker());
  }

  return (
    <div className={styles.reactions}>
      <div className={styles.react}>
        <div className={styles.react_emoji}>🤔</div>
        <div className={styles.react_count}>1</div>
      </div>
      <div
        className={styles.add_react}
        onClick={openEmojies}
        ref={add_react_ref}
      >
        <MdOutlineAddReaction />
      </div>
    </div>
  );
}
Reactions.propTypes = {
  messageId: PropTypes.any.isRequired,
  reactions: PropTypes.any,
};

export default Reactions;
