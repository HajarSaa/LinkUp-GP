import styles from "./Profile.module.css";
import IconDropdown from "../../../Dropdown/IconDropdown";
import { FiHeadphones } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { RiUserForbidLine } from "react-icons/ri";
import UserImage from "../../../User/UserImage";
import PropTypes from "prop-types";

const UserProfile = ({ userData }) => {
  const huddleItems = [
    { label: "Start Huddle", icon: <FiHeadphones /> },
    { label: "Join Huddle", icon: <IoIosLink /> },
  ];
  return (
    <div className={styles.upperSection}>
      <div className={styles.profileContainer}>
        <div className={styles.frameWrapper}>
          <div className={styles.profileDetails}>
            <div className={styles.profileImage}>
              <UserImage src={userData?.photo} alt={userData?.userName} />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{userData?.userName}</div>
              {userData?.discription && (
                <p className={styles.role}>
                  <span>{userData?.discription}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <IconDropdown
          icon={<FaRegStar />}
          label=""
          items={''}
          // items={<IoIosArrowDown />}
        />
        <IconDropdown icon={<FaRegBell />} label="Mute" items={""} />
        <IconDropdown icon={<FiUserPlus />} label="VIP" items={""} />
        <IconDropdown icon={<RiUserForbidLine />} label="Hide" items={""} />
        <IconDropdown
          icon={<FiHeadphones />}
          label="Huddle"
          items={huddleItems}
        />
      </div>
    </div>
  );
};
UserProfile.propTypes = {
  userData: PropTypes.object,
};

export default UserProfile;
