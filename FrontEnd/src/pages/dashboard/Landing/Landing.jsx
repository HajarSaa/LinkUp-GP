import LandingHeader from "../../../components/UI/Landing/LandingHeader";
import WorkspaceItem from "../../../components/UI/Landing/WorkspaceItem";
import WorkspacesList from "../../../components/UI/Landing/WorkspacesList";
import styles from "./Landing.module.css";



const Landing = function () {
  return (
    <div className={styles.landing_page}>
      <div className={styles.landing_container}>
        <LandingHeader />
        <WorkspacesList/>

        <div className={styles.footer}>
          <span>Want to use Link-Up with a different team?</span>
          <button className={styles.button}>Create Another Workspace</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
