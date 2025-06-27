import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchMessages } from "../../services/searchService";
import { setSearchResults } from "../../redux_toolkit/api_data/search/searchSlice";

const useSearchMessages = (filters) => {
  const dispatch = useDispatch();
  const isEnabled = !!filters?.keyword;

  const query = useQuery({
    queryKey: ["searchMessages", filters],
    queryFn: () => searchMessages(filters),
    enabled: isEnabled,
    retry: 1,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setSearchResults(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};

export default useSearchMessages;
