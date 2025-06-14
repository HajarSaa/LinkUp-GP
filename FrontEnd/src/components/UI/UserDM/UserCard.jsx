import styles from "./UserDM.module.css";
import Button from "../Buttons/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import UserStatus from "../User/UserStatus";
import UserImage from "../User/UserImage";
import { useParams } from "react-router-dom";
import ProfileEditModal from "../Modal/EditProfileModal/EditProfile";
import { openEditUserProfile } from "../../../API/redux_toolkit/modals/userProfile/editUserProfie";
import UploadProfilePhotoModal from "../Modal/UploadProfilePhotoModal/UploadProfilePhoto";
import { openUploadUserImageModal } from "../../../API/redux_toolkit/modals/userProfile/uploadUserImage";

const UserCard = () => {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.convers.chatMate);
  // const onlineUsers = useSelector((state) => state.workspace.onlineUsers);
  const { id } = useParams();
  function handelOpenUserPanel() {
    dispatch(
      openUserPanel({
        type: "userPanel",
        panel_id: receiver.id || receiver._id,
        page_id: id,
      })
    );
  }

  function handleOpenEditUserProfile(focusField = "fullName") {
    dispatch(openEditUserProfile({ data: receiver, focusField: focusField }));
  }
  function handleOpenUploadUserPhoto() {
    dispatch(openUploadUserImageModal(receiver));
  }
  return (
    <>
      <div className={styles.UserCard}>
        <div className={styles.coverInfo}>
          <div className={styles.cover} onClick={handelOpenUserPanel}>
            <UserImage src={receiver?.photo} alt={receiver?.userName} />
          </div>
          <div className={styles.info}>
            <div className={styles.user} onClick={handelOpenUserPanel}>
              <span className={styles.name}>{receiver.userName}</span>
              <UserStatus status={receiver?.status} />
            </div>
            {receiver?.job && (
              <span className={styles.job}>{receiver?.job}</span>
            )}
            {receiver?.gender && (
              <span className={styles.gender}>{receiver?.gender}</span>
            )}
          </div>
        </div>
        <div className={styles.description}>
          {receiver?.isMe ? (
            <>
              <strong>This is your space</strong>. Draft messages, list your
              to-dos, or keep links and files handy. You can also talk to
              yourself here, but please bear in mind you’ll have to supply both
              sides of the conversation.
            </>
          ) : (
            <>
              This conversation is just between{" "}
              <span
                className={styles.userMention}
                onClick={handelOpenUserPanel}
              >
                @{receiver?.userName}
              </span>{" "}
              and you. Check out their profile to learn more about them.
            </>
          )}
        </div>

        <div className={styles.action_buttons}>
          {!receiver?.isMe && (
            <Button onClick={handelOpenUserPanel}>View profile</Button>
          )}
          {receiver?.isMe && (
            <>
              <Button
                onClick={() => {
                  handleOpenEditUserProfile("fullName");
                }}
              >
                Edit profile
              </Button>
              <Button onClick={handleOpenUploadUserPhoto}>
                Upload profile photo
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Modals */}
      <ProfileEditModal />
      <UploadProfilePhotoModal />
    </>
  );
};

export default UserCard;
