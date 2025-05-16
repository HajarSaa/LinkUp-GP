import styles from "./DmsList.module.css";
import { BiSolidUser } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { findMemberById } from "../../../../utils/workspaceUtils";

const DmsListItem = ({ dmData, workspace }) => {
  const navigate = useNavigate();

  const memberData = findMemberById(
    workspace,
    dmData.memberOneId,
    dmData.memberTwoId
  );


  const handleDeletelteItem = (e) => {
    e.stopPropagation();
    console.log("closed");
  };
  const handleClick = () => {
    navigate(`/dm/${dmData.id}`);
  };

  return (
    <div className={`${styles.dms_item}`} onClick={handleClick}>
      <div className={styles.left_side}>
        <BiSolidUser />
      </div>
      <div className={styles.user_name}>
        <span>{memberData.member.userName}</span>
        {memberData.isMe && (
          <span className={styles.user_name_hint}>(you)</span>
        )}
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
};

export default DmsListItem;
