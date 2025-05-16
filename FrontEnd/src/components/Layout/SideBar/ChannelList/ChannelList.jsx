import { useSelector } from 'react-redux';
import styles from './ChannelList.module.css'
import ChannelListItem from './ChannelListItem';
function ChannelList() {
  const { workspace } = useSelector((state) => state.workspace);
  return (
    <div>
      <div className={styles.list}>
        {workspace.channels.map((channel, index) => (
          <ChannelListItem key={index} channelData={channel} />
        ))}
      </div>
    </div>
  );
}

export default ChannelList