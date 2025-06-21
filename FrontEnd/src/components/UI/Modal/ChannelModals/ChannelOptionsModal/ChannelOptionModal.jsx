import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./ChannelOptionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../../../../API/redux_toolkit/modals/channel/channelMenuSlice";
import { openChannelDetails } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { openNotificationsModal } from "../../../../../API/redux_toolkit/modals/notificationsModalSlice";
import Overlay from "../Overlay/Overlay";
import useLeaveChannel from "../../../../../API/hooks/channel/useLeaveChannel";
import Spinner from "../../../Spinner/Spinner";
import { getNearestChannel } from "../../../../../utils/channelUtils";
import { useNavigate } from "react-router-dom";

const ChannelOptionModal = () => {
    const dispatch = useDispatch();
    const [copyList, setCopyList] = useState(false);
    const isMenuOpen = useSelector((state) => state.channelMenu.isOpen);
    const { channel } = useSelector((state) => state.channel);
    const { workspace } = useSelector((state) => state.workspace);
    const navigateTo = useNavigate();
    const { mutate: leave_channel, isPending } = useLeaveChannel();

    function handleClose(e) {
        if (e.target === e.currentTarget) dispatch(closeMenu());
    }
    function showCopyList() {
        setCopyList(true);
    }
    function hideCopyList() {
        setCopyList(false);
    }

    function handle_leave(e) {
        e.stopPropagation();
        leave_channel(channel.id, {
            onSuccess: () => {
                dispatch(closeMenu());
                const nearestChannel = getNearestChannel(channel?.id, workspace);
                navigateTo(`/channels/${nearestChannel}`);
            },
        });
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
                        dispatch(openChannelDetails({ tab: "about" }));
                    }}
                >
                    Open channel details
                </div>
                <hr className={styles.divider} />
                <div
                    className={styles.menuItem}
                    onClick={() => {
                        dispatch(closeMenu());
                        dispatch(openNotificationsModal());
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
                        dispatch(openChannelDetails({ tab: "settings" }));
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
                {!channel?.required && (
                    <>
                        <hr className={styles.divider} />
                        <div
                            className={`${styles.menuItem} ${styles.danger}`}
                            onClick={handle_leave}
                        >
                            {isPending ? (
                                <span className={styles.spinner_loading}>
                                    <Spinner width={20} height={20} color="var(--error-color)" />
                                </span>
                            ) : (
                                "Leave channel"
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ChannelOptionModal;
