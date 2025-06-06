import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";
import ProfileAbout from "./ProfileAbout";
import styles from "./UserPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanel";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import { useEffect, useRef } from "react";
const ProfileCard = () => {
  const { isOpen, userData } = useSelector(
    (state) => state.chatPanel.userPanel
  );
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const handleClose = () => {
    dispatch(closeChatPanel());
  };

  console.log(userData);

    useEffect(() => {
      const el = scrollRef.current;
      const handleScroll = () => {
        if (el.scrollTop > 20) {
          el.classList.add(styles.scrolled);
        } else {
          el.classList.remove(styles.scrolled);
        }
      };

      el.addEventListener("scroll", handleScroll);

      return () => {
        el.removeEventListener("scroll", handleScroll);
      };
    }, []);

  if (!isOpen) return null;
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <span>Profile</span>
        <CloseIcon closeEvent={handleClose} />
      </div>

      <div className={styles.panel_body} ref={scrollRef}>
        <ProfileImage />
        <ProfileInfo
          name="User"
          jobTitle="Backend Developer"
          gender="He/Him"
          status="Away"
          localTime="6:20 AM local time"
        />
        <ProfileActions />
        <ProfileAbout emailAddress="user@gmail.com" phone="01012345678" />
      </div>
    </div>
  );
};

export default ProfileCard;
