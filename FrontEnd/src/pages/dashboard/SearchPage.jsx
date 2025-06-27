import styles from './dashboard.module.css'
import FullPageContent from "../../components/Layout/FullPageContent/FullPageContnet";
import SearchHeader from '../../components/UI/SearchComponents/SearchHeader';
import SearchResult from '../../components/UI/SearchComponents/SearchResult';

function SearchPage() {
  return (
    <FullPageContent>
      <div className={styles.browse_page_content}>
        <SearchHeader />
        <SearchResult/>
      </div>
    </FullPageContent>
  );
}

export default SearchPage