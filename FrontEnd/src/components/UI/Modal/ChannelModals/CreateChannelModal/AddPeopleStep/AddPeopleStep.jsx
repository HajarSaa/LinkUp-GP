import { IoClose } from 'react-icons/io5';
import styles from './AddPeopleStep.module.css';
import { FaLock } from 'react-icons/fa';
import PropTypes from 'prop-types'
const AddPeopleStep = ({ channelName, onClose, workName }) => {
  console.log(channelName);
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <h3 className={styles.modalHeader_name}>
          <span>Add people to </span>
          <span>
            <FaLock className={styles.lockIcon} />
            {channelName}
          </span>
        </h3>
        <IoClose className={styles.closeIcon} onClick={onClose} />
      </div>
      <p className={styles.subtext}>
        You can also add email addresses of people who aren’t members of{" "}
        <strong>{workName}</strong>
      </p>
      <input
        type="text"
        placeholder="Enter a name or email address"
        className={styles.inputField}
      />
      <div className={styles.modalActions}>
        <div className={styles.skipButton} onClick={onClose}>
          Skip for now
        </div>
      </div>
    </div>
  );
};

AddPeopleStep.propTypes = {
  channelName: PropTypes.string,
  workName: PropTypes.string,
  onClose: PropTypes.func,
};

export default AddPeopleStep;