import ChannelDetailsModal from "../../UI/Modal/channel/ChannelDetailsModal/ChannelDetailsModal";
import AddPeopleModal from "./channel/addPeopleModal/AddPeopleModal";
import CreateChannelModal from "./channel/createChannelModel/CreateChannelModal";
import DescriptionModal from "./channel/editModals/DescriptionModal";
import RenameChannelModal from "./channel/editModals/RenameChannelModal";
import TopicModal from "./channel/editModals/TopicModal";

function GlobalModals() {
  return (
    <>
      {/* Start Channel Details Modal */}
      <ChannelDetailsModal channel={{ name: "Front-End" }} />
      <RenameChannelModal />
      <TopicModal />
      <DescriptionModal/>
      {/* End Channel Details Modal */}
      <CreateChannelModal />
      <AddPeopleModal />
    </>
  );
}

export default GlobalModals;
