// import React from "react";
import styles from "./UserPanel.module.css";
import UserImage from "../../User/UserImage";
import { useSelector } from "react-redux";
const ProfileImage = () => {
  const userProfile = useSelector((state) => state.userProfile.data);

  return (
    <div className={styles.profileImageContainer}>
      <div className={styles.profileImage}>
        <UserImage src={userProfile?.photo} alt={userProfile?.userName} />
      </div>
    </div>
  );
};

export default ProfileImage;
