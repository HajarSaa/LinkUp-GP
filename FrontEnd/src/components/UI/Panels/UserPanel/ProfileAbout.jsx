import { useDispatch, useSelector } from "react-redux";
import styles from "./UserPanel.module.css";
import { openEditStartDateModal } from "../../../../API/redux_toolkit/modals/userProfile/editStartDateSlice";

function ProfileAbout() {
  const userProfile = useSelector((state) => state.userProfile.data);
  const dispatch = useDispatch();

  function handleOpen() {
    dispatch(openEditStartDateModal(userProfile));
  }

  if (!userProfile?.startDate && !userProfile?.isMe) return null;
  return (
    <div className={styles.profile_contact}>
      <div className={styles.info_section}>
        <h3 className={styles.aboutTitle}>About me</h3>
        {userProfile?.isMe && (
          <span className={styles.edit_btn} onClick={handleOpen}>
            Edit
          </span>
        )}
      </div>
      {userProfile?.startDate ? (
        <div className={styles.aboutCard}>
          <div className={styles.aboutLeft}>
            <p className={styles.aboutText}>
              <strong>Start Date</strong> <br />{" "}
              <span> {userProfile?.startDate} </span>
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.add_phone} onClick={handleOpen}>
          <span>+</span>
          <span>Add start date</span>
        </div>
      )}
    </div>
  );
}

export default ProfileAbout;
