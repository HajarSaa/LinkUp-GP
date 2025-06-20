import { useQuery } from "@tanstack/react-query";
import { browseChannels } from "../../services/channelService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBrowseChannels } from "../../redux_toolkit/api_data/channels/browseChannels";

function useBrowseChannels() {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["BrowseChannels"],
    queryFn: browseChannels,
    retry: 1,
  });

  useEffect(() => {
    if (query.data?.channels) {
      dispatch(setBrowseChannels(query.data?.channels));
    }
  }, [query.data,dispatch]);

  return query
}

export default useBrowseChannels;
