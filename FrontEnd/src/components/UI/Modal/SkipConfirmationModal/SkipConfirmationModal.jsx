/* eslint-disable react/prop-types */
import styles from "./SkipConfirmationModal.module.css";
import Modal from "../Modal";
import Button from "../../Buttons/Button/Button";

function SkipConfirmationModal({ isOpen, onCancel, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Skip without inviting?</h2>
        <p className={styles.description}>
          To really get a feel for Link-UP — and to see all the ways it can
          simplify your team’s work — you’ll need a few coworkers here.
        </p>
        <div className={styles.buttons}>
          <Button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </Button>
          <Button className={styles.skipButton} onClick={onConfirm}>
            Skip
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SkipConfirmationModal;
