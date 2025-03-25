import { useDispatch, useSelector } from "react-redux";
import { closeProfilePanel } from "../../../../API/redux/chat/channel/profilePanelSlice";
import styles from "./ProfilePanel.module.css";
import { FaTimes, FaClock, FaEnvelope, FaUserPlus, FaHeadphones, FaCommentDots } from "react-icons/fa";

const ProfilePanel = () => {
    const dispatch = useDispatch();
    const { isOpen, user } = useSelector((state) => state.profilePanel);

    if (!isOpen || !user) return null; // لو البانل مقفولة أو مفيش بيانات يوزر، متعرضش حاجة

    return (
        <div className={styles.profilePanel}>
            {/* ✅ الهيدر */}
            <div className={styles.header}>
                <h3>Profile</h3>
                <FaTimes className={styles.closeIcon} onClick={() => dispatch(closeProfilePanel())} />
            </div>

            {/* ✅ الصورة الشخصية */}
            <div className={styles.avatarContainer}>
                <img src={user.avatar} alt={user.name} className={styles.avatar} />
            </div>

            {/* ✅ بيانات المستخدم */}
            <div className={styles.userInfo}>
                <h2 className={styles.name}>{user.name}</h2>
                <p className={styles.status}>⚠️ Away, notifications snoozed</p>
                <p className={styles.time}>
                    <FaClock /> 23:18 local time
                </p>
            </div>

            {/* ✅ أزرار التفاعل */}
            <div className={styles.buttons}>
                <button className={styles.btn}>
                    <FaCommentDots /> Message
                </button>
                <button className={styles.btn}>
                    <FaHeadphones /> Huddle
                </button>
                <button className={styles.btn}>
                    <FaUserPlus /> VIP
                </button>
            </div>

            {/* ✅ معلومات الاتصال */}
            <div className={styles.contact}>
                <h4>Contact information</h4>
                <p className={styles.email}>
                    <FaEnvelope /> <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </div>
        </div>
    );
};

export default ProfilePanel;
