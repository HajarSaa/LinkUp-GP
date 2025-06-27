import styles from './dashboard.module.css'
import FullPageContent from "../../components/Layout/FullPageContent/FullPageContnet";
import SearchHeader from '../../components/UI/SearchComponents/SearchHeader';

function SearchPage() {
  return (
    <FullPageContent>
      <div className={styles.browse_page_content}>
        <SearchHeader />
        {/* <ChannelsList /> */}
      </div>
    </FullPageContent>
  );
}

export default SearchPage