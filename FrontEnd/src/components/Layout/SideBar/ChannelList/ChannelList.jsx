import { useSelector } from "react-redux";
import styles from "./ChannelList.module.css";
import ChannelListItem from "./ChannelListItem";
import { useParams } from "react-router-dom";

function ChannelList() {
  const { workspace } = useSelector((state) => state.workspace);
  const { id } = useParams();


  return (
    <div>
      <div className={styles.list}>
        {workspace.channels.map((channel, index) => (
          <ChannelListItem
            key={index}
            channelData={channel}
            isActive={String(channel.id) === String(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChannelList;
