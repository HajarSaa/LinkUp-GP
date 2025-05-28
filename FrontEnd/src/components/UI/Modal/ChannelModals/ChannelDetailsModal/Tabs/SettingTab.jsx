import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "../ChannelDetailsModal.module.css";
import DetailsButton from "../../../../Buttons/DetailsButton/DetailsButton";
import { openRenameModal } from "../../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { FaHashtag, FaLink } from "react-icons/fa6";
import { MdDeleteOutline, MdHeadset } from "react-icons/md";
import ChannelType from "../../../../Channel/ChannelType/ChannelType";
import { FaArchive } from "react-icons/fa";
import { isChannelOwner } from "../../../../../../utils/channelUtils";

function SettingTab({ channelData }) {
  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  const { workspace } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();
  const isOwner = isChannelOwner(channelData, workspace);

  if (activeTab !== "settings") return null;
  return (
    <div className={styles.editContent}>
      <div
        className={styles.infoRow}
        onClick={() => dispatch(openRenameModal())}
      >
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
              <span>{channelData.name}</span>
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
              <DetailsButton icon={<MdHeadset />}>Start Huddle</DetailsButton>
              <DetailsButton icon={<FaLink />}>Copy Huddle Link</DetailsButton>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.infoRow}>
        {isOwner && (
          <div className={styles.infoTopic}>
            <div className={styles.actionItem}>
              <ChannelType
                type={`${channelData.type === "public" ? "private" : "public"}`}
              />
              <div>
                Change to a{" "}
                {channelData.type === "public" ? "private" : "public"} channel
              </div>
            </div>
          </div>
        )}
        <div className={styles.infoTopic}>
          <div className={`${styles.actionItem} ${styles.archiveItem}`}>
            <span className="align-items-center">
              <FaArchive />
            </span>
            <div>Archive channel for everyone</div>
          </div>
        </div>
        {isOwner && (
          <div className={`${styles.infoTopic} ${styles.deleteItem}`}>
            <div className={`${styles.actionItem}`}>
              <span className="align-items-center">
                <MdDeleteOutline size={20} />
              </span>
              <div>Delete this channel</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingTab;

SettingTab.propTypes = {
  channelData: PropTypes.object.isRequired,
};
