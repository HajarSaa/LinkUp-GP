import styles from "./UserPanel.module.css";
import { LuClock3 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { openEditUserProfile } from "../../../../API/redux_toolkit/modals/userProfile/editUserProfie";
import UserStatus from "../../User/UserStatus";
import LocalTime from "../../User/LocalTime";
const ProfileInfo = () => {
  const userProfile = useSelector((state) => state.userProfile.data);
  const dispatch = useDispatch();

  function handleOpenEditUserProfile(focusField = "fullName") {
    dispatch(
      openEditUserProfile({ data: userProfile, focusField: focusField })
    );
  }


  return (
    <div className={styles.profileInfo}>
      <div className={styles.info}>
        <div className={styles.user}>
          <div className={styles.info_section}>
            <span className={styles.name}>{userProfile?.userName}</span>
            {userProfile?.isMe && (
              <span
                className={styles.edit_btn}
                onClick={() => {
                  handleOpenEditUserProfile("fullName");
                }}
              >
                Edit
              </span>
            )}
          </div>
          {userProfile?.isMe && (
            <div
              className={styles.user_pronounc}
              onClick={() => {
                handleOpenEditUserProfile("namePronunciation");
              }}
            >
              <span>+</span>
              <span>Add name pronunciation</span>
            </div>
          )}
          {userProfile?.about && (
            <span className={styles.jobTitle}>{userProfile?.about}</span>
          )}
          {userProfile?.gender && (
            <span className={styles.gender}>{userProfile?.gender}</span>
          )}
        </div>
        <p className={styles.status}>
          <UserStatus status={userProfile?.status} />
          <span> {userProfile?.status}</span>
        </p>
        <div className={styles.local}>
          <LuClock3 className={styles.clockIcon} />
          <LocalTime />
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
