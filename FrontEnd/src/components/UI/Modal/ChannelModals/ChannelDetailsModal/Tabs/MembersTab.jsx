import PropTypes from "prop-types";
import styles from "../ChannelDetailsModal.module.css";
import SearchInput from "../../../../InputField/SearchInput/SearchInput";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getMembersData } from "../../../../../../utils/workspaceUtils";
import UserStatus from "../../../../User/UserStatus";
import UserImage from "../../../../User/UserImage";
import { closeChannelDetails } from "../../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import { openUserPanel } from "../../../../../../API/redux_toolkit/ui/chatPanel";

function MembersTab({ channelData }) {
  const { workspace } = useSelector((state) => state.workspace);
  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  const members = getMembersData(channelData, workspace);
  const dispatch = useDispatch();

  function open_user_panel() {
    dispatch(closeChannelDetails());
    dispatch(openUserPanel());
  }

  if (activeTab !== "members") return null;
  return (
    <>
      <div className={styles.membersContent}>
        <div className={styles.membersItem}>
          <SearchInput placeholder="Search for all members" />
        </div>
        <div className={styles.membersItem}>
          <div className={styles.addBox}>
            <MdOutlinePersonAddAlt />
          </div>
          <div className={styles.addText}>Add people</div>
        </div>
        {members.map((member, index) => (
          <div
            className={styles.membersItem}
            key={index}
            onClick={open_user_panel}
          >
            <div className={styles.memberImg}>
              <UserImage src={member.photo} alt={member.userName} />
            </div>
            <div className={styles.memberName}>
              <span>{`${member.userName} ${member.isMe ? "(You)" : ""}`}</span>
              <UserStatus status={member.status} />
            </div>
          </div>
        ))}
      </div>
      {/* <InviteChannelModal
        workName={workspace?.name}
        channelName={channelData.name}
        onClose={closeModal}
      /> */}
    </>
  );
}

export default MembersTab;

MembersTab.propTypes = {
  channelData: PropTypes.any,
};
