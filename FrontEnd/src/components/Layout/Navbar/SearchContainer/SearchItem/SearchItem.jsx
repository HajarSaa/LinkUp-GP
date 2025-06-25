import { PiArrowBendDownRight } from "react-icons/pi";
import styles from "./SearchItem.module.css";
import { FcContacts } from "react-icons/fc";
import PropTypes from "prop-types";

function SearchItem({ member = false, channel = false }) {
  if (member)
    return (
      <>
        <div className={`${styles.search_item} ${styles.contact_item}`}>
          <div className={styles.search_item_left_icon}></div>
          <div className={styles.user_data}>
            <span>Ahmed Ayman</span>
            <span>status</span>
            <span>About</span>
          </div>
        </div>
        <div className={`${styles.search_item} ${styles.contact_item}`}>
          {" "}
          <span className={styles.member_icon}>
            <PiArrowBendDownRight />
          </span>
          <span className={styles.member_icon}>
            <FcContacts />
          </span>
          <span>View profile</span>
        </div>
      </>
    );
  if (channel)
    return (
      <div className={`${styles.search_item} ${styles.contact_item}`}>
        <span className={styles.search_item_left_icon_ch}> # </span>
        <span>Name</span>
      </div>
    );
}
SearchItem.propTypes = {
  member: PropTypes.bool,
  channel: PropTypes.bool,
};


export default SearchItem;
