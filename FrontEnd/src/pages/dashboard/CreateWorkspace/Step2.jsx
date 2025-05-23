/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import { joinWorkspace } from "../../../API/services/workspaceService";

function Step2({ onNext, workspace }) {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isButtonDisabled = userName.trim() === "" || loading;

  const handleNextClick = async () => {
    if (!workspace || !workspace._id) {
      setError("Workspace ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await joinWorkspace(workspace._id, userName);
      onNext(userName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContent>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.stepText}>Step 2 of 3</p>
          <h2 className={styles.heading}>What is your name?</h2>
          <p className={styles.subheading}>
            Adding your name and profile photo helps your teammates recognize
            and connect with you more easily.
          </p>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className={styles.input}
          />

          <div className={styles.profilePhotoSection}>
            <label>
              {" "}
              Your profile photo <span>(optional)</span>
            </label>
            <p className={styles.subheading}>
              Help your teammates know they’re talking to the right person.
            </p>
            <div className={styles.profilePhotoPlaceholder}>
              <FaUser className={styles.photo} />
            </div>
            <button type="button" className={styles.uploadButton}>
              Upload Photo
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            onClick={handleNextClick}
            disabled={isButtonDisabled}
            className={`${styles.button} ${
              isButtonDisabled ? styles.disabled : ""
            }`}
          >
            {loading ? "Joining..." : "Next"}
          </button>
        </div>
      </div>
    </PageContent>
  );
}

export default Step2;
