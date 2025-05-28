import { BsBell} from "react-icons/bs";
import styles from "./ChannelDetailsModal.module.css";
import PropTypes from "prop-types";
import {
  FaRegStar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChannelDetails
} from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import DetailsButton from "../../../Buttons/DetailsButton/DetailsButton";

import ChannelType from "../../../Channel/ChannelType/ChannelType";
import CloseIcon from "../../../Icons/CloseIcon/CloseIcon";
import TopicModal from "../editModals/TopicModal";
import RenameChannelModal from "../editModals/RenameChannelModal";
import DescriptionModal from "../editModals/DescriptionModal";
import AboutTab from "./Tabs/AboutTab";
import MembersTab from "./Tabs/MembersTab";
import Tabsbar from "./Tabsbar";
import TabsTab from "./Tabs/TabsTab";
import IntegTab from "./Tabs/IntegTab";
import SettingTab from "./Tabs/SettingTab";

const ChannelDetailsModal = ({channelData}) => {
  const dispatch = useDispatch();
  const { isOpen} = useSelector(
    (state) => state.channelDetailsModal
  );


  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeChannelDetails());
    }
  };

  if (!isOpen) return;

  return (
    <>
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div className={styles.modalContent}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={styles.channelName}>
              <ChannelType type={channelData.type} />
              <span>{channelData.name}</span>
            </div>
            <CloseIcon closeEvent={() => dispatch(closeChannelDetails())} />
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <DetailsButton icon={<FaRegStar />} />
            <DetailsButton icon={<BsBell />}>
              Get notifications for all messages
            </DetailsButton>
          </div>

          {/* Tabsbar */}
          <Tabsbar />
          <div className={styles.tabContent}>
            <AboutTab channelData={channelData} />
            <MembersTab channelData={channelData} />
            <TabsTab />
            <IntegTab />
            <SettingTab channelData={channelData} />
          </div>
        </div>
      </div>
      {/* modals */}
      <TopicModal channelName={channelData?.name} />
      <RenameChannelModal
        channelName={channelData?.name}
        type={channelData?.type}
      />
      <DescriptionModal />
    </>
  );
};

ChannelDetailsModal.propTypes = {
  channelData: PropTypes.any,
};

export default ChannelDetailsModal;
