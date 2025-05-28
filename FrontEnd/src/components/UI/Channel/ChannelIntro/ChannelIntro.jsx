// EmptyState.jsx
import PropTypes from "prop-types";
import styles from "./ChannelIntro.module.css";
import DetailsButton from "../../Buttons/DetailsButton/DetailsButton";
import { FiEdit2, FiUserPlus } from "react-icons/fi";

function EmptyState({ title }) {
  return (
    <div className={styles.channel_intro}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>
        You created this channel on 22 March. This is the very beginning of the
        {"  "}
        <strong>{title}</strong>
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
  title: PropTypes.string,
};

export default EmptyState;
