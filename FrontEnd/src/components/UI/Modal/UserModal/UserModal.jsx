import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./UserModal.module.css";
import Modal from "../Modal";
import UserProfile from "./ProfileUp/Profile";
import NavigationTabs from "./Navbar/Nav";
import About from "./Navbar/AboutSection/About";
import Tabs from "./Navbar/TabSection/Tabs";
import Integrations from "./Navbar/IntegrationsSection/Integrations";
import { useDispatch, useSelector } from "react-redux";
import { closeUserDetailsModal } from "../../../../API/redux_toolkit/modals/convers/userDetailsModal";

const UserModal = () => {
  const [activeTab, setActiveTab] = useState("About");
  const dispatch = useDispatch();
  const { isOpen, userData } = useSelector((state) => state.userDetailsModal);
  function closeModal() {
    dispatch(closeUserDetailsModal());
  }

  if (!isOpen) return;
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className={styles.largeModal}
      zIndex={1002}
      title={userData?.userName}
    >
      <div className={styles.upper}>
        <UserProfile userData={userData} />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className={styles.lower}>
        {activeTab === "About" && <About />}
        {activeTab === "Tabs" && <Tabs />}
        {activeTab === "Integrations" && <Integrations />}
      </div>
    </Modal>
  );
};

UserModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default UserModal;
