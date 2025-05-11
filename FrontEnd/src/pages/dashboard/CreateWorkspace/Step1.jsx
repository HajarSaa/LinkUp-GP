/* eslint-disable react/prop-types */
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import { useState } from "react";
import { createWorkspaceService } from "../../../API/services/workspaceService";

function Step1({ onNext }) {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isButtonDisabled = teamName.trim() === "" || loading;

  const handleNextClick = async () => {
    if (isButtonDisabled) return;

    try {
      setLoading(true);
      const res = await createWorkspaceService(teamName);
      const workspace = res?.data?.workspace;
      onNext(workspace);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContent>
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

          {error && <p className={styles.error}>{error}</p>}

          <button
            onClick={handleNextClick}
            disabled={isButtonDisabled}
            className={`${styles.button} ${
              isButtonDisabled ? styles.disabled : ""
            }`}
          >
            {loading ? "Creating..." : "Next"}
          </button>
        </div>
      </div>
    </PageContent>
  );
}

export default Step1;
