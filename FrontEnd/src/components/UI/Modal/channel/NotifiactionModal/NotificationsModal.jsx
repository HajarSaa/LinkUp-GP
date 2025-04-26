import { useDispatch, useSelector } from "react-redux";
import styles from "./NotificationsModal.module.css";
import { closeNotificationsModal } from "../../../../../API/redux_toolkit/modals/notificationsModalSlice";
import { IoMdClose } from "react-icons/io";

const NotificationsModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.notificationsModal.isOpen);

    function closeModel(e) {
        if (e.target === e.currentTarget) dispatch(closeNotificationsModal());
    }

    if (!isOpen) return null;
    return (
        <div className="overlay" onClick={closeModel}>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <div className={styles.modalHeader}>Notifications</div>
                    <span
                        className={`align-items-center ${styles.headerIcon}`}
                        onClick={() => dispatch(closeNotificationsModal())}
                    >
                        <IoMdClose />
                    </span>
                </div>
                <p>Send a notification for</p>
                <div className={styles.radioGroup}>
                    <label>
                        <input type="radio" name="notifications" defaultChecked /> All new
                        messages
                    </label>
                    <label>
                        <input type="radio" name="notifications" /> Mentions
                    </label>
                    <label>
                        <input type="radio" name="notifications" /> Nothing
                    </label>
                </div>
                <div className={styles.checkboxGroup}>
                    <hr className="divider" />

                    <label htmlFor="mobileSettings" className={styles.checkboxItem}>
                        <input id="mobileSettings" type="checkbox" />
                        <p>Use different settings for mobile devices</p>
                    </label>

                    <hr className="divider" />

                    <label htmlFor="getAll" className={styles.checkboxItem}>
                        <input id="getAll" type="checkbox" />
                        <p>Get notified about all thread replies in this channel</p>
                    </label>

                    <hr className="divider" />

                    <label htmlFor="muteChannel" className={styles.checkboxItem}>
                        <input id="muteChannel" type="checkbox" />
                        <p>Mute channel</p>
                    </label>

                    <hr className="divider" />
                </div>

                <div className={styles.note}>
                    <span>
                        Note: You can set notification keywords and change your
                        workspace-wide settings in your{" "}
                    </span>
                    <a href="#">Preferences</a>.
                </div>
                <hr className="divider" />

                <div className={styles.modalFooter}>
                    <div
                        className={styles.cancelBtn}
                        onClick={() => dispatch(closeNotificationsModal())}
                    >
                        Cancel
                    </div>
                    <div className={styles.saveBtn}>Save changes</div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;
