import styles from "./UserPanel.module.css";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { openEditContactModal } from "../../../../API/redux_toolkit/modals/userProfile/editContactModal";
const ProfileAbout = () => {
  const userProfile = useSelector((state) => state.userProfile.data);
  const dispatch = useDispatch();

  function handleOpenEditContact() {
    dispatch(openEditContactModal(userProfile));
  }
  return (
    <div className={styles.profileAbout}>
      <div className={styles.info_section}>
        <h3 className={styles.aboutTitle}>Contact Information</h3>
        {userProfile?.isMe && (
          <span className={styles.edit_btn} onClick={handleOpenEditContact}>
            Edit
          </span>
        )}
      </div>
      <div className={styles.aboutCard}>
        <div className={styles.aboutLeft}>
          <IoMailOutline className={styles.icons} />
          <p className={styles.aboutText}>
            <strong>Email Address</strong> <br />{" "}
            <span> {userProfile?.email} </span>
          </p>
        </div>
        <FaRegCopy className={styles.copyIcon} />
      </div>
      {userProfile?.phone && (
        <div className={styles.aboutCard}>
          <div className={styles.aboutLeft}>
            <FiPhone className={styles.icons} />
            <p className={styles.aboutText}>
              <strong>Phone</strong> <br />
              <span> {userProfile?.phone} </span>
            </p>
          </div>
          <FaRegCopy className={styles.copyIcon} />
        </div>
      )}{" "}
      {!userProfile?.phone && userProfile?.isMe && (
        <div className={styles.add_phone} onClick={handleOpenEditContact}>
          <span>+</span>
          <span>Add phone</span>
        </div>
      )}
    </div>
  );
};
export default ProfileAbout;
