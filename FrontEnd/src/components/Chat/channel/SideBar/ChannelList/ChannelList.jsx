/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ChannelHeader from "../ChannelHeader/ChannelHeader";
import ChannelItem from "../ChannelItem/ChannelItem";
import styles from "./ChannelList.module.css";
import AddButton from "../../../../UI/Buttons/AddButton/AddButton";
import mockChannels from "../../../../../API/services/mockChannels";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "../../../../../API/redux/chat/channel/channelsSlice";

// const mockChannels = [
//   { id: 1, name: "general", isPrivate: false },
//   { id: 2, name: "random", isPrivate: false },
//   { id: 3, name: "team-discussions", isPrivate: true, isActive: true },
// ];

const ChannelsList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeChannel, setActiveChannel] = useState(null);
  const dispatch = useDispatch();
  const { list: channels } = useSelector((state) => state.channels);

  const handleToggle = (openState) => {
    setIsOpen(openState);
  };

  const handleAddChannel = () => {
    console.log("Add Channel Clicked!");
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
          <AddButton onAddChannel={handleAddChannel} text={"Add channels"} />
        </>
      ) : null}
    </div>
  );
};

export default ChannelsList;
