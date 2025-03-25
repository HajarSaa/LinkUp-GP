import { useState } from "react";
import ChannelHeader from "../ChannelHeader/ChannelHeader";
import ChannelItem from "../ChannelItem/ChannelItem";
import styles from "./ChannelList.module.css";
import AddButton from "../../../../UI/Buttons/AddButton/AddButton";

const mockChannels = [
  { id: 1, name: "general", isPrivate: false },
  { id: 2, name: "random", isPrivate: false },
  { id: 3, name: "team-discussions", isPrivate: true, isActive: true },
];

const ChannelsList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeChannel, setActiveChannel] = useState(null);

  const handleToggle = (openState) => {
    setIsOpen(openState);
  };

  const handleChannelClick = (id) => {
    setActiveChannel(id);
  };

  const handleAddChannel = () => {
    console.log("Add Channel Clicked!");
  };

  return (
    <div className={styles.container}>
      <ChannelHeader
        isAnyChannelActive={activeChannel !== null}
        onToggle={handleToggle}
      />
      {isOpen || activeChannel ? (
        <>
          <div className={styles.list}>
            {mockChannels.map((channel) => (
              <ChannelItem
                key={channel.id}
                id={channel.id}
                name={channel.name}
                isPrivate={channel.isPrivate}
                isActive={+activeChannel === channel.id}
                onClick={() => handleChannelClick(channel.id)}
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
