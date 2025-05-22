import styles from "./DmsList.module.css";
import { BiSolidUser } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DmsListItem = ({ dmData, isActive }) => {
  const navigate = useNavigate();

  const handleDeletelteItem = (e) => {
    e.stopPropagation();
    console.log("closed");
  };

  const handleClick = () => {
    navigate(`/dm/${dmData.conversationId}`);
  };

  return (
    <div
      className={`${styles.dms_item} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.left_side}>
        <BiSolidUser />
      </div>
      <div className={styles.user_name}>
        <span>{dmData.member.userName}</span>
        {dmData.isMe && <span className={styles.user_name_hint}>(you)</span>}
      </div>
      <div className={styles.right_side} onClick={handleDeletelteItem}>
        <IoMdClose />
      </div>
    </div>
  );
};

DmsListItem.propTypes = {
  dmData: PropTypes.object,
  workspace: PropTypes.object,
  isActive: PropTypes.bool,
};

export default DmsListItem;
