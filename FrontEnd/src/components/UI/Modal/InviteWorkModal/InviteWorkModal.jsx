import styles from "./InviteWorkModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeInviteWork } from "../../../../API/redux_toolkit/modals/modalsSlice";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import { FaLink } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";

const InviteWorkModal = () => {
  const { isOpen } = useSelector((state) => state.modals.inviteToWork);
  const { workspace } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

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
    dispatch(closeInviteWork());
    handleRemoveData();
  };

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Invite people to {workspace?.name}</h3>
          <CloseIcon closeEvent={closeModal} />
        </div>

        {/* Subtext */}
        <p className={styles.subtext}>To :</p>

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
          <div
            className={`${styles.send_btn} ${
              emails.length > 0 && emails.every((e) => e.isValid)
                ? styles.active
                : ""
            }`}
            onClick={handleSendInvitaions}
          >
            Send
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteWorkModal;
