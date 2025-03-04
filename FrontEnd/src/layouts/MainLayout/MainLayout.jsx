import PropTypes from "prop-types";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Workbar from "../Workspaces/Workbar";
import styles from "./MainLayoutStyles.module.css";
function MainLayout({ children }) {
  console.log("Styles Object:", styles);
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>
        <Workbar />
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
