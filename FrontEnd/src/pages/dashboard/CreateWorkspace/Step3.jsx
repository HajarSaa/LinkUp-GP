import { useState } from "react";
import { IoIosLink } from "react-icons/io";
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

function Step3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workspace = useSelector((state) => {
    const w = state.createWorkspace.workspace;
    return w?.workspace ?? w ?? null;
  });
  const savedEmails = useSelector((state) => state.createWorkspace.emails);

  // ✅ عرض الإيميلات كـ نص مفصول بفواصل
  const [emailText, setEmailText] = useState(
    Array.isArray(savedEmails) ? savedEmails.join(", ") : ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isButtonDisabled = emailText.trim() === "";

  // ✅ تحويل النص إلى array وحفظه
  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmailText(value);

    const emailArray = value
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    dispatch(setEmails(emailArray));
    updateCreationDataField("emails", emailArray);
  };

  const handleNextClick = () => {
    dispatch(clearCreationSteps());
    navigate("/"); // ✅ إنهاء وإنقال
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
    dispatch(clearCreationSteps());
    navigate("/");
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
            placeholder="Ex. user1@gmail.com, user2@gmail.com"
            value={emailText}
            onChange={handleInputChange}
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
              type="button"
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
