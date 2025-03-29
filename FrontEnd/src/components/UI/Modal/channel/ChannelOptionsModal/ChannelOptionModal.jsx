/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./ChannelOptionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../../../../API/redux/chat/channel/channelMenuSlice";
import { openChannelDetails } from "../../../../../API/redux/chat/channel/channelDetailsSlice";
import { openNotificationsModel } from "../../../../../API/redux/chat/channel/notificationsModelSlice";
import Overlay from "../../Overlay/Overlay";

const ChannelOptionModal = ({ channel }) => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector((state) => state.channelMenu.isOpen);
    const [copyList, setCopyList] = useState(false);

    function handleClose(e) {
        if (e.target === e.currentTarget) dispatch(closeMenu());
    }
    function showCopyList() {
        setCopyList(true);
    }
    function hideCopyList() {
        setCopyList(false);
    }

    if (!isMenuOpen) return;
    return (
        <>
            <Overlay closeOverlay={handleClose} />
            <div className={styles.dropdownMenu}>
                <div
                    className={styles.menuItem}
                    onClick={() => {
                        dispatch(closeMenu());
                        dispatch(openChannelDetails({ channel, tab: "about" }));
                    }}
                >
                    Open channel details
                </div>
                <hr className={styles.divider} />
                <div
                    className={styles.menuItem}
                    onClick={() => {
                        dispatch(closeMenu());
                        dispatch(openNotificationsModel());
                    }}
                >
                    <span>Edit notifications</span>
                    <span className={styles.subText}>Every new message</span>
                </div>
                <div className={styles.menuItem}>Star channel</div>
                <hr className={styles.divider} />
                <div className={styles.menuItem}>Add a workflow</div>
                <div
                    className={styles.menuItem}
                    onClick={() => {
                        dispatch(closeMenu());
                        dispatch(openChannelDetails({ channel, tab: "settings" }));
                    }}
                >
                    Edit settings
                </div>
                <hr className={styles.divider} />
                <div
                    className={styles.copyList}
                    onMouseEnter={showCopyList}
                    onMouseLeave={hideCopyList}
                >
                    <div className={styles.menuItem}>
                        <div className={styles.hasSubmenu}>
                            <span>Copy</span>{" "}
                            <span className="d-flex">
                                <IoIosArrowForward className={styles.arrow} />
                            </span>
                        </div>
                    </div>
                    {copyList && (
                        <div className={styles.copyMenu}>
                            <div className={styles.copyItem}>Copy name</div>
                            <div className={styles.copyItem}>Copy link</div>
                            <div className={styles.copyItem}>Copy huddle link</div>
                        </div>
                    )}
                </div>
                <div className={styles.menuItem}>Search in channel</div>
                <div className={styles.menuItem}>Open in new window</div>
                <hr className={styles.divider} />
                <div className={`${styles.menuItem} ${styles.danger}`}>
                    Leave channel
                </div>
            </div>
        </>
    );
};

export default ChannelOptionModal;
