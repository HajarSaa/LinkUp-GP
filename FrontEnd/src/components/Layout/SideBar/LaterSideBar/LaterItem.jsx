// LaterItem.jsx
import { useSelector } from "react-redux";
import styles from "./LaterSideBar.module.css";
import PropTypes from "prop-types";
import { findMemberById } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";

const LaterItem = ({ laterData}) => {
  const { workspace } = useSelector((state) => state.workspace);
  const member = findMemberById(workspace, laterData.userProfile);

  return (
    <div className={styles.item}>
      <div className={styles.tags}>
        {laterData.tag && <div className={styles.tag}>{laterData.tag}</div>}
        <div className={styles.message_source}># General</div>
      </div>
      <div className={styles.item_header}>
        <div className={styles.avatar}>
          <UserImage src={member.photo} />
        </div>
        <div className={styles.item_texts}>
          <span className={styles.username}>{member.userName}</span>
          <span className={styles.message}>{laterData?.message?.content}</span>
        </div>
      </div>
    </div>
  );
};

LaterItem.propTypes = {
  laterData: PropTypes.any.isRequired,
};

export default LaterItem;
