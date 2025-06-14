import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import create_image from "/assets/create-work.svg";
import Logo from "/logo.svg";
function LandingHeader() {
  const navigateTo = useNavigate();

  function handleCreateWork() {
    if (localStorage.getItem("creation_data"))
      localStorage.removeItem("creation_data");
    navigateTo("/create-workspace/step-1");
  }
  return (
    <div className={styles.landing_header}>
      <img src={Logo} alt="Link-Up Logo" className={styles.logo} />
      <h1 className={styles.header_welcome}>
        Welcome back! <span>You look nice today.</span>
      </h1>
      <p className={styles.subtext}>
        Choose a workspace below to get back to working with your team.
      </p>
      <div className={styles.create}>
        <div className={styles.create_left_side}>
          <div className={styles.create_image}>
            <img src={create_image} alt="create workspace" />
          </div>
          <span className={styles.create_text}>
            Want to use Link-Up with a different team?
          </span>
        </div>
        <button className={styles.create_btn} onClick={handleCreateWork}>
          Create Another Workspace
        </button>
      </div>
    </div>
  );
}

export default LandingHeader;
