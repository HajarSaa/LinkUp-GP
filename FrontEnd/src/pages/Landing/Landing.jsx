import { useNavigate } from "react-router-dom";
import LandingHeader from "../../components/UI/Landing/LandingHeader";
import WorkspacesList from "../../components/UI/Landing/WorkspacesList";
import styles from "./Landing.module.css";

const Landing = function () {
  const navigateTo = useNavigate();

  function handleLogout() {
    navigateTo('/login')
  }
  return (
    <div className={styles.landing_page}>
      <div className={styles.landing_page_container}>
        <LandingHeader />
        <WorkspacesList />
      </div>
      <button className={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Landing;
