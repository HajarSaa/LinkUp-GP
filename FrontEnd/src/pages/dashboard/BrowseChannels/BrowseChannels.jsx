import FullPageContent from "../../../components/Layout/FullPageContent/FullPageContnet";
import ChannelsList from "../../../components/UI/BrowseChannel/ChannelsList";
import BrowseChannelHeader from "../../../components/UI/BrowseChannel/BrowseChannelHeader";
import styles from './BrowseChannel.module.css'
const BrowseChannels = () => {

  return (
    <FullPageContent>
      <div className={styles.page_content}>
        <BrowseChannelHeader />
        <ChannelsList />
      </div>
    </FullPageContent>
  );
};

export default BrowseChannels;
