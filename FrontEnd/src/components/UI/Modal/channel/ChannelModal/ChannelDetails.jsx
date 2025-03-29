import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../../API/redux/chat/channel/channelDetailsSlice";
import { closeChannelDetails } from "../../../../../API/redux/chat/channel/channelDetailsSlice";
import styles from "./ChannelDetails.module.css";
import { RiCloseLargeFill } from "react-icons/ri";

const ChannelDetails = () => {
    const dispatch = useDispatch();
    const { channelData } = useSelector((state) => state.channelDetails);
    const { isOpen } = useSelector((state) => state.channelDetails);
    const activeTab = useSelector((state) => state.channelDetails.activeTab);
    const isJoined = true;

    // by default, the active tab is "members" for header ,members & channel details
    // const [activeTab, setActiveTab] = useState("members");

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(closeChannelDetails());
        }
    };

    if (!isOpen) return;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal}>
                <div>
                    {/* زر الإغلاق */}
                    <button className={styles.closeBtn} onClick={() => dispatch(closeChannelDetails())}>
                        <RiCloseLargeFill />
                    </button>

                    {/* اسم القناة */}
                    <h2 className={styles.channelName}>#{channelData?.name}</h2>

                    {/* زر Join Channel + Huddle */}
                    <div className={styles.actions}>
                        {isJoined ? (
                            <button className={styles.leaveBtn}>Leave Channel</button>
                        ) : (
                            <button className={styles.joinBtn}>Join Channel</button>
                        )}
                        <button className={styles.huddleBtn}>🎧 Huddle</button>
                    </div>

                    {/* ✅ التابات */}
                    <div className={styles.tabs}>
                        <span
                            onClick={() => dispatch(setActiveTab("about"))}
                            className={activeTab === "about" ? styles.activeTab : ""}
                        >
                            About
                        </span>
                        <span
                            onClick={() => dispatch(setActiveTab("members"))}
                            className={activeTab === "members" ? styles.activeTab : ""}
                        >
                            Members ({channelData?.members?.length})
                        </span>
                        <span
                            onClick={() => dispatch(setActiveTab("integrations"))}
                            className={activeTab === "integrations" ? styles.activeTab : ""}
                        >
                            Integrations
                        </span>
                        <span
                            onClick={() => dispatch(setActiveTab("settings"))}
                            className={activeTab === "settings" ? styles.activeTab : ""}
                        >
                            Settings
                        </span>
                    </div>
                </div>

                {/* ✅ عرض محتوى التاب بناءً على الـ activeTab */}
                {activeTab === "members" && <div className={styles.searchContainer}>
                    <input name="searchContainer" type="text" placeholder="Find members" className={styles.searchInput} />
                    <select name="filter" className={styles.filterSelect}>
                        <option>Everyone</option>
                    </select>
                </div>}
                <div className={styles.tabContent}>
                    {activeTab === "members" && (
                        <div className={styles.memberTap}>
                            {/* البحث عن الأعضاء */}
                            {/* قائمة الأعضاء */}

                            {channelData?.members?.map((member) => (
                                <div key={member.id} className={styles.memberItem}>
                                    <img src={member.avatar} alt={member.name} className={styles.memberAvatar} />
                                    <div className={styles.memberInfo}>
                                        <strong>{member.name}</strong>
                                        <span>{member.role}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                    {activeTab === "about" && (
                        <div className={styles.aboutTab}>
                            <h3>About this Channel</h3>
                            <p><strong>Topic:</strong> {channelData?.topic}</p>
                            <p><strong>Created by:</strong> {channelData?.createdBy}</p>
                            <p><strong>Created at:</strong> {new Date(channelData?.createdAt).toLocaleDateString()}</p>
                            <p><strong>Description:</strong> {channelData?.description}</p>
                        </div>
                    )}

                    {activeTab === "integrations" && (
                        <div className={styles.integrationsTab}>
                            <p>Here you can manage integrations for this channel.</p>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className={styles.settingsTab}>
                            {/* Channel Name Section */}
                            <div className={styles.settingSection}>
                                <div className={styles.settingHeader}>
                                    <span className={styles.settingTitle}>Channel name</span>
                                    <span className={styles.settingEdit}>Edit</span>
                                </div>
                                <p className={styles.settingChannelName}># all-testing-workspace</p>
                            </div>

                            {/* Posting Permissions Section */}
                            <div className={styles.settingSection}>
                                <div className={styles.settingHeader}>
                                    <span className={styles.settingTitle}>Posting permissions</span>
                                    <span className={styles.settingEdit}>Edit</span>
                                </div>
                                <ul className={styles.settingList}>
                                    <li>Everyone can post</li>
                                    <li>Everyone can reply to messages</li>
                                    <li>Because of your workspace settings, only people who have permission can use <b>@everyone</b> mentions</li>
                                </ul>
                                <span className={styles.settingLearnMore}>Learn more</span>
                            </div>

                            {/* Huddles Section */}
                            <div className={styles.settingSection}>
                                <div className={styles.settingHeader}>
                                    <span className={styles.settingTitle}>Huddles</span>
                                    <span className={styles.settingEdit}>Edit</span>
                                </div>
                                <p className={styles.settingDescription}>
                                    Members can start and join huddles in this channel.
                                    <span className={styles.settingLearnMore}> Learn more</span>
                                </p>
                                <div className={styles.settingButtons}>
                                    <button className={styles.settingHuddleBtn}>
                                        <i className="icon-headset"></i> Start huddle
                                    </button>
                                    <button className={styles.settingHuddleBtn}>
                                        <i className="icon-link"></i> Copy huddle link
                                    </button>
                                </div>
                            </div>


                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChannelDetails;
