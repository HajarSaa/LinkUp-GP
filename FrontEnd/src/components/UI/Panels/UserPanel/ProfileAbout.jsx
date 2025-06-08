import styles from "./UserPanel.module.css";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa6";
import { useSelector } from "react-redux";
const ProfileAbout = () => {
  const userProfile = useSelector((state) => state.userProfile.data);
  return (
    <div className={styles.profileAbout}>
      <div className={styles.info_section}>
        <h3 className={styles.aboutTitle}>Contact Information</h3>
        <span className={styles.edit_btn}>Edit</span>
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
      )}
    </div>
  );
};
export default ProfileAbout;
