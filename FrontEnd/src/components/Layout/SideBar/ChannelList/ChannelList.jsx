import {useSelector } from "react-redux";
import styles from "./ChannelList.module.css";
import ChannelListItem from "./ChannelListItem";
import AddButton from "../AddButton/AddButton.jsx";
import { useParams } from "react-router-dom";
import {getMyChannelsOnly} from "../../../../utils/workspaceUtils.js";

function ChannelList() {
  const { workspace } = useSelector((state) => state.workspace);
  const { id } = useParams();
  const myChannels = getMyChannelsOnly(workspace);

  return (
    <div>
      <div className={styles.list}>
        {myChannels.map((channel, index) => (
          <ChannelListItem
            key={index}
            channelData={channel}
            isActive={String(channel.id) === String(id)}
          />
        ))}
      </div>
      <AddButton type="channel" text="Add channels" />
    </div>
  );
}

export default ChannelList;
