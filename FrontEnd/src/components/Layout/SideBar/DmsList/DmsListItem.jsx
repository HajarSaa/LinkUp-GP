import styles from "./DmsList.module.css";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import UserImage from "../../../UI/User/UserImage";
import UserStatusDot from "../../../UI/User/UserStatusDot";

const DmsListItem = ({ dmData, isActive }) => {
  const navigate = useNavigate();

  const handleDeletelteItem = (e) => {
    e.stopPropagation();
    console.log("closed");
  };

  const handleClick = () => {
    navigate(`/conversations/${dmData.conversationId}`);
  };

  // ✅ prevent crash if member is missing
  if (!dmData.member) return null;

  return (<>
      <div
        className={`${styles.dms_item} ${isActive ? styles.active : ""}`}
        onClick={handleClick}
      >
        <div className={styles.left_side}>
          <div className={styles.photo_wrapper}>
            <UserImage src={dmData.member.photo} alt={"conv member"} />
          </div>
          <UserStatusDot userId={dmData.member.user} />
        </div>
        <div className={styles.user_name}>
          <span>{dmData.member.userName}</span>
          {dmData.isMe && <span className={styles.user_name_hint}>(you)</span>}
        </div>
        <div className={styles.right_side} onClick={handleDeletelteItem}>
          <IoMdClose />
        </div>
      </div>
    </>)
  ;
};

DmsListItem.propTypes = {
  dmData: PropTypes.object,
  workspace: PropTypes.object,
  isActive: PropTypes.bool,
};

export default DmsListItem;
