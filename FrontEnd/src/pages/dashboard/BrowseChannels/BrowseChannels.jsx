import SearchInput from "../../../components/UI/InputField/SearchInput/SearchInput";
import FullPageContent from "../../../components/Layout/FullPageContent/FullPageContnet";
import BrowseHeader from "../../../components/UI/BrowseChannel/BrowseHeader";
import BrowseFilter from "../../../components/UI/BrowseChannel/BrowseFilter";
import ChannelsList from "../../../components/UI/BrowseChannel/ChannelsList";

const BrowseChannels = () => {
  const styles = { padding: 20 };
  return (
    <FullPageContent>
      <div style={styles}>
        <BrowseHeader />
        <SearchInput placeholder="Search for all channels" />
        <BrowseFilter />
        <ChannelsList />
      </div>
    </FullPageContent>
  );
};

export default BrowseChannels;
