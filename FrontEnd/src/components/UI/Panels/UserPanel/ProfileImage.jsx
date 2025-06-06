// import React from "react";
import styles from "./UserPanel.module.css";
import { BiSolidUser } from "react-icons/bi";
// import UserImage from '../../User/UserImage';
const ProfileImage = () => {
  return (
    <div className={styles.profileImageContainer}>
      <BiSolidUser className={styles.profileImage} />
      {/* <UserImage/> */}
    </div>
  );
};

export default ProfileImage;
