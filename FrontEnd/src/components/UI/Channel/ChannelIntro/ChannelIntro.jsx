// EmptyState.jsx
import PropTypes from "prop-types";
import styles from "./ChannelIntro.module.css";
import DetailsButton from "../../Buttons/DetailsButton/DetailsButton";
import { FiEdit2, FiUserPlus } from "react-icons/fi";
import { formatDateToLong } from "../../../../utils/formatedDate";

function EmptyState({ channel }) {
  const createdAt = formatDateToLong(channel?.createdAt);
  return (
    <div className={styles.channel_intro}>
      <h2 className={styles.title}>{channel?.title}</h2>
      <p className={styles.description}>
        You created this channel on {createdAt}. This is the very beginning of
        the
        {"  "}
        <strong>{channel?.title}</strong>
        {"  "} channel.
      </p>
      <div className={styles.actions}>
        <DetailsButton icon={<FiEdit2 />}>Add description</DetailsButton>
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
