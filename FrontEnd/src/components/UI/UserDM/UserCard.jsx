import styles from "./UserDM.module.css";
import Button from "../Buttons/Button/Button";
import style from "../Buttons/Button/Button.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import UserStatus from "../User/UserStatus";
import UserImage from "../User/UserImage";
import { useParams } from "react-router-dom";

const UserCard = () => {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.convers.chatMate);
  const { id } = useParams();

  function handelOpenUserPanel() {
    dispatch(
      openUserPanel({
        type: "userPanel",
        panel_id: receiver.id || receiver._id,
        page_id: id,
      })
    );
  }

  return (
    <div className={styles.UserCard}>
      <div className={styles.coverInfo}>
        <div className={styles.cover} onClick={handelOpenUserPanel}>
          <UserImage src={receiver?.photo} alt={receiver?.userName} />
        </div>
        <div className={styles.info}>
          <div className={styles.user} onClick={handelOpenUserPanel}>
            <span className={styles.name}>{receiver.userName}</span>
            <UserStatus status={receiver?.status} />
          </div>
          {receiver?.job && <span className={styles.job}>{receiver?.job}</span>}
          {/* <span className={styles.gender}>• He/Him</span> */}
        </div>
      </div>
      <div className={styles.description}>
        {receiver?.isMe ? (
          <>
            <strong>This is your space</strong>. Draft messages, list your
            to-dos, or keep links and files handy. You can also talk to yourself
            here, but please bear in mind you’ll have to supply both sides of
            the conversation.
          </>
        ) : (
          <>
            This conversation is just between{" "}
            <span className={styles.userMention} onClick={handelOpenUserPanel}>
              @{receiver?.userName}
            </span>{" "}
            and you. Check out their profile to learn more about them.
          </>
        )}
      </div>

      <Button onClick={handelOpenUserPanel} className={style.button}>
        View profile
      </Button>
    </div>
  );
};

export default UserCard;
