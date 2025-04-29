/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./Step3.module.css";

const Step3 = ({ teamName = "try", onNext }) => {
  const [emails, setEmails] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://slack.com/invite-link").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.step}>Step 3 of 4</p>
      <h2 className={styles.title}>
        Who else is on the <span className={styles.highlight}>{teamName}</span>{" "}
        team?
      </h2>

      <label className={styles.label}>Add coworker by email</label>
      <div className={styles.inputWrapper}>
        <textarea
          placeholder="Ex. ellis@gmail.com, maria@gmail.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className={styles.textarea}
        />
        <a href="#" className={styles.googleLink}>
          Add from Google Contacts
        </a>
      </div>

      <p className={styles.note}>
        Keep in mind that invitations expire in 30 days. You can always extend
        that deadline.
      </p>

      <div className={styles.buttonGroup}>
        <button className={styles.nextButton} onClick={onNext}>
          Next
        </button>
        <button className={styles.copyButton} onClick={handleCopy}>
          {copied ? "Copied!" : "📋 Copy Invite Link"}
        </button>
        <button className={styles.skipButton}>Skip this step</button>
      </div>
    </div>
  );
};

export default Step3;
