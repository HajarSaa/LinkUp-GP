import { BiSolidUser } from "react-icons/bi";
import styles from "./ChatMessage.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import Reaction from "./Reaction";
import { useRef, useState } from "react";
import EmojiPicker from "../../UI/EmojiPicker/EmojiPicker";

const ChatMessage = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState("");
  const add_react_ref = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setEmoji((prev) => prev + emoji.native);
    // setShowPicker(false);
  };

  return (
    <div className={styles.message_container}>
      <div className={styles.message}>
        <div className={styles.message_leftSide}>
          <div className={styles.profileWrapper}>
            {/* <img/> */}
            {/* لو فيه صوره هنضيفها مفيش يبقي الديفولت */}
            <BiSolidUser className={styles.profile} />
          </div>
        </div>
        <div className={styles.message_rightSide}>
          <div className={styles.message_content}>
            <div className={styles.message_info}>
              <div className={styles.message_sender}>Omar</div>
              <div className={styles.message_time}>2:49 PM</div>
            </div>
            <div className={styles.message_text}>
              Anyone in Shebin or around?
            </div>
          </div>
          <div className={styles.reactions}>
            <Reaction />
            <div
              className={styles.add_react}
              onClick={() => setShowPicker(!showPicker)}
              ref={add_react_ref}
            >
              <MdOutlineAddReaction />
              {showPicker && (
                <EmojiPicker
                  targetRef={add_react_ref}
                  onSelect={handleEmojiSelect}
                />
              )}
              {console.log(showPicker,emoji)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.repliesWrapper}>
        <div className={styles.replies}>
          <div className={styles.frameDiv}>
            <div className={styles.photosParent}>
              <div className={styles.photos1}>
                <img className={styles.x26Icon} alt="" src="26x26.png" />
              </div>
              <div className={styles.photos1}>
                <img className={styles.x26Icon} alt="" src="26x26.png" />
              </div>
            </div>
            <div className={styles.repliesViewThreadContainer}>
              <span className={styles.replies1}>{`4 replies   `}</span>
              <span className={styles.viewThread}>View thread</span>
            </div>
          </div>
          <div className={styles.repliesInner}>
            <div className={styles.iconWrapper}>
              <div className={styles.icon2}>
                <img
                  className={styles.typelineStatenormalIcon}
                  alt=""
                  src="Type=Line, State=Normal.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.iconParent}>
        <div className={styles.icon3}>
          <img
            className={styles.typelineStatenormalIcon}
            alt=""
            src="Type=Line, State=Normal.svg"
          />
        </div>
        <div className={styles.icon3}>
          <img
            className={styles.typelineStatenormalIcon}
            alt=""
            src="Type=Line, State=Normal.svg"
          />
        </div>
        <div className={styles.icon3}>
          <img
            className={styles.typelineStatenormalIcon}
            alt=""
            src="Type=Line, State=Normal.svg"
          />
        </div>
        <div className={styles.icon3}>
          <img
            className={styles.typelineStatenormalIcon}
            alt=""
            src="Type=Line, State=Normal.svg"
          />
        </div>
        <div className={styles.icon3}>
          <img
            className={styles.typelineStatenormalIcon}
            alt=""
            src="Type=Line, State=Normal.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
