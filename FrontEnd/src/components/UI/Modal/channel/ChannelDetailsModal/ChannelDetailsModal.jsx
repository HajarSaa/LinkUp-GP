import { IoIosClose, IoMdAdd } from "react-icons/io";
import { BsArrowDown, BsArrowUp, BsBell, BsCopy } from "react-icons/bs";
import styles from "./ChannelDetailsModal.module.css";
import PropTypes from "prop-types";
import {
  FaArchive,
  FaHashtag,
  FaLink,
  FaLock,
  FaRegStar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChannelDetails,
  setActiveTab,
} from "../../../../../API/redux/modals/channelDetailsSlice";
import DetailsButton from "../../../Buttons/ChannelButtons/DetailsButton/DetailsButton";
import {
  MdDeleteOutline,
  MdHeadset,
  MdOutlinePersonAddAlt,
} from "react-icons/md";
import SearchInput from "../../../InputField/ChannelInputs/SearchInput/SearchInput";
import { FiChevronDown } from "react-icons/fi";
import { TbMessageCircleFilled, TbPin } from "react-icons/tb";
import { GoStack } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { RiStickyNoteAddLine } from "react-icons/ri";

const ChannelDetailsModal = ({ channel }) => {
  const dispatch = useDispatch();
  const { isOpen, activeTab, channelData } = useSelector(
    (state) => state.channelDetailsModal
  );
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeChannelDetails());
    }
  };

  if (!isOpen) return;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={`align-items-center gap-3`}>
            <span className={`padd-3 align-items-center`}>
              <FaHashtag />
            </span>
            <span className={`f-bold f-18`}>{channel.name}</span>
          </div>
          <span
            className={`${styles.closeBtn} iconsPadding align-items-center`}
            onClick={() => dispatch(closeChannelDetails())}
          >
            <IoIosClose />
          </span>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <DetailsButton icon={<FaRegStar />} />
          <DetailsButton icon={<BsBell />}>
            Get notifications for all messages
          </DetailsButton>
          <DetailsButton icon={<MdHeadset />}>Huddle</DetailsButton>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {["about", "members", "tabs", "integrations", "settings"].map(
            (tab) => (
              <div
                key={tab}
                className={activeTab === tab ? styles.activeTab : ""}
                onClick={() => dispatch(setActiveTab(tab))}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            )
          )}
        </div>

        {/* Content */}
        <div className={styles.tabContent}>
          {/* About Tab */}
          {activeTab === "about" && (
            <div className={styles.editContent}>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.top}>
                    <span className={styles.infoTitle}>Channel name</span>
                    <span className={styles.infoEdit}>Edit</span>
                  </div>
                  <div className={styles.bottom}>
                    <div className="align-items-center gap-3">
                      <span className={`align-items-center f-15`}>
                        <FaHashtag />
                      </span>
                      <span>{channel.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.top}>
                    <div className={styles.infoTitle}>Topic</div>
                    <span className={styles.infoEdit}>Edit</span>
                  </div>
                  <div className={styles.bottom}>
                    <p>Add a topic</p>
                  </div>
                </div>
                <div className={styles.infoTopic}>
                  <div className={styles.top}>
                    <span className={styles.infoTitle}>Description</span>
                    <span className={styles.infoEdit}>Edit</span>
                  </div>
                  <div className={styles.bottom}>
                    <p>Add a description</p>
                  </div>
                </div>
                <div className={styles.infoTopic}>
                  <div className={styles.bottom}>
                    <span className={styles.infoTitle}>Created by</span>
                    <p>Ahmed Ayman on 21 March 2025</p>
                  </div>
                </div>
                <div className={`${styles.infoTopic} ${styles.leaveItem}`}>
                  Leave channel
                </div>
              </div>
              <div className={styles.chId}>
                <span>Channel ID : 1</span>
                <span className="align-items-center">
                  <BsCopy />
                </span>
              </div>
            </div>
          )}
          {/* Members Tab */}

          {activeTab === "members" && (
            <div className={styles.membersContent}>
              <div className={styles.membersItem}>
                <SearchInput />
              </div>
              <div className={styles.membersItem}>
                <div className={styles.addBox}>
                  <MdOutlinePersonAddAlt />
                </div>
                <div className={styles.addText}>Add people</div>
              </div>
              {channelData.members.map((member, key) => (
                <div key={key} className={styles.membersItem}>
                  <div className={styles.memberImg}>
                    <img src={member.avatar} alt={member.name} />
                  </div>
                  <div className={styles.memberName}>
                    {`${member.name}(${member.displayName || member.name})`}
                    <span
                      className={`${styles.status} ${
                        member.status === "Online"
                          ? styles.online
                          : styles.offline
                      }`}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* tabs */}
          {activeTab === "tabs" && (
            <div className={`${styles.tabsContent}`}>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.top}>
                    <div className="f-bold">
                      Choose who can add, remove and reorder tabs
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.selectElement}>
                      <span className="align-items-center f-16">Everyone</span>
                      <span className="align-items-center">
                        <FiChevronDown className="f-18" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div>
                    <span className="f-16 f-bold">Manage tabs</span>
                    <p className="f-15 mw-80">
                      Reorder, add, remove and hide the tabs that everyone sees
                      in this channel.
                    </p>
                  </div>
                  <div className={styles.tabsItems}>
                    <div className={styles.tabItem}>
                      <div className={styles.leftSide}>
                        <span className="align-items-center">
                          <TbMessageCircleFilled
                            className="rotateY-180"
                            size={20}
                          />
                        </span>
                        <span className="align-items-center">Messages</span>
                      </div>
                    </div>
                    <div className={styles.tabItem}>
                      <div className={styles.leftSide}>
                        <span className="align-items-center">
                          <TbPin size={20} />
                        </span>
                        <span className="align-items-center">Pins</span>
                      </div>
                      <div className={styles.rightActions}>
                        <span className="align-items-center">
                          <LuEye />
                        </span>
                        <span className="align-items-center">
                          <BsArrowUp />
                        </span>
                        <span className="align-items-center">
                          <BsArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className={styles.tabItem}>
                      <div className={styles.leftSide}>
                        <span className="align-items-center">
                          <RiStickyNoteAddLine size={20} />
                        </span>
                        <span className="align-items-center">Add canvas</span>
                      </div>
                      <div className={styles.rightActions}>
                        <span className="align-items-center">
                          <LuEye />
                        </span>
                        <span className="align-items-center">
                          <BsArrowUp />
                        </span>
                        <span className="align-items-center">
                          <BsArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className={styles.tabItem}>
                      <div className={styles.leftSide}>
                        <span className="align-items-center">
                          <GoStack size={20} />
                        </span>
                        <span className="align-items-center">Files</span>
                      </div>
                      <div className={styles.rightActions}>
                        <span className="align-items-center">
                          <LuEye />
                        </span>
                        <span className="align-items-center">
                          <BsArrowUp />
                        </span>
                        <span className="align-items-center">
                          <BsArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className={styles.newTab}>
                      <span className="align-items-center">
                        <IoMdAdd size={20} />
                      </span>
                      <span className="align-items-center f-bold">New Tab</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* integrations tab */}
          {activeTab === "integrations" && (
            <div className={styles.integTabContent}>
              <div className={styles.integTab}>
                <div className={styles.intLeft}>
                  <span className="align-items-center f-bold">Apps</span>
                  <p>
                    Bring the tools that you need into this channel to pull
                    reports, start calls, file tickets and more.
                  </p>
                  <div className={styles.btnContainer}>
                    <DetailsButton>Add an app</DetailsButton>
                  </div>
                </div>
                <div className={styles.intImg}>
                  <img
                    src="/public/assets/images/integrations.png"
                    alt="intImage"
                  />
                </div>
              </div>
            </div>
          )}
          {/* Setting Tab */}
          {activeTab === "settings" && (
            <div className={styles.editContent}>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.top}>
                    <span className={styles.infoTitle}>Channel name</span>
                    <span className={styles.infoEdit}>Edit</span>
                  </div>
                  <div className={styles.bottom}>
                    <div className="align-items-center gap-3">
                      <span className={`align-items-center f-15`}>
                        <FaHashtag />
                      </span>
                      <span>{channel.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.top}>
                    <span className={styles.infoTitle}>Huddles</span>
                    <span className={styles.infoEdit}>Edit</span>
                  </div>
                  <div className={styles.bottom}>
                    <div className="align-items-center gap-3">
                      <p>Members can start and join huddles in this channel.</p>
                      <span className={styles.infoEdit}>Learn more</span>
                    </div>
                    <div className={styles.icons}>
                      <DetailsButton icon={<MdHeadset />}>
                        Start Huddle
                      </DetailsButton>
                      <DetailsButton icon={<FaLink />}>
                        Copy Huddle Link
                      </DetailsButton>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.actionItem}>
                    <span className="align-items-center">
                      {channelData.isPrivate ? <FaHashtag /> : <FaLock />}
                    </span>
                    <div>
                      Change to a {channelData.isPrivate ? "pubic" : "private"}{" "}
                      channel
                    </div>
                  </div>
                </div>
                <div className={styles.infoTopic}>
                  <div className={`${styles.actionItem} ${styles.archiveItem}`}>
                    <span className="align-items-center">
                      <FaArchive />
                    </span>
                    <div>Archive channel for everyone</div>
                  </div>
                </div>
                <div className={`${styles.infoTopic} ${styles.deleteItem}`}>
                  <div className={`${styles.actionItem}`}>
                    <span className="align-items-center">
                      <MdDeleteOutline size={20} />
                    </span>
                    <div>Delete this channel</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ChannelDetailsModal.propTypes = {
  channel: PropTypes.obj,
};

export default ChannelDetailsModal;
