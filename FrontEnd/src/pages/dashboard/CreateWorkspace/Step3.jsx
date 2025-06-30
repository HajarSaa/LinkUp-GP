/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import SkipConfirmationModal from "../../../components/UI/Modal/SkipConfirmationModal/SkipConfirmationModal";
import {
  setEmails,
  clearCreationSteps,
} from "../../../API/redux_toolkit/ui/creationsStep";
import { updateCreationDataField } from "../../../utils/workspaceUtils";
import { clearWorkspace } from "../../../API/redux_toolkit/api_data/workspaceSlice";
import CreationInvite from "../../../components/UI/CreationWork/CreationInvite";
import useCurrentWorkspace from "../../../API/hooks/workspace/useCurrentWorkspace";

function Step3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false); // ✅ علشان نتحكم في التفعيل

  const workspace = useSelector((state) => {
    const w = state.createWorkspace.workspace;
    return w?.workspace ?? w ?? null;
  });

  console.log(workspace)

  const savedEmails = useSelector((state) => state.createWorkspace.emails);
  const [emailText, setEmailText] = useState(
    Array.isArray(savedEmails) ? savedEmails.join(", ") : ""
  );

  const isButtonDisabled = emailText.trim() === "";

  // ✅ استخدم الهوك ولكن بتمكين مشروط
  const { isSuccess, isLoading } = useCurrentWorkspace(isTriggered);

  // ✅ بعد نجاح الفتش يتم التنقل
  useEffect(() => {
    if (isTriggered && isSuccess) {
      navigate("/");
    }
  }, [isTriggered, isSuccess, navigate]);

  const handleNextClick = () => {
    if (workspace?.id) {
      localStorage.setItem("selectedWorkspaceId", workspace.id); // لازم قبل أي dispatch
      setIsTriggered(true); // فعل الفتش
      dispatch(clearWorkspace());
      dispatch(clearCreationSteps());
    } else {
      console.error("Workspace ID is missing, can't proceed.");
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
    dispatch(setEmails([]));
    updateCreationDataField("emails", []);
    handleNextClick();
  };

  if (!workspace) {
    return (
      <PageContent>
      </PageContent>
    );
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

          <CreationInvite
            handleSkipClick={handleSkipClick}
            handleNextClick={handleNextClick}
            isButtonDisabled={isButtonDisabled}
          />
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
