// import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./WorkspaceLanding.module.css";

const WorkspaceLanding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/create-workspace");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2907/2907253.png"
          alt="Workspace Illustration"
          className={styles.image}
        />
        <h1>Create a new Workspace</h1>
        <p>
          Bring your team together to collaborate, chat, and organize your work
          easily.
        </p>
        <button onClick={handleGetStarted} className={styles.button}>
          Create a Workspace
        </button>
      </div>
    </div>
  );
};

export default WorkspaceLanding;
