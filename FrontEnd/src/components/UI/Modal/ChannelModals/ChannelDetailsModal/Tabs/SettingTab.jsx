import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Tabs.module.css";
import DetailsButton from "../../../../Buttons/DetailsButton/DetailsButton";
import {
  closeChannelDetails,
  openRenameModal,
} from "../../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { FaLink } from "react-icons/fa6";
import { MdDeleteOutline, MdHeadset } from "react-icons/md";
import ChannelType from "../../../../Channel/ChannelType/ChannelType";
import { FaArchive } from "react-icons/fa";
import Spinner from "../../../../Spinner/Spinner";
import {
  getNearestChannel,
  isChannelOwner,
} from "../../../../../../utils/channelUtils";
import InfoIcon from "../../../../Icons/InforIcon/InfoIcon";
import useDeleteChannel from "../../../../../../API/hooks/channel/useDeleteChannel";
import TabItem from "./TabItem";
import { useNavigate } from "react-router-dom";

function SettingTab({ channelData }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  const { workspace } = useSelector((state) => state.workspace);
  const { channel } = useSelector((state) => state.channel);
  const {
    mutate: delete_channel,
    isPending: deleting_pinding,
    error: deleting_error,
  } = useDeleteChannel();
  const isOwner = isChannelOwner(channelData, workspace);

  function rename_channel() {
    if (isOwner) {
      dispatch(openRenameModal());
    }
  }
  function handle_delete_channel() {
    if (isOwner && !deleting_pinding) {
      delete_channel(channel.id, {
        onSuccess: () => {
          dispatch(closeChannelDetails());
          const nearestChannel = getNearestChannel(channel?.id, workspace);
          navigateTo(`/channels/${nearestChannel}`);
        },
      });
    }
  }

  if (activeTab !== "settings") return null;
  return (
    <div className={styles.setting_tab}>
      <div className={styles.tab_items_container} onClick={rename_channel}>
        <TabItem>
          <div className={styles.tab_item_content}>
            <div className={`${styles.tab_item_content_right_col}`}>
              <span className={styles.tab_title}>Channel name</span>
              <div className={styles.row_content}>
                <ChannelType type={channelData.type} />
                <span>{channelData.name}</span>
              </div>
            </div>
            {isOwner ? (
              <span className={styles.tab_edit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
          </div>
        </TabItem>
      </div>
      <div className={styles.tab_items_container}>
        <TabItem>
          <div className={styles.tab_item_content}>
            <div className={`${styles.tab_item_content_right_col}`}>
              <span className={styles.tab_title}>Huddles</span>
              <div className={styles.row_content}>
                <p>Members can start and join huddles in this channel.</p>
                <span className={styles.tab_edit}>Learn more</span>
              </div>
              <div className={styles.huddle_icon}>
                <DetailsButton icon={<MdHeadset />}>Start Huddle</DetailsButton>
                <DetailsButton icon={<FaLink />}>
                  Copy Huddle Link
                </DetailsButton>
              </div>
            </div>
            {isOwner ? (
              <span className={styles.tab_edit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
          </div>
        </TabItem>
      </div>
      <div className={styles.tab_items_container}>
        {/* Transform */}
        <TabItem className={!isOwner && styles.ops_btn}>
          <div className={styles.tab_item_content}>
            <div className={`${styles.tab_item_content_right_row}`}>
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
        </TabItem>
        {/* Archive */}
        <TabItem
          className={`${styles.archiveItem} ${!isOwner && styles.ops_btn}`}
        >
          <div className={styles.tab_item_content}>
            <div className={`${styles.tab_item_content_right_row}`}>
              <span className={styles.tab_item_icon}>
                <FaArchive />
              </span>
              <span>Archive channel for everyone</span>
            </div>
            {!isOwner && (
              <InfoIcon id="edit_ch_name" text="You don`t have permissions" />
            )}
          </div>
        </TabItem>
        {/* Delete */}
        <TabItem
          className={`${styles.deleteItem} ${
            isOwner ? styles.active_delete : styles.ops_btn
          }`}
          onClick={handle_delete_channel}
        >
          {deleting_pinding ? (
            <Spinner color="var(--error-color)" />
          ) : deleting_error ? (
            <p>{deleting_error?.response?.data?.message}</p>
          ) : (
            <div className={styles.tab_item_content}>
              <div className={`${styles.tab_item_content_right_row}`}>
                <span className={styles.tab_item_icon}>
                  <MdDeleteOutline size={20} />
                </span>
                <span>Delete this channel</span>
              </div>
              {!isOwner && (
                <InfoIcon id="edit_ch_name" text="You don`t have permissions" />
              )}
            </div>
          )}
        </TabItem>
      </div>
    </div>
  );
}

export default SettingTab;

SettingTab.propTypes = {
  channelData: PropTypes.object.isRequired,
};
