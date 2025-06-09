// import React from "react";
import styles from "./UserPanel.module.css";
import UserImage from "../../User/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { openUploadUserImageModal } from "../../../../API/redux_toolkit/modals/userProfile/uploadUserImage";
import Button from "../../Buttons/Button/Button";

const ProfileImage = () => {
  const userProfile = useSelector((state) => state.userProfile.data);
  const dispatch = useDispatch();

  function handleOpenUploadUserPhoto() {
    dispatch(openUploadUserImageModal(userProfile));
  }
  return (
    <div className={styles.profileImageContainer}>
      <div className={styles.profileImage}>
        <UserImage src={userProfile?.photo} alt={userProfile?.userName} />
      </div>
        {userProfile?.isMe && (
          <Button onClick={handleOpenUploadUserPhoto} className={styles.upload_image}
          >
            Upload photo
          </Button>
        )}
    </div>
  );
};

export default ProfileImage;
