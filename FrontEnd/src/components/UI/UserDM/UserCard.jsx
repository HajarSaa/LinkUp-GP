import styles from "./UserDM.module.css";
import { BiSolidUser } from "react-icons/bi";
import Button from "../Buttons/Button/Button";
import style from "../Buttons/Button/Button.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanel";
import { chatMate } from "../../../utils/conversUtils";

const UserCard = () => {
  const dispatch = useDispatch();
  const { convers } = useSelector((state) => state.convers);
  const { workspace } = useSelector((state) => state.workspace);
  const receiver = chatMate(convers, workspace.members);

  function handelOpenUserPanel() {
    dispatch(openUserPanel(receiver));
  }

  return (
    <div className={styles.UserCard}>
      <div className={styles.coverInfo}>
        <BiSolidUser className={styles.cover} onClick={handelOpenUserPanel} />
        <div className={styles.info}>
          <div className={styles.user} onClick={handelOpenUserPanel}>
            <span className={styles.name}>{receiver?.userName}</span>
            <span className={styles.status}></span>
          </div>
          {/* <span className={styles.job}>Backend Developer</span>
          <span className={styles.gender}>• He/Him</span> */}
        </div>
      </div>
      <span className={styles.description}>
        This conversation is just between{" "}
        <span className={styles.userMention}>@User</span> and you. Check out
        their profile to learn more about them.
      </span>

      <Button onClick={handelOpenUserPanel} className={style.button}>
        View profile
      </Button>
    </div>
  );
};

export default UserCard;
