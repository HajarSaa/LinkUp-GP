import FullPageContent from "../../components/Layout/FullPageContent/FullPageContnet";
import ChannelsList from "../../components/UI/BrowseChannel/ChannelsList";
import BrowseChannelHeader from "../../components/UI/BrowseChannel/BrowseChannelHeader";
import styles from './dashboard.module.css'
import useBrowseChannels from "../../API/hooks/channel/useBrowseChannels";
import Spinner from "../../components/UI/Spinner/Spinner";
const BrowseChannels = () => {

  const browse_query = useBrowseChannels();

    if (browse_query.isLoading)
      return (
        <div className={styles.status}>
          <Spinner
            width={70}
            height={70}
            border={3}
            color="var(--primary-color)"
          />
        </div>
      );
    if (browse_query.isError)
      return (
        <div className={`${styles.status} ${styles.error}`}>
          {browse_query.error}
        </div>
      );
  return (
    <FullPageContent>
      <div className={styles.browse_page_content}>
        <BrowseChannelHeader />
        <ChannelsList />
      </div>
    </FullPageContent>
  );
};

export default BrowseChannels;
