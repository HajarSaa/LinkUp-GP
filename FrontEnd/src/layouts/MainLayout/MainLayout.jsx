import PropTypes from "prop-types";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Workbar from "../Workspaces/Workbar";
import styles from "./MainLayoutStyles.module.css";
import { Outlet } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>
        <Workbar />
        <Sidebar />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
