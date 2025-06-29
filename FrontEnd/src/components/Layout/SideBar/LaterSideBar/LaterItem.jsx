// LaterItem.jsx
import { useSelector } from "react-redux";
import styles from "./LaterSideBar.module.css";
import PropTypes from "prop-types";
import { findMemberById } from "../../../../utils/workspaceUtils";

const LaterItem = ({ laterDate}) => {
  const { workspace } = useSelector((state) => state.workspace);
  const userName = findMemberById(workspace, laterDate.userProfile).userName;
  return (
    <div className={styles.item}>
      <div className={styles.tags}>
        {laterDate.tag && <div className={styles.tag}>{laterDate.tag}</div>}
        <div className={styles.message_source}># General</div>
      </div>
      <div className={styles.item_header}>
        <div className={styles.avatar}></div>
        <div className={styles.item_texts}>
          <span className={styles.username}>{userName}</span>
          <span className={styles.message}>{laterDate?.content}</span>
        </div>
      </div>
    </div>
  );
};

LaterItem.propTypes = {
  laterDate: PropTypes.any.isRequired,
};

export default LaterItem;
