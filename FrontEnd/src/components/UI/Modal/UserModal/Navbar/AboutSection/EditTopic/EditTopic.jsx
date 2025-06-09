import Modal from "../../../../Modal";
import styles from "./EditTopic.module.css";
import PropTypes from "prop-types";
import Button from "../../../../../Buttons/Button/Button";

const EditTopic = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.smallModal}
      zIndex={1004}
      title="Edit topic"
    >
      <div className={styles.edit_body}>
        <textarea
          className={styles.textarea}
          placeholder="Add a topic"
          // value={topic}
          // onChange={(e) => setTopic(e.target.value)}
        />
        <p className={styles.description}>
          Add a topic to your conversation. This will be visible to both of you
          at the top of your DM.
        </p>
        <div className={styles.buttons}>
          <Button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.saveButton}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
EditTopic.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default EditTopic;
