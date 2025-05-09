/* eslint-disable react/prop-types */
import { IoIosLink } from "react-icons/io";
import { useState } from "react";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
function Step3({ onNext }) {
  const [email, setEmail] = useState("");

  const isButtonDisabled = email.trim() === "";

  const handleNextClick = () => {
    if (!isButtonDisabled) {
      onNext(email);
    }
  };
  return (
    <PageContent>
      {/* 3 */}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.stepText}>Step 3 of 3</p>
          <h1 className={styles.heading}>
            Who else is on the <span>try</span> team?
          </h1>

          <label className={styles.label}>Add coworker by email</label>

          <textarea
            className={styles.textarea}
            placeholder="Ex. ellis@gmail.com, maria@gmail.com"
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
            <a className={styles.skipButton} href="#">
              Skip this step
            </a>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default Step3;
