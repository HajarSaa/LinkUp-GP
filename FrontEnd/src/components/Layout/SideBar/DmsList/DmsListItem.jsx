/* eslint-disable no-unused-vars */
import styles from "./DmsList.module.css";
import { BiSolidUser } from "react-icons/bi";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DmsListItem = ({
  id,
  name,
  isActive = false,
  hasUnread,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dm/${id}`)
  };

  return (
    <div
      className={`${styles.dms_item}`}
      onClick={handleClick}
    >
      <div className={styles.left_side}>
        <BiSolidUser/>
      </div>
      <span className={styles.user_name}>{name}</span>
    </div>
  );
};

DmsListItem.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  hasUnread: PropTypes.bool,
};

export default DmsListItem;
