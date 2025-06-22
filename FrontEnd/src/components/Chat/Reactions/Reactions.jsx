import PropTypes from "prop-types";
import styles from "./Reactions.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import useGetMessageReactions from "../../../API/hooks/reactions/useGetMessageReactions";
import { getEmojiPickerPosition } from "../../../utils/modalsUtils";
import useToggleReaction from "../../../API/hooks/reactions/useToggleReaction";

function Reactions({ messageId }) {
  const dispatch = useDispatch();
  const add_react_ref = useRef(null);
  const { mutate: toggleThisReact } = useToggleReaction();
  const { data, isLoading, isError } = useGetMessageReactions(messageId);
  const reactionsObj = data?.groupedReactions || {};

  function openEmojies() {
    const rect = add_react_ref.current.getBoundingClientRect();
    const position = getEmojiPickerPosition(rect);
    dispatch(
      openEmojiPicker({
        position,
        messageId: messageId,
      })
    );
  }

  function removeThisReact(emoji) {
    toggleThisReact({
      messageId,
      emoji: emoji,
    });
  }

  if (isLoading || isError) return null;
  const reactions = Object.entries(reactionsObj);
  return (
    <>
      {reactions.length !== 0 && (
        <div className={styles.reactions}>
          {reactions.map(([emoji, { count }]) => (
            <div
              key={emoji}
              className={styles.react}
              onClick={() => removeThisReact(emoji)}
            >
              {/* <div className={styles.react_emoji}>{emoji}</div> */}
              <div className={styles.react_emoji}>
                <img src={emoji} alt="" />
              </div>
              <div className={styles.react_count}>{count}</div>
            </div>
          ))}

          <div
            className={styles.add_react}
            onClick={openEmojies}
            ref={add_react_ref}
          >
            <MdOutlineAddReaction />
          </div>
        </div>
      )}
    </>
  );
}
Reactions.propTypes = {
  messageId: PropTypes.any.isRequired,
  reactions: PropTypes.any,
};

export default Reactions;
