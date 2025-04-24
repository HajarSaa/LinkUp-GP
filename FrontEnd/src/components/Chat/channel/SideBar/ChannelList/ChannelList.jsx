/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ChannelHeader from "../ChannelHeader/ChannelHeader";
import ChannelItem from "../ChannelItem/ChannelItem";
import styles from "./ChannelList.module.css";
import AddButton from "../../../../UI/Buttons/ChannelButtons/AddButton/AddButton";
import mockChannels from "../../../../../API/services/mockChannels";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "../../../../../API/redux/chat/channel/channelsSlice";
import { openCreateChannel } from "../../../../../API/redux/modals/createChannelmodalSlice.js";
import { openAddButtonModal } from "../../../../../API/redux/modals/addButtonModal.js";

const ChannelsList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeChannel, setActiveChannel] = useState(null);
  const dispatch = useDispatch();
  const { list: channels } = useSelector((state) => state.channels);

  const handleToggle = (openState) => {
    setIsOpen(openState);
  };

  const handleAddChannel = () => {
    dispatch(openAddButtonModal());
  };
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ChannelHeader onToggle={handleToggle} />
      {isOpen ? (
        <>
          <div className={styles.list}>
            {channels.map((channel) => (
              <ChannelItem
                key={channel.id}
                id={channel.id}
                name={channel.name}
                isPrivate={channel.isPrivate}
                isActive={+activeChannel === channel.id}
              />
            ))}
          </div>
          <AddButton clickEvent={handleAddChannel} text={"Add channels"} />
        </>
      ) : null}
    </div>
  );
};

export default ChannelsList;
