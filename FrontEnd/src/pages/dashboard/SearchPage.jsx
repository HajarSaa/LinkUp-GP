import styles from './dashboard.module.css'
import FullPageContent from "../../components/Layout/FullPageContent/FullPageContnet";
import SearchHeader from '../../components/UI/SearchComponents/SearchHeader';
import SearchResult from '../../components/UI/SearchComponents/SearchResult';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchMessages from '../../API/hooks/search/useSearchMessages';

function SearchPage() {
  const [searchFilters, setSearchFilters] = useState({});
  const location = useLocation();
  const keyword = location.search.startsWith("?")
    ? location.search.slice(1)
    : location.search;
  const decodedKeyword = decodeURIComponent(keyword);



  const searchParams = useMemo(
    () => ({
      keyword: decodedKeyword,
      ...searchFilters,
    }),
    [decodedKeyword, searchFilters]
  );
  console.log(searchParams);

  useSearchMessages(searchParams);

  return (
    <FullPageContent>
      <div className={styles.browse_page_content}>
        <SearchHeader onFiltersChange={setSearchFilters} />
        <SearchResult />
      </div>
    </FullPageContent>
  );
}

export default SearchPage