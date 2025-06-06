
import styles from "./UserPanel.module.css";
import { LuClock3 } from "react-icons/lu";
import { useSelector } from "react-redux";
import UserStatus from '../../User/UserStatus'
import LocalTime from '../../User/LocalTime';
const ProfileInfo = () => {
  const userProfile = useSelector((state) => state.userProfile.data);
  return (
    <div className={styles.profileInfo}>
      <div className={styles.info}>
        <div className={styles.user}>
          <span className={styles.name}>{userProfile?.userName}</span>
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
          <LocalTime/>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
