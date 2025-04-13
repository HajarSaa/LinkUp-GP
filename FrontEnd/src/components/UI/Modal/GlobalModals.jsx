import ChannelDetailsModal from "../../UI/Modal/channel/ChannelDetailsModal/ChannelDetailsModal";
import AddPeopleModal from "./channel/addPeopleModal/AddPeopleModal";
import CreateChannelModal from "./channel/createChannelModel/CreateChannelModal";

function GlobalModals() {
  return (
    <>
      <ChannelDetailsModal channel={{ name: "Front-End" }} />
      <CreateChannelModal />
      <AddPeopleModal />
    </>
  );
}

export default GlobalModals;
