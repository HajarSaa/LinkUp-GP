import PropTypes from "prop-types";
import Modal from "../../../../Modal";
import styles from "./AddPeople.module.css";
import Button from "../../../../../Buttons/Button/Button";
const AddPeopleModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.smallModal}
      zIndex={1004}
      title="Add people to this conversation"
    >
      <div className={styles.add_body}>
        <input
          type="text"
          placeholder="ex. Matt or @mbrewer"
          className={styles.inputField}
        />
        <p className={styles.hint}>
          DMs can have up to 9 people (including you).
        </p>
        <div className={styles.btns}>
          <Button className={styles.nextButton}>Next</Button>
        </div>
      </div>
    </Modal>
  );
};

AddPeopleModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddPeopleModal;
