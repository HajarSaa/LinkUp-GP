/* eslint-disable no-unused-vars */
import styles from "./CreationInvite.module.css";
import { FaLink } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import PropTypes from "prop-types";

const CreationInvite = ({
  handleSkipClick,
  handleNextClick,
  isButtonDisabled,
}) => {
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState([]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleInput = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const alreadyExists = emails.some(
      (emailObj) => emailObj.value.toLowerCase() === trimmed.toLowerCase()
    );

    if (alreadyExists) {
      setInput("");
      return;
    }

    setEmails((prev) => [
      ...prev,
      {
        value: trimmed,
        isValid: validateEmail(trimmed),
      },
    ]);
    setInput("");
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    handleRemoveData();
  };

  const handleSendInvitaions = () => {
    if (emails.length > 0 && emails.every((e) => e.isValid)) {
      const validEmails = emails
        .filter((email) => email.isValid)
        .map((email) => email.value);
      console.log("Send to:", validEmails);
      handleRemoveData();
      closeModal();
    }
  };

  const handleRemoveData = () => {
    setInput("");
    setEmails([]);
  };

  return (
    <div className={styles.modalContainer}>
      {/* Header */}
      <div className={styles.modalHeader}>
        <h5>Add coworker by email</h5>
      </div>

      {/* Tags */}
      <div className={styles.tagsContainer}>
        {emails.map((email, index) => (
          <div
            key={index}
            className={`${styles.tag} ${
              email.isValid ? styles.validTag : styles.invalidTag
            }`}
          >
            <span className={styles.email_value}>{email.value}</span>
            <span
              className={styles.removeIcon}
              onClick={() => removeEmail(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleInput();
          }
        }}
        onBlur={handleInput}
        placeholder="name@gmail.com"
        className={styles.inputField}
      />

      {/* Error bar */}
      {emails.some((email) => !email.isValid) && (
        <div className={styles.errorBar}>
          <span className={styles.errorIcon}>
            <MdErrorOutline />
          </span>
          <span>{emails.filter((e) => !e.isValid).length} errors.</span>
          <span
            className={styles.removeErrorsLink}
            onClick={() => setEmails((prev) => prev.filter((e) => e.isValid))}
          >
            Remove all items with errors
          </span>
        </div>
      )}

      <p>
        Keep in mind that invitations expire in 30 days. You can always extend
        that deadline.
      </p>
      {/* Buttons */}
      <div className={styles.modalActions}>
        <div
          className={styles.link_btn}
          onClick={() => {
            console.log("copy link");
          }}
        >
          <span>
            <FaLink />
          </span>
          <span>Copy invite link</span>
        </div>
        <button
          type="button"
          onClick={handleSkipClick}
          className={styles.skipButton}
        >
          Skip this step
        </button>
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
};
CreationInvite.propTypes = {
  handleSkipClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool,
};

export default CreationInvite;
