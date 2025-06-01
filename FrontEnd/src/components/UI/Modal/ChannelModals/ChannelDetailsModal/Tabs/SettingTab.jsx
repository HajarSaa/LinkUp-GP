import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "../ChannelDetailsModal.module.css";
import DetailsButton from "../../../../Buttons/DetailsButton/DetailsButton";
import { openRenameModal } from "../../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { FaLink } from "react-icons/fa6";
import { MdDeleteOutline, MdHeadset } from "react-icons/md";
import ChannelType from "../../../../Channel/ChannelType/ChannelType";
import { FaArchive } from "react-icons/fa";
import { isChannelOwner } from "../../../../../../utils/channelUtils";
import InfoIcon from "../../../../Icons/InforIcon/InfoIcon";

function SettingTab({ channelData }) {
  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  const { workspace } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();
  const isOwner = isChannelOwner(channelData, workspace);

  function rename_channel() {
    if (isOwner) {
      dispatch(openRenameModal());
    }
  }
  if (activeTab !== "settings") return null;
  return (
    <div className={styles.editContent}>
      <div className={styles.infoRow} onClick={rename_channel}>
        <div className={styles.infoTopic}>
          <div className={styles.top}>
            <span className={styles.infoTitle}>Channel name</span>
            {isOwner ? (
              <span className={styles.infoEdit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
          </div>
          <div className={styles.bottom}>
            <div className="align-items-center gap-3">
              <ChannelType type={channelData.type} />
              <span>{channelData.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoTopic}>
          <div className={styles.top}>
            <span className={styles.infoTitle}>Huddles</span>
            {isOwner ? (
              <span className={styles.infoEdit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
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
        <div className={`${styles.infoTopic}  ${!isOwner && styles.ops_btn}`}>
          <div className={styles.top}>
            <div className={styles.actionItem}>
              <ChannelType
                type={`${channelData.type === "public" ? "private" : "public"}`}
              />
              <div>
                Change to a{" "}
                {channelData.type === "public" ? "private" : "public"} channel
              </div>
            </div>
            {!isOwner && (
              <InfoIcon id="edit_ch_name" text="You don`t have permissions" />
            )}
          </div>
        </div>
        <div className={`${styles.infoTopic}  ${!isOwner && styles.ops_btn}`}>
          <div className={styles.top}>
            <div className={`${styles.actionItem} ${styles.archiveItem}`}>
              <span className="align-items-center">
                <FaArchive />
              </span>
              <div>Archive channel for everyone</div>
            </div>
            {!isOwner && (
              <InfoIcon id="edit_ch_name" text="You don`t have permissions" />
            )}
          </div>
        </div>
        <div
          className={`${styles.infoTopic} ${styles.deleteItem} ${
            isOwner ? styles.active_delete : styles.ops_btn
          }`}
        >
          <div className={styles.top}>
            <div className={`${styles.actionItem}`}>
              <span className="align-items-center">
                <MdDeleteOutline size={20} />
              </span>
              <div>Delete this channel</div>
            </div>
            {!isOwner && (
              <InfoIcon id="edit_ch_name" text="You don`t have permissions" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingTab;

SettingTab.propTypes = {
  channelData: PropTypes.object.isRequired,
};
