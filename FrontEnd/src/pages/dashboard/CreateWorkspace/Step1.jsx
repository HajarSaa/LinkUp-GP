import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import useCreateWorkspace from "../../../API/hooks/workspace/useCreateWorkspace";
import {
  setStepIndex,
  setWorkspace,
} from "../../../API/redux_toolkit/ui/creationsStep";
import { updateCreationDataField } from "../../../utils/workspaceUtils";
import { useNavigate } from "react-router-dom";

function Step1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedWorkspace = useSelector(
    (state) => state.createWorkspace.workspace
  );
  const [teamName, setTeamName] = useState(savedWorkspace?.work_name || "");

  const [error, setError] = useState(null);

  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspace();


  const isButtonDisabled = teamName.trim() === "" || isPending;

  const handleNextClick = async () => {
    if (isButtonDisabled) return;

    createWorkspace(teamName, {
      onSuccess: (workspace) => {
        dispatch(setWorkspace(workspace));
        dispatch(setStepIndex(1));
        navigate("/create-workspace/step-2");
      },
      onError: (error) => {
        setError(error.response?.data?.message);
      },
    });
  };
  function handleInputChange(e) {
    const value = e.target.value;
    setTeamName(value);
    updateCreationDataField("workspace", { work_name: value });
  }

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
            onChange={handleInputChange}
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
            {isPending ? "Creating..." : "Next"}
          </button>
        </div>
      </div>
    </PageContent>
  );
}

export default Step1;
