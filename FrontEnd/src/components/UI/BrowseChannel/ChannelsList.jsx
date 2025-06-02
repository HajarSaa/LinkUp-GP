import { useSelector } from 'react-redux';
import styles from './BrowseChannel.module.css'
import ChannelItem from './ChannelItem';
import { findMemberByUserId } from '../../../utils/workspaceUtils';

function ChannelsList() {
  const { workspace } = useSelector((state) => state.workspace);
  const me = findMemberByUserId(workspace)
  const channels = workspace.channels.filter((channel) => {
    if (channel.type === "public") return true;
    return channel.members.includes(me._id);
  });

  return (
    <div className={styles.channelContainer}>
      {channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} />
      ))}
    </div>
  );
}

export default ChannelsList