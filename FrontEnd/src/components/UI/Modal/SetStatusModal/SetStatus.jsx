import { useState } from "react";
import Modal from "../Modal";
import styles from "./SetStatus.module.css";
import Button from "../../Buttons/Button/Button";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { closeSetStatusModal } from "../../../../API/redux_toolkit/modals/userProfile/setStatusSlice";
const statusOptions = [
  { icon: "📅", text: "In a meeting", duration: "1 hour" },
  { icon: "🚎", text: "Commuting", duration: "30 minutes" },
  { icon: "🤒", text: "Out sick", duration: "Today" },
  { icon: "🌴", text: "Vacationing", duration: "Don't clear" },
  { icon: "🏡", text: "Working remotely", duration: "Today" },
];

const SetStatusModal = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const { isOpen } = useSelector((state) => state.setStatus);
  const dispatch = useDispatch();

  function handleClose() {
    setSelectedStatus("")
    dispatch(closeSetStatusModal());
  }
  function handleSave (){
    console.log(selectedStatus)
    handleClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.modal}
      title="Set a status"
    >
      <>
        <div className={styles.status_body}>
          {selectedStatus ? (
            <div className={styles.form}>
              <input
                type="text"
                value={selectedStatus}
                className={styles.status_input}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />

              <label>Remove status after</label>
              <input type="text" className={styles.status_valid} value={'Today'} />
            </div>
          ) : (
            <>
              <div className={styles.input_container}>
                <div className={styles.emoji_icon}>
                  <span>
                    <HiOutlineFaceSmile />
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="What's your status?"
                  className={styles.statusInput}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
              </div>

              <div className={styles.statusList}>
                <p className={styles.label}>For :)</p>
                {statusOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.statusOption} ${
                      selectedStatus === option.text ? styles.selected : ""
                    }`}
                    onClick={() =>
                      setSelectedStatus(`${option.icon} ${option.text}`)
                    }
                  >
                    {option.icon}
                    <span className={styles.statusText}>{option.text} — </span>

                    <span className={styles.statusDuration}>
                      {option.duration}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.autoUpdate}>
                <p className={styles.label}>Automatically updates</p>
                <div className={styles.auto_conatiner}>
                  <span>📆</span>
                  <span className={styles.statusText}>In a meeting — </span>
                  <span className={styles.statusDuration}>
                    Based on your Google Calendar
                  </span>
                </div>
              </div>
            </>
          )}
          <div className={styles.buttonContainer}>
            <Button className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={styles.saveButton} onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default SetStatusModal;
