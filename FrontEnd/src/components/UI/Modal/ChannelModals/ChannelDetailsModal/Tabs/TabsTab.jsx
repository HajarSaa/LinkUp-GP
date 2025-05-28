import { IoMdAdd } from "react-icons/io";
import styles from "../ChannelDetailsModal.module.css";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { GoStack } from "react-icons/go";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { TbMessageCircleFilled, TbPin } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";

function TabsTab() {
  const { activeTab } = useSelector((state) => state.channelDetailsModal);

  if (activeTab !== 'tabs') return null;
  return (
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
              Reorder, add, remove and hide the tabs that everyone sees in this
              channel.
            </p>
          </div>
          <div className={styles.tabsItems}>
            <div className={styles.tabItem}>
              <div className={styles.leftSide}>
                <span className="align-items-center">
                  <TbMessageCircleFilled className="rotateY-180" size={20} />
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
  );
}

export default TabsTab;
