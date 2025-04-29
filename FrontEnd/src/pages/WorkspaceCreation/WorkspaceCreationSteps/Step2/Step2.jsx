/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Step2.module.css";
import { FaUser } from "react-icons/fa6";
import Button from "../../../../components/UI/Buttons/Button/Button";
function Step2({ onNext }) {
  const [userName, setUserName] = useState("");

  const isButtonDisabled = userName.trim() === "";

  const handleNextClick = () => {
    if (!isButtonDisabled) {
      onNext(userName);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>What is your name?</h2>
      <p className={styles.subheading}>
        Adding your name and profile photo helps your teammates recognize and
        connect with you more easily.
      </p>

      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
        className={styles.input}
      />

      {/* <div className={styles.profileContainer}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className={styles.profileImage}
        />
        <div>
          <button className={styles.uploadButton}>Upload Photo</button>
        </div>
      </div> */}

      <div className={styles.profilePhotoSection}>
        <label> Profile photo</label>
        <div className={styles.profilePhotoPlaceholder}>
          <FaUser className={styles.photo} />
        </div>
        <Button type="button" className={styles.uploadButton}>
          Upload Photo
        </Button>
      </div>

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

export default Step2;
