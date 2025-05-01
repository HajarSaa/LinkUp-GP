/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Steps.module.css";

function Step1({ onNext }) {
  const [teamName, setTeamName] = useState("");
  const isButtonDisabled = teamName.trim() === "";

  const handleNextClick = () => {
    if (!isButtonDisabled) {
      onNext(teamName);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.stepText}>Step 1 of 3</p>
        <h1 className={styles.heading}>
          What’s the name of your company or team?
        </h1>
        <p className={styles.subheading}>
          This will be the name of your Link-UP workspace — choose something
          that your team will recognize.
        </p>

        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Ex: Acme Marketing or Acme Co"
          className={styles.input}
          maxLength={50}
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
    </div>
  );
}

export default Step1;
