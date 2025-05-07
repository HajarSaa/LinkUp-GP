import LandingHeader from "../../../components/UI/Landing/LandingHeader";
import WorkspacesList from "../../../components/UI/Landing/WorkspacesList";
import styles from "./Landing.module.css";

const Landing = function () {
  return (
    <div className={styles.landing_page}>
      <div className={styles.landing_page_container}>
        <LandingHeader />
        <WorkspacesList />
      </div>
    </div>
  );
};

export default Landing;
