import { useNavigate } from "react-router-dom";
import LandingHeader from "../../components/UI/Landing/LandingHeader";
import WorkspacesList from "../../components/UI/Landing/WorkspacesList";
import styles from "./Landing.module.css";
import useLogout from "../../API/hooks/auth/useLogout";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";

const Landing = function () {
  const navigateTo = useNavigate();
  const logout = useLogout();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentUser"]);
        navigateTo("/login");
      },
    });
  }
  return (
    <div className={styles.landing_page}>
      <div className={styles.landing_page_container}>
        <LandingHeader />
        <WorkspacesList />
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        {logout.isPending ? <Spinner width={20} height={20} color="var(--primary-color)" /> : "Logout"}
      </button>
    </div>
  );
};

export default Landing;
