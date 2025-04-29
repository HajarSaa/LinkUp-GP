/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Step1.module.css";

function Step1({ onNext }) {
  const [teamName, setTeamName] = useState("");

  const isButtonDisabled = teamName.trim() === "";

  const handleNextClick = () => {
    if (!isButtonDisabled) {
      onNext(teamName);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>What’s the name of your team?</h2>
      <p className={styles.subheading}>
        This will be your Slack workspace name.
      </p>

      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="e.g., Marketing Team"
        className={styles.input}
      />

      <button
        onClick={handleNextClick}
        disabled={isButtonDisabled}
        className={`${styles.button} ${
          isButtonDisabled ? styles.disabled : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Step1;
