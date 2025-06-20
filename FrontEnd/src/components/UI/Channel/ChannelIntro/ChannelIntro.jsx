// EmptyState.jsx
import PropTypes from "prop-types";
import styles from "./ChannelIntro.module.css";
import DetailsButton from "../../Buttons/DetailsButton/DetailsButton";
import { FiEdit2, FiUserPlus } from "react-icons/fi";
import { formatDateToLong } from "../../../../utils/formatedDate";
import ChannelType from "../ChannelType/ChannelType";
import { isChannelOwner } from "../../../../utils/channelUtils";
import { useDispatch, useSelector } from "react-redux";
import { openDescribtionModal } from "../../../../API/redux_toolkit/modals/channelDetailsSlice";

function EmptyState({ channel }) {
  const createdAt = formatDateToLong(channel?.createdAt);
  const { workspace } = useSelector((state) => state.workspace);
  const isOwner = isChannelOwner(channel, workspace);
  const dispatch = useDispatch();

    function edit_dicription() {
      if (isOwner) {
        dispatch(openDescribtionModal());
      }
    }
  return (
    <div className={styles.channel_intro}>
      <h2 className={styles.title}>
        <span>
          <ChannelType type={channel.type} />
        </span>
        <span>{channel?.name}</span>
      </h2>
      <div className={styles.description}>
        You created this channel on {createdAt}. This is the very beginning of
        the{" "}
        <div className={styles.channel_name}>
          <ChannelType type={channel.type} />
          <span>{channel?.name}</span>
        </div>{" "}
        channel.
        {channel.description && channel.description}
      </div>

      <div className={styles.actions}>
        <DetailsButton icon={<FiEdit2 />} onClick={edit_dicription}>
          Add description
        </DetailsButton>
        <DetailsButton icon={<FiUserPlus />}>
          Add people to channel
        </DetailsButton>
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  channel: PropTypes.any,
};

export default EmptyState;
