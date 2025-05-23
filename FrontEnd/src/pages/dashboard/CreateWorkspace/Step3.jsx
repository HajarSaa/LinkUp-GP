/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import SkipConfirmationModal from "../../../components/UI/Modal/SkipConfirmationModal/SkipConfirmationModal";

function Step3({ onNext, workspace }) {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isButtonDisabled = email.trim() === "";

  const handleNextClick = () => {
    if (!isButtonDisabled && onNext) {
      onNext(email);
    }
  };

  const handleSkipClick = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    onNext([]);
  };

  if (!workspace) {
    return <p>Loading workspace info...</p>;
  }

  return (
    <PageContent>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.stepText}>Step 3 of 3</p>
          <h1 className={styles.heading}>
            Who else is on the{" "}
            <span className={styles.workspaceName}>
              {workspace.name || "your"}
            </span>{" "}
            team?
          </h1>

          <label className={styles.label}>Add coworker by email</label>

          <textarea
            className={styles.textarea}
            placeholder="Ex. User1@gmail.com, User2@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className={styles.subheading}>
            Keep in mind that invitations expire in 30 days. You can always
            extend that deadline.
          </p>

          <div className={styles.actions}>
            <button
              onClick={handleNextClick}
              disabled={isButtonDisabled}
              className={`${styles.button} ${
                isButtonDisabled ? styles.disabled : ""
              }`}
            >
              Next
            </button>

            <button className={styles.copyButton}>
              <IoIosLink />
              Copy Invite Link
            </button>

            <button
              type="skipButton"
              onClick={handleSkipClick}
              className={styles.skipButton}
            >
              Skip this step
            </button>
          </div>
        </div>
      </div>

      <SkipConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
      />
    </PageContent>
  );
}

export default Step3;
